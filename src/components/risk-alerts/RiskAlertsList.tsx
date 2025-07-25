
import React from "react";
import { RiskAlert } from "@/domain/models/riskAlert";
import AlertCard from "@/components/risk-alerts/AlertCard";
import { Filter } from "lucide-react";

interface RiskAlertsListProps {
  alerts: RiskAlert[];
  onUpdateStatus: (alertId: string, status: string) => void;
  onAlertClick: (alert: RiskAlert) => void;
}

const RiskAlertsList: React.FC<RiskAlertsListProps> = ({ 
  alerts, 
  onUpdateStatus,
  onAlertClick
}) => {
  if (alerts.length === 0) {
    return (
      <div className="col-span-3 p-8 text-center text-muted-foreground bg-gray-50 rounded-md">
        <Filter className="h-10 w-10 mx-auto mb-2 text-gray-400" />
        <p className="font-medium">No alerts match your filters</p>
        <p className="text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {alerts.map(alert => (
        <AlertCard 
          key={alert.id + alert.created_at}
          alert={alert}
          onUpdateStatus={onUpdateStatus}
          onClick={() => onAlertClick(alert)}
        />
      ))}
    </div>
  );
};

export default RiskAlertsList;
