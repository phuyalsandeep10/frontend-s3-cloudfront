
import { CustomerRisk } from "@/hooks/useDashboardData";

export interface DashboardMetrics {
  totalCustomers: number;
  customerGrowth: number;
  churnRate: number;
  churnRateChange: number;
  atRiskCount: number;
  atRiskPercentage: number;
}

export interface DashboardState {
  isLoading: boolean;
  error: any;
  status?: number;
}

export type MetricDeltaType = "increase" | "moderateIncrease" | "decrease" | "moderateDecrease" | "unchanged";

export interface MetricCardProps {
  title: string;
  value: string | number;
  deltaType: MetricDeltaType;
  deltaLabel: string;
  icon: React.ReactNode;
}
