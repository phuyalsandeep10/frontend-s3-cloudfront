
import React from "react";
import { useRiskAlerts } from "@/hooks/useRiskAlerts";
import RiskAlertsSummary from "@/components/risk-alerts/RiskAlertsSummary";
import RiskAlertsContainer from "@/components/risk-alerts/RiskAlertsContainer";
import AlertDetailDialog from "@/components/risk-alerts/AlertDetailDialog";
import { RiskAlert } from "@/domain/models/riskAlert";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const RiskAlerts: React.FC = () => {
  const { 
    alerts, 
    updateAlertStatus, 
    isLoading, 
    error 
  } = useRiskAlerts();
  
  const [selectedAlert, setSelectedAlert] = React.useState<RiskAlert | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  const handleUpdateStatus = async (alertId: string, status: string) => {
    try {
      await updateAlertStatus({ alertId, status });
      
      // Show success toast
      const statusMessages: Record<string, string> = {
        "Acknowledged": "Alert acknowledged",
        "Resolved": "Alert marked as resolved",
        "Dismissed": "Alert dismissed",
        "New": "Alert marked as new"
      };
      
      toast.success(statusMessages[status] || "Status updated");
    } catch (error) {
      toast.error("Failed to update alert status");
      console.error(error);
    }
  };

  const handleAlertClick = (alert: RiskAlert) => {
    setSelectedAlert(alert);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Risk Alerts</h1>
        <div className="space-y-4">
          <Skeleton className="h-12 w-60" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-md">
        <h3 className="text-lg font-medium text-red-800">Error loading risk alerts</h3>
        <p className="text-red-700">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Risk Alerts</h1>
      </div>
      
      {/* Summary cards */}
      <RiskAlertsSummary alerts={alerts} />
      
      {/* Alerts container */}
      <RiskAlertsContainer 
        alerts={alerts}
        onUpdateStatus={handleUpdateStatus}
        onAlertClick={handleAlertClick}
      />

      {/* Alert Detail Dialog */}
      <AlertDetailDialog
        alert={selectedAlert}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default RiskAlerts;
