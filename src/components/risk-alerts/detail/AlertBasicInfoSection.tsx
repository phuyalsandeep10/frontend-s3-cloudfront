
import React from "react";
import { Building, User } from "lucide-react";

interface AlertBasicInfoSectionProps {
  customerId: string;
  assignedTo: string | null;
}

const AlertBasicInfoSection: React.FC<AlertBasicInfoSectionProps> = ({
  customerId,
  assignedTo
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-md p-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Building className="h-4 w-4" />
          <span>Customer ID</span>
        </div>
        <p className="font-medium">{customerId}</p>
      </div>
      
      {assignedTo && (
        <div className="border rounded-md p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <User className="h-4 w-4" />
            <span>Assigned To</span>
          </div>
          <p className="font-medium">{assignedTo}</p>
        </div>
      )}
    </div>
  );
};

export default AlertBasicInfoSection;
