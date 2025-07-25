
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface ChurnRateChartProps {
  churnRateData: Array<{
    month: string;
    rate: number;
    year?: string;
  }>;
  isLoading?: boolean;
}

const ChurnRateChart: React.FC<ChurnRateChartProps> = ({ churnRateData, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Churn Rate (%)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[300px] p-4">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasData = Array.isArray(churnRateData) && churnRateData.length > 0;

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Monthly Churn Rate (%)</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] p-4 flex items-center justify-center">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnRateData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  labelFormatter={(label, items) => {
                    const item = items[0]?.payload;
                    return item && item.year ? `${label} ${item.year}` : label;
                  }}
                  formatter={(value) => [`${value}%`, 'Churn Rate']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: 'none' 
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground text-center">
                No monthly churn data available.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurnRateChart;
