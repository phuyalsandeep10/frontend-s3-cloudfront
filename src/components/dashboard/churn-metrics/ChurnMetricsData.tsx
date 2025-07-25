import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomerPrediction } from "@/domain/models/prediction";
import { api } from "@/utils/api";

interface ChurnRateResponse {
  period: string;
  churn_rate: number;
}

// Hook to centralize all data fetching for churn metrics
export const useChurnMetricsData = (predictions?: CustomerPrediction[]) => {
  // Fetch real churn rate data from API
  const { data: churnRateApiData = [], isLoading: isChurnRateLoading, error: churnRateError } = useQuery({
    queryKey: ["churnRate", "monthly"],
    queryFn: async () => {
      try {
        const response = await api.get<ChurnRateResponse[]>("/ai/churn?period=monthly");
        return response;
      } catch (error) {
        console.error("Error fetching churn rate data:", error);
        return [];
      }
    }
  });

  // Transform API data (strict: no mock data as fallback)
  const churnRateData = React.useMemo(() => {
    if (churnRateApiData.length > 0) {
      // Map API response to the format needed for the chart
      return churnRateApiData.map(item => {
        // Extract month abbreviation from period (format: "2025-03")
        const [year, monthNum] = item.period.split('-');
        const date = new Date(parseInt(year), parseInt(monthNum) - 1);
        const month = date.toLocaleString('default', { month: 'short' });

        return {
          month: `${month}`,
          rate: item.churn_rate / 100, // Convert churn_rate to percentage (API returns it as basis points)
          year: year
        };
      });
    } else {
      // No data: do NOT use dummy/mock data
      return [];
    }
  }, [churnRateApiData]);

  // Calculate current churn rate and change
  const currentChurnRate = React.useMemo(() => {
    if (churnRateData.length > 0) {
      return churnRateData[churnRateData.length - 1].rate;
    }
    return 0;
  }, [churnRateData]);

  // Calculate churn rate change (if we have at least 2 data points)
  const churnRateChange = React.useMemo(() => {
    if (churnRateData.length >= 2) {
      const current = churnRateData[churnRateData.length - 1].rate;
      const previous = churnRateData[churnRateData.length - 2].rate;
      return current - previous;
    }
    return 0;
  }, [churnRateData]);

  // Age group-based retention data
  const retentionByAgeGroupData = React.useMemo(() => [], []);

  return {
    churnRateData,
    currentChurnRate,
    churnRateChange,
    retentionByAgeGroupData,
    predictions,
    isChurnRateLoading,
    churnRateError
  };
};
