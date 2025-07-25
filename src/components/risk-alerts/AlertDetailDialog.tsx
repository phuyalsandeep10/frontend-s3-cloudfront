
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader
} from "@/components/ui/dialog";
import { RiskAlert } from "@/domain/models/riskAlert";
import { useRiskAlertDetails } from "@/hooks/useRiskAlertDetails";
import AlertHeaderSection from "./detail/AlertHeaderSection";
import AlertStatusSection from "./detail/AlertStatusSection";
import AlertBasicInfoSection from "./detail/AlertBasicInfoSection";
import AlertDetailsSection from "./detail/AlertDetailsSection";
import AlertActionFooter from "./detail/AlertActionFooter";

interface AlertDetailDialogProps {
  alert: RiskAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (alertId: string, status: string) => void;
}

const AlertDetailDialog: React.FC<AlertDetailDialogProps> = ({ 
  alert, 
  isOpen, 
  onClose,
  onUpdateStatus 
}) => {
  const { data: alertDetails, isLoading } = useRiskAlertDetails(
    alert?.id || '', 
    isOpen && !!alert
  );

  if (!alert) return null;

  const customerName = alert.customerName || `Customer ${alert.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <AlertHeaderSection 
            severity={alert.severity}
            category={alert.category}
            createdAt={alert.created_at}
            customerName={customerName}
          />
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {/* Status Alert */}
          <AlertStatusSection status={alert.status} />
          
          {/* Alert Description */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Alert Description</h3>
            <p className="text-gray-700">{alert.message}</p>
          </div>
          
          {/* Basic Information */}
          <AlertBasicInfoSection 
            customerId={alert.id}
            assignedTo={alert.assigned_to}
          />

          {/* Detailed Information */}
          <AlertDetailsSection 
            alertDetails={alertDetails}
            isLoading={isLoading}
          />
        </div>
        
        {/* Action Buttons */}
        <AlertActionFooter 
          status={alert.status}
          alertId={alert.id}
          onUpdateStatus={onUpdateStatus}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AlertDetailDialog;
