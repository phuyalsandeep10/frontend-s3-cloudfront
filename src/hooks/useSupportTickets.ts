
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportService } from '@/services/supportService';
import { SupportTicket, SupportTicketApiRequest } from '@/domain/models/support';
import { toast } from 'sonner';

export function useSupportTickets() {
  const queryClient = useQueryClient();
  
  const { data: supportTickets = [], isLoading, error, refetch } = useQuery({
    queryKey: ['supportTickets'],
    queryFn: async () => {
      try {
        const tickets = await supportService.getSupportTickets();
        return tickets || [];
      } catch (error) {
        console.error('Error fetching support tickets:', error);
        toast.error('Failed to load support tickets');
        return [];
      }
    }
  });

  const createTicketMutation = useMutation({
    mutationFn: (ticketData: SupportTicketApiRequest) => supportService.createSupportTicket(ticketData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
      toast.success('Support ticket created successfully');
    },
    onError: (error) => {
      console.error('Error creating support ticket:', error);
      toast.error('Failed to create support ticket');
    }
  });

  const updateTicketMutation = useMutation({
    mutationFn: ({ id, ticketData }: { id: string; ticketData: SupportTicketApiRequest }) => 
      supportService.updateSupportTicket(id, ticketData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
      toast.success('Support ticket updated successfully');
    },
    onError: (error) => {
      console.error('Error updating support ticket:', error);
      toast.error('Failed to update support ticket');
    }
  });

  const deleteTicketMutation = useMutation({
    mutationFn: (id: string) => supportService.deleteSupportTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
      toast.success('Support ticket deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting support ticket:', error);
      toast.error('Failed to delete support ticket');
    }
  });

  return {
    supportTickets,
    isLoading,
    error,
    refetch,
    createTicket: createTicketMutation.mutate,
    updateTicket: updateTicketMutation.mutate,
    deleteTicket: deleteTicketMutation.mutate,
    isCreating: createTicketMutation.isPending,
    isUpdating: updateTicketMutation.isPending,
    isDeleting: deleteTicketMutation.isPending
  };
}
