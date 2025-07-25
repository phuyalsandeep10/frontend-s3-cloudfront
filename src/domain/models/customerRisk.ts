
// Customer risk domain models
export interface CustomerRiskData {
  id: number;
  name: string;
  email: string;
  company?: string;
  industry: string;
  value: string;
  riskScore: number;
  riskLevel?: "low" | "medium" | "high";
  lastActivity?: string;
  status: 'High Risk' | 'Medium Risk' | 'Low Risk';
  customFields?: {
    revenueYTD?: string;
    contractEndDate?: string;
    supportTickets?: number;
    productUsage?: string;
    activeUsers?: number;
    lastInteraction?: string;
    subscriptionPlan?: string;
    paymentStatus?: string;
    [key: string]: any;
  };
}

export interface ColumnVisibility {
  name: boolean;
  email: boolean;
  industry: boolean;
  value: boolean;
  riskScore: boolean;
  status: boolean;
  [key: string]: boolean; // Allow dynamic custom field keys
}

export interface RiskTrend {
  customerId: number;
  previousScore: number;
  currentScore: number;
  change: number;
  trend: 'improving' | 'stable' | 'worsening';
  date: string;
}
