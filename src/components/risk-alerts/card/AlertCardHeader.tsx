
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { mapStatusToInternal, mapSeverityToInternal } from "@/domain/models/riskAlert";

interface AlertCardHeaderProps {
  customerId: string;
  customerName?: string;
  severity: string;
  category: string;
  status: string;
  createdAt: string;
}

const AlertCardHeader: React.FC<AlertCardHeaderProps> = ({
  customerId,
  customerName,
  severity,
  category,
  status,
  createdAt
}) => {
  // Get severity badge color
  const getSeverityBadgeClass = () => {
    const internalSeverity = mapSeverityToInternal(severity);
    switch (internalSeverity) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "";
    }
  };
  
  // Get status icon
  const getStatusIcon = () => {
    const internalStatus = mapStatusToInternal(status);
    switch (internalStatus) {
      case "new":
        return <AlertCircle className="w-4 h-4 text-purple-500" />;
      case "acknowledged":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "dismissed":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const displayedCustomerName = customerName || `Customer ${customerId}`;

  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {getStatusIcon()}
          <Badge variant="outline" className={getSeverityBadgeClass()}>
            {severity}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {category}
          </span>
        </div>
        <div className="font-semibold">{displayedCustomerName}</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {format(new Date(createdAt), "MMM d, yyyy")}
      </div>
    </div>
  );
};

export default AlertCardHeader;
