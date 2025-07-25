import { FaqItem, KnowledgeBaseArticle, ContactMethod } from "@/domain/models/helpAndSupport";

// --- Realistic FAQs for the NestCRM application ---
const NESTCRM_FAQS: FaqItem[] = [
  {
    id: "faq-getting-started",
    question: "How do I get started with NestCRM?",
    answer: "Sign up using your business email, set up your team and workspace, and use the onboarding wizard to import customer data and configure prediction settings.",
    category: "general"
  },
  {
    id: "faq-ai-churn-prediction",
    question: "How does AI-powered churn prediction work in NestCRM?",
    answer: "NestCRM leverages machine learning to analyze customer interactions, purchase history, support tickets, and engagement trends to predict which customers are at risk of churn. The system continuously learns and updates its models for better accuracy.",
    category: "features"
  },
  {
    id: "faq-custom-fields",
    question: "Can I add custom fields to my customer records?",
    answer: "Yes. Navigate to Settings > Custom Fields to create, edit, or organize custom data fields for customers, orders, payments, and more.",
    category: "features"
  },
  {
    id: "faq-dashboard-insights",
    question: "What insights are available on the dashboard?",
    answer: "The dashboard provides an overview of churn predictions, customer risk categories, monthly churn rate trends, recent activity, and alerts about at-risk customers or abnormal patterns.",
    category: "features"
  },
  {
    id: "faq-data-security",
    question: "How does NestCRM ensure my data is secure?",
    answer: "Every tenant has an isolated database and environment. All data is encrypted at rest and in transit. Only authorized users within your organization have access.",
    category: "general"
  },
  {
    id: "faq-subscription-management",
    question: "How can I manage or upgrade my subscription?",
    answer: "Go to Settings > Billing & Subscription to view current plan details, update payment methods, download invoices, or upgrade/downgrade your subscription.",
    category: "billing"
  },
  {
    id: "faq-field-mapping",
    question: "Why do I need to map my custom fields for predictions?",
    answer: "Mapping connects your business-specific data fields with the AI model requirements, so predictions are accurate based on your data structure. Changes can be made in Settings > Prediction Mapping.",
    category: "features"
  },
  {
    id: "faq-user-access",
    question: "How do I manage user roles and permissions?",
    answer: "Administrators can invite team members and assign roles in Settings > Team & Access. Fine-grained permissions are available for module access and actions.",
    category: "account"
  },
  {
    id: "faq-integration",
    question: "Can I integrate NestCRM with other tools?",
    answer: "Currently, NestCRM offers integrations with select marketing and support tools via the Integrations section. You can also contact support to request custom integrations.",
    category: "features"
  },
  {
    id: "faq-support-contact",
    question: "How do I contact NestCRM support?",
    answer: "You can reach our team via the Help & Support section in the application, where live chat, a support ticket system, and email options are available.",
    category: "account"
  },
  {
    id: "faq-reports-export",
    question: "Is it possible to export my data or reports?",
    answer: "Yes. Reports and most tables are exportable in CSV or Excel format. Exports can be accessed from each module’s action menu or via the Reports page.",
    category: "features"
  },
  {
    id: "faq-dashboard-customization",
    question: "Can I customize my dashboard?",
    answer: "We support customizable widgets and layouts for your dashboard. Drag and drop cards, filter metrics, and pin your preferred views.",
    category: "features"
  },
  {
    id: "faq-reset-password",
    question: "I forgot my password. How do I reset it?",
    answer: "Click the 'Forgot password?' link on the login page and follow the instructions to reset your password via email.",
    category: "account"
  },
  {
    id: "faq-tenancy-multi-tenancy",
    question: "What does per-tenant isolation mean?",
    answer: "Each customer (tenant) has their own secure instance, with isolated databases and infrastructure, ensuring data privacy and scalability.",
    category: "technical"
  },
  {
    id: "faq-api-access",
    question: "Does NestCRM provide API access?",
    answer: "API access is available for enterprise customers. Please contact support for documentation and API key provisioning.",
    category: "technical"
  },
  {
    id: "faq-reporting-delivery",
    question: "How are reports delivered or scheduled?",
    answer: "You can generate ad-hoc reports from the Reports section. Scheduled email delivery and dashboard sharing are available on premium plans.",
    category: "features"
  }
];

