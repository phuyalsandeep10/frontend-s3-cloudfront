
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const DashboardError: React.FC = () => {
  return (
    <DashboardLayout>
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
            <h3 className="text-lg font-medium">Failed to load dashboard data</h3>
            <p className="text-sm text-red-500 mt-2">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardError;
