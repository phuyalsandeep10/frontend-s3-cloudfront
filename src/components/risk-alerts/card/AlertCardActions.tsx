
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { mapStatusToInternal } from "@/domain/models/riskAlert";

interface AlertCardActionsProps {
  alertId: string;
  status: string;
  onUpdateStatus: (alertId: string, status: string) => void;
}

const AlertCardActions: React.FC<AlertCardActionsProps> = ({
  alertId,
  status,
  onUpdateStatus
}) => {
  const internalStatus = mapStatusToInternal(status);
  
  return (
    <div className="flex justify-between pt-2">
      <div className="flex gap-2">
        {internalStatus === "new" && (
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(alertId, "Acknowledged");
            }}
          >
            Acknowledge
          </Button>
        )}
        {internalStatus === "acknowledged" && (
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(alertId, "Resolved");
            }}
          >
            Resolve
          </Button>
        )}
      </div>
      <Button 
        size="sm" 
        variant="ghost" 
        className="p-0 h-auto text-muted-foreground"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AlertCardActions;
