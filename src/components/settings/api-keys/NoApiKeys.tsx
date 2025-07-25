
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Key } from "lucide-react";

const NoApiKeys: React.FC = () => {
  return (
    <Card className="border-dashed border-muted">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
          <Key className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No API keys yet</h3>
        <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
          Generate an API key to integrate with other services or access the NestCRM API programmatically.
        </p>
      </CardContent>
    </Card>
  );
};

export default NoApiKeys;
