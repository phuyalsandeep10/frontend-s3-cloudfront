
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { mapStatusToInternal } from "@/domain/models/riskAlert";

interface AlertActionFooterProps {
  status: string;
  alertId: string;
  onUpdateStatus: (alertId: string, status: string) => void;
  onClose: () => void;
}

const AlertActionFooter: React.FC<AlertActionFooterProps> = ({
  status,
  alertId,
  onUpdateStatus,
  onClose
}) => {
  const internalStatus = mapStatusToInternal(status);

  return (
    <DialogFooter className="flex justify-end gap-2">
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      {internalStatus === "new" && (
        <Button 
          variant="default"
          onClick={() => {
            onUpdateStatus(alertId, "Acknowledged");
            onClose();
          }}
        >
          Acknowledge
        </Button>
      )}
      {internalStatus === "acknowledged" && (
        <Button 
          variant="default"
          onClick={() => {
            onUpdateStatus(alertId, "Resolved");
            onClose();
          }}
        >
          Mark Resolved
        </Button>
      )}
    </DialogFooter>
  );
};

export default AlertActionFooter;