// --- Realistic Knowledge Base Articles for the NestCRM application ---
const NESTCRM_KB_ARTICLES: KnowledgeBaseArticle[] = [
  {
    id: "kb-getting-started",
    title: "Getting Started: Account Setup & Onboarding",
    summary: "Learn how to register your organization, invite your team, and complete the onboarding flow to start using NestCRM.",
    content: `Learn how to get NestCRM ready for your business – from account creation to importing customer data, setting up prediction engines, and inviting your team.`,
    category: "Onboarding",
    tags: ["onboarding", "setup", "account"],
    createdAt: "2024-01-15T08:10:00Z",
    updatedAt: "2024-04-01T13:45:00Z"
  },
  {
    id: "kb-churn-prediction",
    title: "Understanding AI-Powered Churn Prediction",
    summary: "A deep dive into how NestCRM's AI engine predicts and highlights at-risk customers and what you can do with that data.",
    content: `NestCRM uses machine learning to surface meaningful churn insights. This article covers how scores are calculated, which customer signals are considered, and how users can adjust settings to improve relevance for their business.`,
    category: "AI & Predictions",
    tags: ["ai", "churn", "predictions"],
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-04-05T11:30:00Z"
  },
  {
    id: "kb-import-export",
    title: "Importing and Exporting Data",
    summary: "Step-by-step instructions for adding data to NestCRM or exporting your reports and customer lists.",
    content: `Guides for using CSV/Excel import tools, field mapping for custom data, and safe export of reports or customer lists, respecting privacy compliance.`,
    category: "Data Management",
    tags: ["import", "export", "data"],
    createdAt: "2024-03-01T10:12:00Z",
    updatedAt: "2024-04-07T14:10:00Z"
  },
  {
    id: "kb-billing",
    title: "Managing Billing & Subscription",
    summary: "Update payment methods, access invoices, and review plan options within NestCRM.",
    content: `All billing is handled securely; learn how to update your payment details, download invoices, and manage your subscription within the platform.`,
    category: "Billing",
    tags: ["billing", "payment", "subscription"],
    createdAt: "2024-03-20T07:55:00Z",
    updatedAt: "2024-04-10T16:26:00Z"
  },
  {
    id: "kb-integrations",
    title: "Connecting Integrations",
    summary: "How to connect your favorite marketing, support, and analytics tools with NestCRM.",
    content: `NestCRM currently supports core integrations with market-leading SaaS platforms. Follow this guide to authorize connections and import or sync data with third-party systems.`,
    category: "Integrations",
    tags: ["integrations", "api", "connect"],
    createdAt: "2024-03-25T11:18:00Z",
    updatedAt: "2024-04-12T09:41:00Z"
  },
  {
    id: "kb-api-usage",
    title: "Using the NestCRM API",
    summary: "Learn how to programmatically access and manage your NestCRM data with our secure REST API.",
    content: `NestCRM provides a RESTful API for advanced integrations, automation, and custom workflows.

**Getting Started**
- The API is available for enterprise and premium plans.
- You must request access to get your personal API key from the Support team.

**Authentication**
- Requests require an API key sent in the \`Authorization\` header as \`Bearer YOUR_API_KEY\`.
- Example:
\`\`\`http
GET /api/customer HTTP/1.1
Host: yourcompany.mausamcrm.site
Authorization: Bearer YOUR_API_KEY
\`\`\`

**Available Resources**
- \`/api/customer\` — List, get, create, update, or delete customers.
- \`/api/order\` — Manage orders.
- \`/api/payment\` — Access payment records.
- \`/api/predictions\` — Access churn predictions and insights.

**Example: Fetch all customers**
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://yourcompany.mausamcrm.site/api/customer
\`\`\`

**Best Practices**
- Always keep your API key private.
- Observe rate limits to avoid throttling.
- Call \`/api/docs\` for full OpenAPI documentation (available to authorized users).

**Troubleshooting**
- If you receive a 401 error, verify your API key and permissions.
- Contact support for technical questions or to request more endpoints.
    `,
    category: "Integrations",
    tags: ["api", "rest", "integration", "authentication"],
    createdAt: "2024-04-20T12:00:00Z",
    updatedAt: "2024-04-21T10:42:00Z"
  }
];

// --- Realistic Contact Methods for the NestCRM application ---
const NESTCRM_CONTACT_METHODS: ContactMethod[] = [
  {
    id: "contact-email",
    type: "email",
    value: "support@mausamcrm.site",
    description: "Email our support team for assistance or questions.",
    availableHours: "Mon–Fri, 8am–6pm AEST"
  },
  {
    id: "contact-phone",
    type: "phone",
    value: "+61 2 8000 1234",
    description: "Call us for urgent support or business inquiries.",
    availableHours: "Mon–Fri, 9am–5pm AEST"
  },
  {
    id: "contact-chat",
    type: "chat",
    value: "Live Chat (in-app)",
    description: "Instant reply for quick questions via in-app chat.",
    availableHours: "Mon–Fri, 9am–6pm AEST"
  }
];

export const helpAndSupportService = {
  // Fetch all FAQs
  getFaqs: async (): Promise<FaqItem[]> => {
    return NESTCRM_FAQS;
  },

  // Fetch FAQs by category
  getFaqsByCategory: async (category: FaqItem['category']): Promise<FaqItem[]> => {
    return NESTCRM_FAQS.filter(faq => faq.category === category);
  },

  // Fetch all Knowledge Base articles
  getKnowledgeBaseArticles: async (): Promise<KnowledgeBaseArticle[]> => {
    return NESTCRM_KB_ARTICLES;
  },

  // Fetch Knowledge Base article by ID
  getKnowledgeBaseArticleById: async (id: string): Promise<KnowledgeBaseArticle | undefined> => {
    return NESTCRM_KB_ARTICLES.find(article => article.id === id);
  },

  // Fetch all contact methods
  getContactMethods: async (): Promise<ContactMethod[]> => {
    return NESTCRM_CONTACT_METHODS;
  }
};
