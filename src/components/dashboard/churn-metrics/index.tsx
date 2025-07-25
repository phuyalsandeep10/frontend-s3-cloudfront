
import React from "react";
import { CustomerPrediction } from "@/domain/models/prediction";
import ChurnRateChart from "./ChurnRateChart";
import CustomerRiskCategories from "./CustomerRiskCategories";
import RetentionByAgeGroup from "./RetentionBySegment";
import PredictionInsights from "./PredictionInsights";
import { useChurnMetricsData } from "./ChurnMetricsData";

interface ChurnMetricsProps {
  predictions?: CustomerPrediction[];
}

const ChurnMetrics: React.FC<ChurnMetricsProps> = ({ predictions = [] }) => {
  // Get all data needed for charts
  const { 
    churnRateData, 
    retentionByAgeGroupData,
    isChurnRateLoading
  } = useChurnMetricsData(predictions);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChurnRateChart churnRateData={churnRateData} isLoading={isChurnRateLoading} />
      <CustomerRiskCategories predictions={predictions} />
      <RetentionByAgeGroup retentionData={retentionByAgeGroupData} />
      <PredictionInsights predictions={predictions} />
    </div>
  );
};

export default ChurnMetrics;
