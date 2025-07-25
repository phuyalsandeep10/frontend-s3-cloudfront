import React, { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';
import { SubscriptionHeader } from '@/components/subscription/SubscriptionHeader';
import { BillingToggle } from '@/components/subscription/BillingToggle';
import { CurrentSubscription } from '@/components/subscription/CurrentSubscription';
import { PlanCard } from '@/components/subscription/PlanCard';

const plans = [
  {
    id: 'starter',
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: 19.90,
    features: [
      "Up to 1,000 customers",
      "Basic churn prediction",
      "Weekly risk reports",
      "Email support",
      "1 user account",
    ],
    highlight: false,
  },
  {
    id: 'growth',
    name: "Growth",
    description: "Ideal for growing businesses seeking advanced insights",
    price: 49.00,
    features: [
      "Up to 10,000 customers",
      "Advanced churn prediction",
      "Daily risk reports",
      "Customer segmentation",
      "Intervention recommendations",
      "Priority support",
      "5 user accounts",
    ],
    highlight: true,
  }
];

export default function Subscription() {
  const { subscription, isLoading, upgrade, cancelSubscription, isUpdating, isCanceling, getAvailableUpgradePlan } = useSubscription();
  const [isAnnual, setIsAnnual] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleUpgrade = (planId: 'starter' | 'growth') => {
    upgrade(planId);
  };

  const handleCancel = () => {
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    cancelSubscription();
    setCancelDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const availableUpgradePlan = getAvailableUpgradePlan();
  const currentPlanId = subscription?.subscribed ? subscription.subscription_tier : null;
  const currentPlan = plans.find(plan => plan.id === currentPlanId);
  
  return (
    <div className="space-y-6">
      <SubscriptionHeader 
        subscriptionTier={subscription?.subscription_tier}
        isSubscribed={subscription?.subscribed}
      />
      
      <CurrentSubscription 
        subscription={subscription}
        currentPlan={currentPlan}
        availableUpgradePlan={availableUpgradePlan}
        isUpdating={isUpdating}
        isCanceling={isCanceling}
        onUpgrade={handleUpgrade}
        onCancel={handleCancel}
      />

      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold">Available Plans</h2>
          <BillingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              isCurrentPlan={currentPlanId === plan.id}
              isUpdating={isUpdating}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </div>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your subscription immediately. You will lose access to premium features
              at the end of your current billing period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my plan</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-destructive">
              {isCanceling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Yes, cancel my subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
