
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { toast } from 'sonner';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

type PlanType = 'starter' | 'growth';

export function useSubscription() {
  const queryClient = useQueryClient();

  const { data: subscription, isLoading, error } = useQuery({
    queryKey: ['subscription'],
    queryFn: async (): Promise<SubscriptionData> => {
      const data = await api.get<SubscriptionData>('/subscription/status');
      return data;
    },
    refetchInterval: 30000,
  });

  const upgradeMutation = useMutation({
    mutationFn: async (plan: PlanType) => {
      const response = await api.post('/subscription/upsert', { plan });
      return response;
    },
    onSuccess: () => {
      toast.success('Subscription updated successfully');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
    onError: (error) => {
      toast.error('Failed to update subscription');
      console.error('Upgrade error:', error);
    },
  });

  const manageSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/subscription/cancel', {});
      return response;
    },
    onSuccess: () => {
      toast.success('Subscription canceled successfully');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
    onError: (error) => {
      toast.error('Failed to cancel subscription');
      console.error('Manage subscription error:', error);
    },
  });

  const getAvailableUpgradePlan = (): PlanType | null => {
    if (!subscription) return 'starter';
    if (!subscription.subscribed) return 'starter';
    if (subscription.subscription_tier === 'starter') return 'growth';
    return null; // Already on growth plan, no upgrade available
  };

  return {
    subscription,
    isLoading,
    error,
    upgrade: upgradeMutation.mutate,
    cancelSubscription: manageSubscriptionMutation.mutate,
    isUpdating: upgradeMutation.isPending,
    isCanceling: manageSubscriptionMutation.isPending,
    getAvailableUpgradePlan,
  };
}
