
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { RiskAlertDetails } from "@/domain/models/riskAlertDetails";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Calendar, 
  Ticket, 
  Activity,
  Layers
} from "lucide-react";

interface AlertDetailsSectionProps {
  alertDetails: RiskAlertDetails | undefined;
  isLoading: boolean;
}

const AlertDetailsSection: React.FC<AlertDetailsSectionProps> = ({
  alertDetails,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 mt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  if (!alertDetails) {
    return null;
  }

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium border-b pb-2">Additional Details</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {alertDetails.customerValue && (
          <div className="border rounded-md p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4" />
              <span>Customer Value</span>
            </div>
            <p className="font-medium">{alertDetails.customerValue}</p>
          </div>
        )}
        
        {alertDetails.customerSince && (
          <div className="border rounded-md p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span>Customer Since</span>
            </div>
            <p className="font-medium">{alertDetails.customerSince}</p>
          </div>
        )}
        
        {alertDetails.relatedTickets !== undefined && (
          <div className="border rounded-md p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Ticket className="h-4 w-4" />
              <span>Related Tickets</span>
            </div>
            <p className="font-medium">{alertDetails.relatedTickets}</p>
          </div>
        )}
        
        {alertDetails.lastActivityDate && (
          <div className="border rounded-md p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Activity className="h-4 w-4" />
              <span>Last Activity</span>
            </div>
            <p className="font-medium">{format(new Date(alertDetails.lastActivityDate), "MMM d, yyyy")}</p>
          </div>
        )}
      </div>
      
      {alertDetails.riskDetails && alertDetails.riskDetails.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Risk Factors</span>
          </h3>
          
          <div className="overflow-hidden border rounded-md divide-y">
            {alertDetails.riskDetails.map((detail, index) => (
              <div key={index} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{detail.factor}</p>
                  <p className="text-sm text-muted-foreground">{detail.value}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    detail.impact === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : detail.impact === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                  }
                >
                  {detail.impact.charAt(0).toUpperCase() + detail.impact.slice(1)} Impact
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertDetailsSection;
