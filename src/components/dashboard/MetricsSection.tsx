
import React from "react";
import { Users, DollarSign, ArrowDownRight } from "lucide-react";
import MetricsCard from "@/components/dashboard/MetricsCard";
import { DashboardMetrics, MetricDeltaType } from "@/domain/models/dashboard";

interface MetricsSectionProps {
  metrics: DashboardMetrics;
  displayChurnRate?: number;
  displayChurnRateChange?: number;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
  metrics,
  displayChurnRate,
  displayChurnRateChange
}) => {
  const getMetricDeltaType = (value: number | undefined): MetricDeltaType => {
    if (typeof value !== "number" || isNaN(value)) return "unchanged";
    if (value > 0) return value > 5 ? "increase" : "moderateIncrease";
    if (value < 0) return value < -5 ? "decrease" : "moderateDecrease";
    return "unchanged";
  };

  // Only show values if they exist, otherwise "—" or 0 as appropriate
  const churnRateDeltaType = getMetricDeltaType(displayChurnRateChange);
  const customerGrowthDeltaType = getMetricDeltaType(metrics.customerGrowth);

  // For revenue impact, if not present, show "—"
  const revenueImpact =
    typeof metrics.atRiskCount === "number" && typeof metrics.atRiskPercentage === "number"
      ? (metrics.atRiskCount && metrics.atRiskPercentage
          ? metrics.atRiskCount * metrics.atRiskPercentage * 100
          : 0)
      : undefined;
  const revenueImpactDeltaType = getMetricDeltaType(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricsCard
        title="Total Customers"
        value={
          typeof metrics.totalCustomers === 'number' && metrics.totalCustomers > 0
            ? metrics.totalCustomers.toLocaleString()
            : "—"
        }
        deltaType={customerGrowthDeltaType}
        deltaLabel={
          typeof metrics.customerGrowth === 'number'
            ? "vs last month"
            : "No previous data"
        }
        icon={<Users className="h-6 w-6 text-blue-600" />}
      />
      <MetricsCard
        title="Churn Rate"
        value={
          typeof displayChurnRate === "number" && displayChurnRate > 0
            ? `${displayChurnRate.toFixed(1)}%`
            : "—"
        }
        deltaType={churnRateDeltaType}
        deltaLabel={
          typeof displayChurnRateChange === "number"
            ? "vs last month"
            : "No previous data"
        }
        icon={<ArrowDownRight className="h-6 w-6 text-red-600" />}
      />
      <MetricsCard
        title="Revenue Impact"
        value={
          typeof revenueImpact === "number" && revenueImpact > 0
            ? `$${revenueImpact.toLocaleString()}`
            : "—"
        }
        deltaType={revenueImpactDeltaType}
        deltaLabel="potential loss"
        icon={<DollarSign className="h-6 w-6 text-green-600" />}
      />
    </div>
  );
};

export default MetricsSection;
