
import { ApiDocumentation, ApiCategory, ApiEndpoint } from "@/domain/models/apiDocumentation";

// Mock API documentation data for NestCRM
const API_DOCUMENTATION: ApiDocumentation = {
  introduction: `
# NestCRM API Documentation

Welcome to the NestCRM API documentation. Our API provides programmatic access to your customer data, 
orders, payments, and prediction insights. This RESTful API allows you to build your own integrations
with NestCRM and extend its capabilities to meet your specific business needs.

## Getting Started

Before using the API, you need to obtain an API key from your account settings. This key should be
included in all API requests as a Bearer token in the Authorization header.
  `,
  authentication: `
## Authentication

All API endpoints require authentication. To authenticate your requests, include an Authorization header
with a Bearer token.

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

API keys are available for enterprise and premium plans. Contact support if you need assistance
generating an API key.
  `,
  rateLimit: `
## Rate Limiting

The API is rate limited to protect our services from abuse. Current limits are:
- 100 requests per minute for standard plans
- 1000 requests per minute for enterprise plans

If you exceed these limits, you'll receive a 429 Too Many Requests response. The response headers include:
- X-RateLimit-Limit: Total requests allowed per minute
- X-RateLimit-Remaining: Requests remaining in the current window
- X-RateLimit-Reset: Time when the current window resets (Unix timestamp)
  `,
  baseUrl: "https://yourcompany.mausamcrm.site/api",
  categories: [
    {
      id: "customers",
      name: "Customers",
      description: "API endpoints for working with customer data, including creating, retrieving, updating, and deleting customers.",
      endpoints: [
        {
          id: "get-customers",
          path: "/customer",
          method: "GET",
          title: "List Customers",
          description: "Returns a list of customers. The response can be filtered and paginated.",
          authentication: "Bearer Token",
          requestParams: [
            {
              name: "limit",
              type: "integer",
              description: "Maximum number of records to return. Default is 20, maximum is 100.",
              required: false
            },
            {
              name: "offset",
              type: "integer",
              description: "Number of records to skip. Default is 0.",
              required: false
            },
            {
              name: "sort",
              type: "string",
              description: "Field to sort by. Add '-' prefix for descending order. Example: sort=name or sort=-createdAt",
              required: false
            }
          ],
          examples: [
            {
              title: "List all customers",
              request: {
                curl: "curl -X GET \"https://yourcompany.mausamcrm.site/api/customer\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\"",
                javascript: "fetch('https://yourcompany.mausamcrm.site/api/customer', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data));",
                python: "import requests\n\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY'\n}\n\nresponse = requests.get('https://yourcompany.mausamcrm.site/api/customer', headers=headers)\ndata = response.json()\nprint(data)"
              },
              response: "{\n  \"data\": [\n    {\n      \"id\": \"cust-1\",\n      \"name\": \"Acme Corporation\",\n      \"email\": \"contact@acme.com\",\n      \"phone\": \"+61 2 1234 5678\",\n      \"createdAt\": \"2023-01-15T08:30:00Z\",\n      \"customFields\": {\n        \"industry\": \"Manufacturing\",\n        \"size\": \"Enterprise\"\n      }\n    },\n    {\n      \"id\": \"cust-2\",\n      \"name\": \"TechStart Inc\",\n      \"email\": \"hello@techstart.co\",\n      \"phone\": \"+61 3 8765 4321\",\n      \"createdAt\": \"2023-02-20T14:15:00Z\",\n      \"customFields\": {\n        \"industry\": \"Technology\",\n        \"size\": \"SMB\"\n      }\n    }\n  ],\n  \"meta\": {\n    \"total\": 42,\n    \"limit\": 20,\n    \"offset\": 0\n  }\n}"
            }
          ],
          errors: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "Invalid API key",
              description: "The provided API key is invalid or has been revoked."
            },
            {
              status: 403,
              code: "FORBIDDEN",
              message: "Insufficient permissions",
              description: "Your API key doesn't have permission to access this resource."
            }
          ]
        },
        {
          id: "get-customer",
          path: "/customer/:id",
          method: "GET",
          title: "Get Customer",
          description: "Returns a single customer by ID.",
          authentication: "Bearer Token",
          requestParams: [
            {
              name: "id",
              type: "string",
              description: "The unique identifier for the customer.",
              required: true
            }
          ],
          examples: [
            {
              title: "Get a customer by ID",
              request: {
                curl: "curl -X GET \"https://yourcompany.mausamcrm.site/api/customer/cust-1\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\"",
                javascript: "fetch('https://yourcompany.mausamcrm.site/api/customer/cust-1', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data));",
                python: "import requests\n\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY'\n}\n\nresponse = requests.get('https://yourcompany.mausamcrm.site/api/customer/cust-1', headers=headers)\ndata = response.json()\nprint(data)"
              },
              response: "{\n  \"id\": \"cust-1\",\n  \"name\": \"Acme Corporation\",\n  \"email\": \"contact@acme.com\",\n  \"phone\": \"+61 2 1234 5678\",\n  \"createdAt\": \"2023-01-15T08:30:00Z\",\n  \"customFields\": {\n    \"industry\": \"Manufacturing\",\n    \"size\": \"Enterprise\"\n  }\n}"
            }
          ],
          errors: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "Invalid API key",
              description: "The provided API key is invalid or has been revoked."
            },
            {
              status: 404,
              code: "NOT_FOUND",
              message: "Customer not found",
              description: "No customer with the specified ID exists."
            }
          ]
        },
        {
          id: "create-customer",
          path: "/customer",
          method: "POST",
          title: "Create Customer",
          description: "Creates a new customer record.",
          authentication: "Bearer Token",
          requestBody: {
            type: "object",
            properties: {
              customFields: {
                type: "object",
                description: "Fields for the customer."
              },
              associations: {
                type: "object",
                description: "Associated identifiers for the customer."
              }
            },
            example: "{\n  \"customFields\": {\n    \"name\": \"New Customer Inc\",\n    \"email\": \"contact@newcustomer.com\",\n    \"phone\": \"+61 4 1234 5678\",\n    \"industry\": \"Retail\"\n  },\n  \"associations\": {\n    \"email\": \"contact@newcustomer.com\"\n  }\n}"
          },
          examples: [
            {
              title: "Create a new customer",
              request: {
                curl: "curl -X POST \"https://yourcompany.mausamcrm.site/api/customer\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"customFields\": {\n      \"name\": \"New Customer Inc\",\n      \"email\": \"contact@newcustomer.com\",\n      \"phone\": \"+61 4 1234 5678\",\n      \"industry\": \"Retail\"\n    },\n    \"associations\": {\n      \"email\": \"contact@newcustomer.com\"\n    }\n  }'",
                javascript: "fetch('https://yourcompany.mausamcrm.site/api/customer', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    customFields: {\n      name: 'New Customer Inc',\n      email: 'contact@newcustomer.com',\n      phone: '+61 4 1234 5678',\n      industry: 'Retail'\n    },\n    associations: {\n      email: 'contact@newcustomer.com'\n    }\n  })\n})\n.then(response => response.json())\n.then(data => console.log(data));",
                python: "import requests\nimport json\n\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n}\n\ndata = {\n    'customFields': {\n        'name': 'New Customer Inc',\n        'email': 'contact@newcustomer.com',\n        'phone': '+61 4 1234 5678',\n        'industry': 'Retail'\n    },\n    'associations': {\n        'email': 'contact@newcustomer.com'\n    }\n}\n\nresponse = requests.post('https://yourcompany.mausamcrm.site/api/customer', headers=headers, data=json.dumps(data))\nresult = response.json()\nprint(result)"
              },
              response: "{\n  \"id\": \"cust-123\",\n  \"name\": \"New Customer Inc\",\n  \"email\": \"contact@newcustomer.com\",\n  \"phone\": \"+61 4 1234 5678\",\n  \"createdAt\": \"2024-04-23T09:45:00Z\",\n  \"customFields\": {\n    \"industry\": \"Retail\"\n  }\n}"
            }
          ],
          errors: [
            {
              status: 400,
              code: "BAD_REQUEST",
              message: "Invalid request body",
              description: "The request body contains invalid or missing required fields."
            },
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "Invalid API key",
              description: "The provided API key is invalid or has been revoked."
            }
          ]
        }
      ]
    },
    {
      id: "orders",
      name: "Orders",
      description: "API endpoints for managing orders, including creating, retrieving, updating, and deleting orders.",
      endpoints: [
        {
          id: "get-orders",
          path: "/order",
          method: "GET",
          title: "List Orders",
          description: "Returns a list of orders. The response can be filtered and paginated.",
          authentication: "Bearer Token",
          requestParams: [
            {
              name: "limit",
              type: "integer",
              description: "Maximum number of records to return. Default is 20, maximum is 100.",
              required: false
            },
            {
              name: "offset",
              type: "integer",
              description: "Number of records to skip. Default is 0.",
              required: false
            },
            {
              name: "customerId",
              type: "string",
              description: "Filter orders by customer ID.",
              required: false
            },
            {
              name: "status",
              type: "string",
              description: "Filter orders by status (pending, processing, shipped, delivered, cancelled).",
              required: false
            }
          ],
          examples: [
            {
              title: "List all orders",
              request: {
                curl: "curl -X GET \"https://yourcompany.mausamcrm.site/api/order\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\"",
                javascript: "fetch('https://yourcompany.mausamcrm.site/api/order', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data));",
                python: "import requests\n\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY'\n}\n\nresponse = requests.get('https://yourcompany.mausamcrm.site/api/order', headers=headers)\ndata = response.json()\nprint(data)"
              },
              response: "{\n  \"data\": [\n    {\n      \"id\": \"ord-1\",\n      \"customerId\": \"cust-1\",\n      \"customerName\": \"Acme Corporation\",\n      \"orderNumber\": \"ORD-2024-001\",\n      \"date\": \"2024-01-15T10:30:00Z\",\n      \"status\": \"delivered\",\n      \"total\": 1250.00,\n      \"items\": [\n        {\n          \"id\": \"item-1\",\n          \"productName\": \"Enterprise License\",\n          \"quantity\": 5,\n          \"unitPrice\": 250.00,\n          \"total\": 1250.00\n        }\n      ]\n    },\n    {\n      \"id\": \"ord-2\",\n      \"customerId\": \"cust-2\",\n      \"customerName\": \"TechStart Inc\",\n      \"orderNumber\": \"ORD-2024-002\",\n      \"date\": \"2024-02-20T14:15:00Z\",\n      \"status\": \"processing\",\n      \"total\": 499.00,\n      \"items\": [\n        {\n          \"id\": \"item-2\",\n          \"productName\": \"Premium Subscription\",\n          \"quantity\": 1,\n          \"unitPrice\": 499.00,\n          \"total\": 499.00\n        }\n      ]\n    }\n  ],\n  \"meta\": {\n    \"total\": 24,\n    \"limit\": 20,\n    \"offset\": 0\n  }\n}"
            }
          ],
          errors: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "Invalid API key",
              description: "The provided API key is invalid or has been revoked."
            },
            {
              status: 403,
              code: "FORBIDDEN",
              message: "Insufficient permissions",
              description: "Your API key doesn't have permission to access this resource."
            }
          ]
        }
      ]
    },
    {
      id: "payments",
      name: "Payments",
      description: "API endpoints for managing payments, including creating, retrieving, and updating payment records.",
      endpoints: [
        {
          id: "get-payments",
          path: "/payment",
          method: "GET",
          title: "List Payments",
          description: "Returns a list of payments. The response can be filtered and paginated.",
          authentication: "Bearer Token",
          requestParams: [
            {
              name: "limit",
              type: "integer",
              description: "Maximum number of records to return. Default is 20, maximum is 100.",
              required: false
            },
            {
              name: "offset",
              type: "integer",
              description: "Number of records to skip. Default is 0.",
              required: false
            },
            {
              name: "customerId",
              type: "string",
              description: "Filter payments by customer ID.",
              required: false
            },
            {
              name: "orderId",
              type: "string",
              description: "Filter payments by order ID.",
              required: false
            },
            {
              name: "status",
              type: "string",
              description: "Filter payments by status (pending, completed, failed, refunded).",
              required: false
            }
          ],
          examples: [
            {
              title: "List all payments",
              request: {
                curl: "curl -X GET \"https://yourcompany.mausamcrm.site/api/payment\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\"",
                javascript: "fetch('https://yourcompany.mausamcrm.site/api/payment', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data));",
                python: "import requests\n\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY'\n}\n\nresponse = requests.get('https://yourcompany.mausamcrm.site/api/payment', headers=headers)\ndata = response.json()\nprint(data)"
              },
              response: "{\n  \"data\": [\n    {\n      \"id\": \"pay-1\",\n      \"reference\": \"PAY-2024-001\",\n      \"customerId\": \"cust-1\",\n      \"customerName\": \"Acme Corporation\",\n      \"orderId\": \"ord-1\",\n      \"orderNumber\": \"ORD-2024-001\",\n      \"date\": \"2024-01-15T11:30:00Z\",\n      \"method\": \"credit_card\",\n      \"status\": \"completed\",\n      \"amount\": 1250.00\n    },\n    {\n      \"id\": \"pay-2\",\n      \"reference\": \"PAY-2024-002\",\n      \"customerId\": \"cust-2\",\n      \"customerName\": \"TechStart Inc\",\n      \"orderId\": \"ord-2\",\n      \"orderNumber\": \"ORD-2024-002\",\n      \"date\": \"2024-02-20T15:15:00Z\",\n      \"method\": \"bank_transfer\",\n      \"status\": \"pending\",\n      \"amount\": 499.00\n    }\n  ],\n  \"meta\": {\n    \"total\": 24,\n    \"limit\": 20,\n    \"offset\": 0\n  }\n}"
            }
          ],
          errors: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "Invalid API key",
              description: "The provided API key is invalid or has been revoked."
            },
            {
              status: 403,
              code: "FORBIDDEN",
              message: "Insufficient permissions",
              description: "Your API key doesn't have permission to access this resource."
            }
          ]
        }
      ]
    },
    {
      id: "predictions",
      name: "Predictions",
      description: "API endpoints for accessing AI-powered churn predictions and customer risk data.",
      endpoints: [
        {
          id: "get-predictions",
          path: "/ai/predict",
          method: "GET",
          title: "List Predictions",
          description: "Returns a list of churn predictions for your customers.",
          authentication: "Bearer Token",
          requestParams: [
            {
              name: "limit",
              type: "integer",
              description: "Maximum number of records to return. Default is 20, maximum is 100.",
              required: false
            },
            {
              name: "offset",
              type: "integer",
              description: "Number of records to skip. Default is 0.",
              required: false
            },
            {
              name: "risk_threshold",
              type: "number",
              description: "Filter predictions by minimum risk threshold (0.0 to 1.0).",
              required: false
            }
          ],
          examples: [
            {
              title: "List all predictions",
              request: {
                curl: "curl -X GET \"https://yourcompany.mausamcrm.site/api/ai/predict\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\"",
                javascript: "fetch('https://yourcompany.mausamcrm.site/api/ai/predict', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data));",
                python: "import requests\n\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY'\n}\n\nresponse = requests.get('https://yourcompany.mausamcrm.site/api/ai/predict', headers=headers)\ndata = response.json()\nprint(data)"
              },
              response: "{\n  \"data\": [\n    {\n      \"id\": \"pred-1\",\n      \"customer_id\": \"cust-1\",\n      \"customer_name\": \"Acme Corporation\",\n      \"churn_probability\": 82,\n      \"latest_prediction_at\": \"2024-04-10T08:30:00Z\",\n      \"key_factors\": [\n        {\n          \"feature\": \"Decreased Usage\",\n          \"contribution\": 45\n        },\n        {\n          \"feature\": \"Support Tickets\",\n          \"contribution\": 30\n        },\n        {\n          \"feature\": \"Payment Delays\",\n          \"contribution\": 25\n        }\n      ]\n    },\n    {\n      \"id\": \"pred-2\",\n      \"customer_id\": \"cust-2\",\n      \"customer_name\": \"TechStart Inc\",\n      \"churn_probability\": 23,\n      \"latest_prediction_at\": \"2024-04-10T09:15:00Z\",\n      \"key_factors\": [\n        {\n          \"feature\": \"Feature Adoption\",\n          \"contribution\": 60\n        },\n        {\n          \"feature\": \"Team Expansion\",\n          \"contribution\": 25\n        },\n        {\n          \"feature\": \"Feature Requests\",\n          \"contribution\": 15\n        }\n      ]\n    }\n  ],\n  \"meta\": {\n    \"total\": 42,\n    \"limit\": 20,\n    \"offset\": 0\n  }\n}"
            }
          ],
          errors: [
            {
              status: 401,
              code: "UNAUTHORIZED",
              message: "Invalid API key",
              description: "The provided API key is invalid or has been revoked."
            },
            {
              status: 403,
              code: "FORBIDDEN",
              message: "Insufficient permissions",
              description: "Your API key doesn't have permission to access this resource."
            }
          ]
        }
      ]
    }
  ]
};

export const apiDocumentationService = {
  // Get the complete API documentation
  getApiDocumentation: async (): Promise<ApiDocumentation> => {
    return API_DOCUMENTATION;
  },

  // Get all API categories
  getApiCategories: async (): Promise<ApiCategory[]> => {
    return API_DOCUMENTATION.categories;
  },

  // Get a specific API category by ID
  getApiCategoryById: async (categoryId: string): Promise<ApiCategory | undefined> => {
    return API_DOCUMENTATION.categories.find(category => category.id === categoryId);
  },

  // Get a specific API endpoint by ID
  getApiEndpointById: async (endpointId: string): Promise<ApiEndpoint | undefined> => {
    for (const category of API_DOCUMENTATION.categories) {
      const endpoint = category.endpoints.find(endpoint => endpoint.id === endpointId);
      if (endpoint) {
        return endpoint;
      }
    }
    return undefined;
  }
};
