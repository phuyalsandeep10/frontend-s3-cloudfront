
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RiskAlert, mapStatusToInternal, mapSeverityToInternal } from "@/domain/models/riskAlert";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface RiskAlertsSummaryProps {
  alerts: RiskAlert[];
}

const RiskAlertsSummary: React.FC<RiskAlertsSummaryProps> = ({ alerts }) => {
  // Group alerts by status and severity for the summary cards
  const alertsByStatus = {
    new: alerts.filter(alert => mapStatusToInternal(alert.status) === "new"),
    acknowledged: alerts.filter(alert => mapStatusToInternal(alert.status) === "acknowledged"),
    resolved: alerts.filter(alert => mapStatusToInternal(alert.status) === "resolved"),
    dismissed: alerts.filter(alert => mapStatusToInternal(alert.status) === "dismissed")
  };

  const alertsBySeverity = {
    critical: alerts.filter(alert => mapSeverityToInternal(alert.severity) === "critical"),
    high: alerts.filter(alert => mapSeverityToInternal(alert.severity) === "high"),
    medium: alerts.filter(alert => mapSeverityToInternal(alert.severity) === "medium"),
    low: alerts.filter(alert => mapSeverityToInternal(alert.severity) === "low")
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{alertsByStatus.new.length}</div>
            <div className="text-sm text-muted-foreground">New Alerts</div>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <AlertCircle className="w-5 h-5 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{alertsByStatus.acknowledged.length}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{alertsByStatus.resolved.length}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{alertsBySeverity.critical.length}</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAlertsSummary;
