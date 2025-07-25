
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskAlert } from "@/domain/models/riskAlert";
import RiskAlertsFilters from "./RiskAlertsFilters";
import RiskAlertsList from "./RiskAlertsList";
import RiskAlertsPagination from "./RiskAlertsPagination";

interface RiskAlertsContainerProps {
  alerts: RiskAlert[];
  onUpdateStatus: (alertId: string, status: string) => void;
  onAlertClick: (alert: RiskAlert) => void;
}

const ITEMS_PER_PAGE = 9;

const RiskAlertsContainer: React.FC<RiskAlertsContainerProps> = ({ 
  alerts, 
  onUpdateStatus,
  onAlertClick
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [severityTab, setSeverityTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAlerts, setFilteredAlerts] = useState<RiskAlert[]>([]);

  // Reset page when changing tabs or search term
  useEffect(() => {
    setCurrentPage(1);
  }, [statusTab, severityTab, searchTerm]);

  // Filter alerts based on user selections
  useEffect(() => {
    setFilteredAlerts(getFilteredAlerts());
  }, [alerts, searchTerm, statusTab, severityTab]);

  // Get filtered alerts based on filters
  const getFilteredAlerts = () => {
    return alerts.filter(alert => {
      // Filter by status if not "all"
      if (statusTab !== "all") {
        if (alert.status.toLowerCase() !== statusTab) {
          return false;
        }
      }
      
      // Filter by severity if not "all"
      if (severityTab !== "all") {
        if (alert.severity.toLowerCase() !== severityTab) {
          return false;
        }
      }
      
      // Filter by search term
      if (searchTerm) {
        const customerName = alert.customerName || `Customer ${alert.id}`;
        return customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.category.toLowerCase().includes(searchTerm.toLowerCase());
      }
      
      return true;
    });
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAlerts.length / ITEMS_PER_PAGE);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>All Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RiskAlertsFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusTab={statusTab}
            setStatusTab={setStatusTab}
            severityTab={severityTab}
            setSeverityTab={setSeverityTab}
            alertsCount={{
              critical: alerts.filter(a => a.severity.toLowerCase() === 'critical').length,
              high: alerts.filter(a => a.severity.toLowerCase() === 'high').length,
              medium: alerts.filter(a => a.severity.toLowerCase() === 'medium').length,
              low: alerts.filter(a => a.severity.toLowerCase() === 'low').length,
            }}
          />
          
          <RiskAlertsList 
            alerts={paginatedAlerts} 
            onUpdateStatus={onUpdateStatus}
            onAlertClick={onAlertClick}
          />
          
          {totalPages > 1 && (
            <RiskAlertsPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAlertsContainer;
