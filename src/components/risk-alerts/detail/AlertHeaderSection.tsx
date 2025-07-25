
import React from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { mapSeverityToInternal } from "@/domain/models/riskAlert";

interface AlertHeaderSectionProps {
  severity: string;
  category: string;
  createdAt: string;
  customerName: string;
}

const AlertHeaderSection: React.FC<AlertHeaderSectionProps> = ({
  severity,
  category,
  createdAt,
  customerName
}) => {
  // Get severity badge style
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

  return (
    <>
      <div className="flex items-center justify-between">
        <DialogTitle className="text-xl font-bold flex items-center gap-2">
          <Badge variant="outline" className={getSeverityBadgeClass()}>
            {severity}
          </Badge>
          <span>{category}</span>
        </DialogTitle>
        <Badge variant="secondary" className="px-2 py-1">
          {format(new Date(createdAt), "MMM d, yyyy")}
        </Badge>
      </div>
      <DialogDescription className="text-base font-medium mt-2">
        {customerName}
      </DialogDescription>
    </>
  );
};

export default AlertHeaderSection;
