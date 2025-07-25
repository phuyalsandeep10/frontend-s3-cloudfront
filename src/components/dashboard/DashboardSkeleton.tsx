
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const DashboardSkeleton: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="shadow-md">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Skeleton className="h-[600px] w-full rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </DashboardLayout>
  );
};

export default DashboardSkeleton;
