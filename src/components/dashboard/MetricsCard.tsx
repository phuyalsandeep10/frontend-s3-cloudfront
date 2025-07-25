
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeDelta } from "@/components/dashboard/BadgeDelta";
import { MetricCardProps } from "@/domain/models/dashboard";

const MetricsCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  deltaType, 
  deltaLabel, 
  icon 
}) => {
  return (
    <Card className="shadow-md overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-1">
              <BadgeDelta type={deltaType} />
              <span className="text-xs text-muted-foreground ml-2">{deltaLabel}</span>
            </div>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
