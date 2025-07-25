
import React from 'react';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SubscriptionHeaderProps {
  subscriptionTier?: string | null;
  isSubscribed?: boolean;
}

export const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({ subscriptionTier, isSubscribed }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground mt-2">Manage your subscription plan and billing details</p>
      </div>
      
      {isSubscribed && subscriptionTier && (
        <Badge variant="outline" className="px-3 py-1 mt-2 md:mt-0 flex items-center gap-2 bg-primary/10">
          <Package className="h-4 w-4" />
          <span className="capitalize">{subscriptionTier} Plan</span>
        </Badge>
      )}
    </div>
  );
};
