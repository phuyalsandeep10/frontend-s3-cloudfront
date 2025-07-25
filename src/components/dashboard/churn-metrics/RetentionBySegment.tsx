
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface RetentionByAgeGroupProps {
  retentionData: Array<{
    ageGroup: string;
    retention: number;
  }>;
}

const RetentionByAgeGroup: React.FC<RetentionByAgeGroupProps> = ({ retentionData }) => {
  const hasData = Array.isArray(retentionData) && retentionData.length > 0;

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Retention Rate by Age Group (%)</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] p-4">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={retentionData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="ageGroup" stroke="#6b7280" />
                <YAxis domain={[70, 100]} stroke="#6b7280" />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Retention Rate']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: 'none' 
                  }}
                />
                <Bar dataKey="retention" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <div className="mb-2">
                <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="24" cy="24" r="22" stroke="#e5e7eb" strokeWidth="4"/>
                  <path d="M16 24h16" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <p>No retention data available.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionByAgeGroup;
