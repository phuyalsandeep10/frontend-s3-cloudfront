import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

// Types for dashboard data
export interface CustomerRisk {
  id: string;
  name: string;
  company: string;
  email: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  lastActivity: string;
}

export interface DashboardData {
  metrics: {
    totalCustomers: number;
    customerGrowth: number;
    churnRate: number;
    churnRateChange: number;
    atRiskCount: number;
    atRiskPercentage: number;
  };
  atRiskCustomers: CustomerRisk[];
  user?: {
    id: string;
    name: string;
    email: string;
    company: string;
  };
}

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      try {
        const response = await api.get<DashboardData>("/status");
        return response;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);

        // Rethrow all errors: If API error, propagate so UI will display empty/blank.
        throw error;
      }
    },
    refetchInterval: 5 * 60 * 1000,
    meta: {
      errorHandler: (error: any) => {
        if (error && typeof error === 'object' && 'status' in error) {
          const statusCode = (error as any).status;
          if ([401, 404, 503].includes(statusCode)) {
            return true;
          }
        }
        return false;
      }
    }
  });
}
