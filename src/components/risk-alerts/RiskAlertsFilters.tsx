
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RiskAlertsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusTab: string;
  setStatusTab: (status: string) => void;
  severityTab: string;
  setSeverityTab: (severity: string) => void;
  alertsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

const RiskAlertsFilters: React.FC<RiskAlertsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusTab,
  setStatusTab,
  severityTab,
  setSeverityTab,
  alertsCount
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Status tabs */}
      <Tabs value={statusTab} onValueChange={setStatusTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Statuses</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="acknowledged">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Severity tabs */}
      <Tabs value={severityTab} onValueChange={setSeverityTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Severities</TabsTrigger>
          <TabsTrigger value="critical">Critical ({alertsCount.critical})</TabsTrigger>
          <TabsTrigger value="high">High ({alertsCount.high})</TabsTrigger>
          <TabsTrigger value="medium">Medium ({alertsCount.medium})</TabsTrigger>
          <TabsTrigger value="low">Low ({alertsCount.low})</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RiskAlertsFilters;
