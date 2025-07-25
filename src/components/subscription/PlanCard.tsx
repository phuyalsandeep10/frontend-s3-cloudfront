
import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    highlight: boolean;
  };
  isAnnual: boolean;
  isCurrentPlan: boolean;
  isUpdating: boolean;
  onUpgrade: (planId: 'starter' | 'growth') => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isAnnual,
  isCurrentPlan,
  isUpdating,
  onUpgrade,
}) => {
  return (
    <Card className={`${isCurrentPlan ? 'border-primary' : 'border'}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          {isCurrentPlan && (
            <Badge className="bg-primary">Current Plan</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-3xl font-bold">${isAnnual ? (plan.price * 12 * 0.8).toFixed(2) : plan.price}</span>
          <span className="text-muted-foreground ml-1">/{isAnnual ? 'year' : 'month'}</span>
          {isAnnual && (
            <p className="text-green-600 text-sm mt-1">Save 20% with annual billing</p>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <p className="font-medium mb-2">Features:</p>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onUpgrade(plan.id as 'starter' | 'growth')} 
          className="w-full" 
          variant={plan.highlight ? "default" : "outline"}
          disabled={isCurrentPlan || isUpdating}
        >
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isCurrentPlan ? 'Current Plan' : 'Switch to this Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};
