import React, { useEffect } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { usePredictions } from "@/hooks/usePredictions";
import { useCustomerRiskData } from "@/hooks/useCustomerRiskData";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ChurnMetrics from "@/components/dashboard/churn-metrics";
import CustomerList from "@/components/dashboard/CustomerList";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardError from "@/components/dashboard/DashboardError";
import MetricsSection from "@/components/dashboard/MetricsSection";
import { useChurnMetricsData } from "@/components/dashboard/churn-metrics/ChurnMetricsData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: dashboardData, isLoading, error, status } = useDashboardData();
  const { predictions } = usePredictions();
  const { currentChurnRate, churnRateChange, isChurnRateLoading } = useChurnMetricsData(predictions);
  const customerRiskData = useCustomerRiskData(dashboardData?.atRiskCustomers);

  useEffect(() => {
    if (error) {
      if (typeof status === 'number' && status === 401) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "https://mausamcrm.site/login";
      } else if (typeof status === 'number' && (status === 404 || status === 503)) {
        toast.error("Could not connect to server. Redirecting to main site.");
        window.location.href = "https://mausamcrm.site";
      }
    }
  }, [error, status, navigate]);

  if (error && typeof status === 'number' && (status === 404 || status === 503)) {
    return null;
  }

  if (isLoading || isChurnRateLoading) {
    return <DashboardSkeleton />;
  }

  if (error && typeof status === 'number' && status !== 401 && status !== 404 && status !== 503) {
    return <DashboardError />;
  }

  // Determine metrics: only use actual backend response. If no data, show truly empty metrics object.
  const metrics = dashboardData && dashboardData.metrics
    ? dashboardData.metrics
    : {
      totalCustomers: undefined,
      customerGrowth: undefined,
      churnRate: undefined,
      churnRateChange: undefined,
      atRiskCount: undefined,
      atRiskPercentage: undefined
    };

  const displayChurnRate =
    typeof currentChurnRate === "number" && !isNaN(currentChurnRate)
      ? currentChurnRate
      : (typeof metrics.churnRate === "number" && !isNaN(metrics.churnRate) ? metrics.churnRate : undefined);

  const displayChurnRateChange =
    typeof churnRateChange === "number" && !isNaN(churnRateChange)
      ? churnRateChange
      : (typeof metrics.churnRateChange === "number" && !isNaN(metrics.churnRateChange) ? metrics.churnRateChange : undefined);

  return (
    <DashboardLayout>
      <MetricsSection
        metrics={metrics}
        displayChurnRate={displayChurnRate}
        displayChurnRateChange={displayChurnRateChange}
      />
      <div className="space-y-8">
        <ChurnMetrics predictions={predictions} />
        <CustomerList customers={customerRiskData} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
