
// API Documentation domain models

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  title: string;
  description: string;
  authentication: string;
  requestParams?: ApiParam[];
  requestBody?: ApiSchema;
  responseBody?: ApiSchema;
  examples: ApiExample[];
  errors: ApiError[];
}

export interface ApiParam {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface ApiSchema {
  type: string;
  properties: Record<string, {
    type: string;
    description: string;
    required?: boolean;
  }>;
  example: string;
}

export interface ApiExample {
  title: string;
  request: {
    curl?: string;
    javascript?: string;
    python?: string;
  };
  response: string;
}

export interface ApiError {
  status: number;
  code: string;
  message: string;
  description: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
  endpoints: ApiEndpoint[];
}

export interface ApiDocumentation {
  introduction: string;
  authentication: string;
  rateLimit: string;
  baseUrl: string;
  categories: ApiCategory[];
}
