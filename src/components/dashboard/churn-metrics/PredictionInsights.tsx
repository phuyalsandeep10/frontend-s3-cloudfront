
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerPrediction } from "@/domain/models/prediction";
import { formatDate } from "@/components/predictions/detailUtils";
import { AlertCircle } from "lucide-react";

interface PredictionInsightsProps {
  predictions?: CustomerPrediction[];
}

const PredictionInsights: React.FC<PredictionInsightsProps> = ({ predictions = [] }) => {
  // Get latest predictions for insights section
  const latestPredictions = React.useMemo(() => {
    return [...(predictions || [])]
      .sort((a, b) => new Date(b.predictionDate).getTime() - new Date(a.predictionDate).getTime())
      .slice(0, 5);
  }, [predictions]);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Latest Prediction Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {latestPredictions.length > 0 ? (
          <ul className="space-y-3">
            {latestPredictions.map(prediction => (
              <li key={prediction.id} className="text-sm border-b pb-2 last:border-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{prediction.customerName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    prediction.churnProbability >= 0.7 ? 'bg-red-100 text-red-700' :
                    prediction.churnProbability >= 0.4 ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {(prediction.churnProbability * 100).toFixed(0)}% Risk
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Predicted on {formatDate(prediction.predictionDate)}</span>
                  <span>{prediction.modelName}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <AlertCircle className="h-12 w-12 mb-4 text-gray-300" />
            <p className="text-sm">No prediction insights available at the moment</p>
            <p className="text-xs mt-2">Check back later or contact support</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionInsights;
