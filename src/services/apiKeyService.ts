
import { api } from "@/utils/api";
import { ApiKey, ApiKeyResponse } from "@/domain/models/apiKey";

export const apiKeyService = {
  /**
   * Generate a new API key
   * @param description Optional description for the key
   */
  generateApiKey: async (description?: string): Promise<ApiKeyResponse> => {
    return api.post<ApiKeyResponse>("/api-key", { description });
  },

  /**
   * Get all API keys for current tenant
   */
  getApiKeys: async (): Promise<ApiKey[]> => {
    return api.get<ApiKey[]>("/api-key");
  },

  /**
   * Get a specific API key's details (for visualization)
   */
  getApiKeyById: async (id: string): Promise<ApiKey> => {
    return api.get<ApiKey>(`/api-key/${id}`);
  },

  /**
   * Revoke an API key (new endpoint)
   * @param id API key ID to revoke
   */
  revokeApiKey: async (id: string): Promise<void> => {
    return api.delete<void>(`/api-key/${id}`);
  }
};
