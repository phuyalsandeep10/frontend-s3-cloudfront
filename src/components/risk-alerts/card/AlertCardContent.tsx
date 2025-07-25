
import React from "react";

interface AlertCardContentProps {
  message: string;
  assignedTo: string | null;
}

const AlertCardContent: React.FC<AlertCardContentProps> = ({
  message,
  assignedTo
}) => {
  return (
    <div>
      <p className="line-clamp-2">{message}</p>
      {assignedTo && (
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
          <span className="font-medium">Assigned to:</span> {assignedTo}
        </div>
      )}
    </div>
  );
};

export default AlertCardContent;
