
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { mapStatusToInternal } from "@/domain/models/riskAlert";

interface AlertStatusSectionProps {
  status: string;
}

const AlertStatusSection: React.FC<AlertStatusSectionProps> = ({ status }) => {
  // Get status alert variant
  const getStatusAlertVariant = () => {
    const internalStatus = mapStatusToInternal(status);
    switch (internalStatus) {
      case "new":
        return { 
          icon: <AlertCircle className="h-4 w-4" />,
          title: "New Alert",
          description: "This alert has not been acknowledged yet.",
          variant: "default" as const
        };
      case "acknowledged":
        return { 
          icon: <Clock className="h-4 w-4" />,
          title: "In Progress",
          description: "This alert is currently being worked on.",
          variant: "default" as const
        };
      case "resolved":
        return { 
          icon: <CheckCircle className="h-4 w-4" />,
          title: "Resolved",
          description: "This alert has been resolved.",
          variant: "default" as const
        };
      case "dismissed":
        return { 
          icon: <XCircle className="h-4 w-4" />,
          title: "Dismissed",
          description: "This alert has been dismissed.",
          variant: "default" as const
        };
      default:
        return { 
          icon: <AlertCircle className="h-4 w-4" />,
          title: "Status Unknown",
          description: "The status of this alert is unknown.",
          variant: "default" as const
        };
    }
  };

  const statusInfo = getStatusAlertVariant();

  return (
    <Alert variant={statusInfo.variant} className="border-l-4 border-l-blue-500">
      <div className="flex items-center gap-2">
        {statusInfo.icon}
        <AlertTitle>{statusInfo.title}</AlertTitle>
      </div>
      <AlertDescription>
        {statusInfo.description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertStatusSection;
