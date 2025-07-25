
import { RiskAlert } from "./riskAlert";

export interface RiskAlertDetails extends RiskAlert {
  relatedTickets?: number;
  lastActivityDate?: string;
  customerValue?: string;
  customerSince?: string;
  riskDetails?: {
    factor: string;
    value: string;
    impact: 'low' | 'medium' | 'high';
  }[];
}

export interface RiskAlertAction {
  type: 'acknowledge' | 'resolve' | 'dismiss' | 'assign';
  alertId: string;
  assignTo?: string;
  notes?: string;
}
