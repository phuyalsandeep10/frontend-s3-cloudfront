
import React from "react";
import { RiskAlert } from "@/domain/models/riskAlert";
import AlertCardShell from "./card/AlertCardShell";
import AlertCardHeader from "./card/AlertCardHeader";
import AlertCardContent from "./card/AlertCardContent";
import AlertCardActions from "./card/AlertCardActions";

interface AlertCardProps {
  alert: RiskAlert;
  onUpdateStatus: (alertId: string, status: string) => void;
  onClick: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onUpdateStatus,
  onClick,
}) => {
  return (
    <AlertCardShell
      severity={alert.severity}
      onClick={onClick}
      header={
        <AlertCardHeader
          customerId={alert.id}
          customerName={alert.customerName}
          severity={alert.severity}
          category={alert.category}
          status={alert.status}
          createdAt={alert.created_at}
        />
      }
      content={
        <AlertCardContent message={alert.message} assignedTo={alert.assigned_to} />
      }
      footer={
        <AlertCardActions
          alertId={alert.id}
          status={alert.status}
          onUpdateStatus={onUpdateStatus}
        />
      }
    />
  );
};

export default AlertCard;

