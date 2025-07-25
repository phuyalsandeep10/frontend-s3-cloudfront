
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { mapSeverityToInternal } from "@/domain/models/riskAlert";

interface AlertCardWrapperProps {
  severity: string;
  onClick: () => void;
  children: React.ReactNode;
}

const AlertCardWrapper: React.FC<AlertCardWrapperProps> = ({
  severity,
  onClick,
  children
}) => {
  // Get card border color based on severity
  const getCardBorderClass = () => {
    const internalSeverity = mapSeverityToInternal(severity);
    switch (internalSeverity) {
      case "critical":
        return "border-l-4 border-l-red-500";
      case "high":
        return "border-l-4 border-l-orange-500";
      case "medium":
        return "border-l-4 border-l-amber-500";
      case "low":
        return "border-l-4 border-l-green-500";
      default:
        return "";
    }
  };

  return (
    <Card 
      className={`h-full shadow-sm hover:shadow-md transition-all cursor-pointer ${getCardBorderClass()}`}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default AlertCardWrapper;
