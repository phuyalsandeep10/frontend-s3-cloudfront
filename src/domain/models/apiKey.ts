
// API Key domain models
export interface ApiKey {
  id: string;
  description: string;
  createdAt: string;
  lastUsedAt?: string;
  isActive?: boolean; // optional for backward compat
  active?: boolean; // supports new API
  prefix: string; // First few characters of the key for display
  hashedKey?: string; // For visualizing the hashed key
}

export interface ApiKeyResponse {
  id: string;
  rawKey?: string;
  createdAt: string;
  hashedKey?: string;
}

