
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { CustomerPrediction } from "@/domain/models/prediction";

interface CustomerRiskCategoriesProps {
  predictions?: CustomerPrediction[];
}

const CustomerRiskCategories: React.FC<CustomerRiskCategoriesProps> = ({ predictions = [] }) => {
  // Generate risk categories data from predictions if available
  const riskCategoriesData = React.useMemo(() => {
    if (predictions && predictions.length > 0) {
      // Simple classification based on churn probability
      const highRisk = predictions.filter(p => p.churnProbability >= 0.7).length;
      const mediumRisk = predictions.filter(p => p.churnProbability >= 0.4 && p.churnProbability < 0.7).length;
      const lowRisk = predictions.filter(p => p.churnProbability < 0.4).length;

      return [
        { category: 'High Risk', value: highRisk, color: '#ef4444' },
        { category: 'Medium Risk', value: mediumRisk, color: '#f59e0b' },
        { category: 'Low Risk', value: lowRisk, color: '#10b981' },
      ];
    }
    // STRICT: No fallback/mock data is provided if no predictions
    return [];
  }, [predictions]);

  // Calculate total customers and at-risk percentage
  const totalCustomers = React.useMemo(() => {
    return riskCategoriesData.reduce((sum, item) => sum + item.value, 0);
  }, [riskCategoriesData]);

  const atRiskCount = React.useMemo(() => {
    const highRisk = riskCategoriesData.find(item => item.category === 'High Risk');
    return highRisk ? highRisk.value : 0;
  }, [riskCategoriesData]);

  const atRiskPercentage = React.useMemo(() => {
    return totalCustomers > 0 ? Math.round((atRiskCount / totalCustomers) * 100) : 0;
  }, [totalCustomers, atRiskCount]);

  // Fixed legend to render correct colors and values
  const renderLegend = () => {
    return (
      <div className="flex justify-center gap-6 mt-3">
        {riskCategoriesData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const hasData = riskCategoriesData.length > 0 && totalCustomers > 0;

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Customer Risk Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] p-4 flex items-center justify-center">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskCategoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ category, percent }) =>
                    `${category} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {riskCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} customers`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: 'none'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground text-center">
                No customer risk data available.
              </p>
            </div>
          )}
        </div>
        {hasData && renderLegend()}
        {hasData && (
          <div className="px-6 pb-4 flex justify-between text-sm mt-2">
            <div>
              <span className="font-semibold">Total Customers:</span> {hasData ? totalCustomers : "—"}
            </div>
            <div>
              <span className="font-semibold">High Risk Customers:</span> {hasData ? atRiskCount : "—"} {hasData ? `(${atRiskPercentage}%)` : ""}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerRiskCategories;
