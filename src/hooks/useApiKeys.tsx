
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiKeyService } from "@/services/apiKeyService";
import { ApiKey, ApiKeyResponse } from "@/domain/models/apiKey";

export function useApiKeys() {
  const [newApiKey, setNewApiKey] = useState<ApiKeyResponse | null>(null);
  const [visualizedKey, setVisualizedKey] = useState<ApiKey | null>(null);
  const queryClient = useQueryClient();

  // Get API keys
  const {
    data: apiKeys,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["apiKeys"],
    queryFn: apiKeyService.getApiKeys,
  });

  // Generate API key mutation
  const generateKeyMutation = useMutation({
    mutationFn: apiKeyService.generateApiKey,
    onSuccess: (data) => {
      setNewApiKey(data);
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
      toast.success("API key generated successfully");
    },
    onError: (error) => {
      toast.error("Failed to generate API key");
      console.error("API key generation failed:", error);
    },
  });

  // Revoke API key mutation
  const revokeKeyMutation = useMutation({
    mutationFn: apiKeyService.revokeApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
      toast.success("API key revoked successfully");
    },
    onError: (error) => {
      toast.error("Failed to revoke API key");
      console.error("API key revocation failed:", error);
    },
  });

  // View API key details by id
  const viewKeyById = async (id: string) => {
    try {
      const data = await apiKeyService.getApiKeyById(id);
      setVisualizedKey(data);
    } catch (error) {
      toast.error("Failed to fetch API key details");
    }
  };

  const clearVisualizedKey = () => setVisualizedKey(null);

  // Generate new API key
  const generateApiKey = (description?: string) => {
    generateKeyMutation.mutate(description);
  };

  // Clear the newly generated API key from state
  const clearNewApiKey = () => {
    setNewApiKey(null);
  };

  // Revoke an API key
  const revokeApiKey = (id: string) => {
    revokeKeyMutation.mutate(id);
  };

  return {
    apiKeys: apiKeys || [],
    newApiKey,
    isLoading,
    isGenerating: generateKeyMutation.isPending,
    isRevoking: revokeKeyMutation.isPending,
    error,
    generateApiKey,
    revokeApiKey,
    clearNewApiKey,
    visualizedKey,
    viewKeyById,
    clearVisualizedKey,
  };
}
