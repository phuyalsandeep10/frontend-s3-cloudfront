
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

interface CurrentSubscriptionProps {
  subscription: any;
  currentPlan: any;
  availableUpgradePlan: 'starter' | 'growth' | null;
  isUpdating: boolean;
  isCanceling: boolean;
  onUpgrade: (plan: 'starter' | 'growth') => void;
  onCancel: () => void;
}

export const CurrentSubscription: React.FC<CurrentSubscriptionProps> = ({
  subscription,
  currentPlan,
  availableUpgradePlan,
  isUpdating,
  isCanceling,
  onUpgrade,
  onCancel,
}) => {
  if (!subscription?.subscribed) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle>No Active Subscription</CardTitle>
          </div>
          <CardDescription>Choose a plan to access premium features</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Select a subscription plan below to get started with our premium features.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Current Subscription</CardTitle>
        <CardDescription>Your active subscription details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="font-medium text-lg capitalize">{subscription.subscription_tier}</p>
            </div>
            
            {subscription.subscription_end && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Renews on</p>
                <p className="font-medium text-lg">
                  {format(new Date(subscription.subscription_end), 'MMMM d, yyyy')}
                </p>
              </div>
            )}
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-2">Features included:</p>
            <ul className="space-y-2">
              {currentPlan?.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        {availableUpgradePlan && (
          <Button 
            onClick={() => onUpgrade(availableUpgradePlan)}
            disabled={isUpdating}
            className="w-full sm:w-auto"
          >
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upgrade to {availableUpgradePlan === 'growth' ? 'Growth' : 'Starter'} Plan
          </Button>
        )}
        <Button 
          variant="destructive" 
          onClick={onCancel} 
          disabled={isCanceling}
          className="w-full sm:w-auto"
        >
          {isCanceling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Cancel Subscription
        </Button>
      </CardFooter>
    </Card>
  );
};
