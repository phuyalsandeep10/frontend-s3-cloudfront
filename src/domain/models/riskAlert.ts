
// Risk Alert domain models
export interface RiskAlert {
  id: string;
  created_at: string;
  status: 'New' | 'Acknowledged' | 'Resolved' | 'Dismissed';
  category: 'Churn Risk' | 'Payment Issue' | 'Activity Drop' | 'Support Escalation';
  message: string;
  assigned_to: string | null;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  customerId?: string; // Added for backward compatibility
  customerName?: string; // Will be populated from customer service
}

// We're keeping the original alert types for backward compatibility in the UI
export type AlertType = 'churn_risk' | 'activity_drop' | 'support_escalation' | 'payment_issue';
export type AlertStatus = 'new' | 'acknowledged' | 'resolved' | 'dismissed';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

// Mapping from API values to internal values for compatibility
export const mapStatusToInternal = (status: string): AlertStatus => {
  const normalizedStatus = status.toLowerCase();
  const statusMap: Record<string, AlertStatus> = {
    'new': 'new',
    'acknowledged': 'acknowledged',
    'resolved': 'resolved',
    'dismissed': 'dismissed'
  };
  return statusMap[normalizedStatus] || 'new';
};

export const mapCategoryToAlertType = (category: string): AlertType => {
  const normalizedCategory = category.toLowerCase();
  const categoryMap: Record<string, AlertType> = {
    'churn risk': 'churn_risk',
    'payment issue': 'payment_issue',
    'activity drop': 'activity_drop',
    'support escalation': 'support_escalation'
  };
  return categoryMap[normalizedCategory] || 'churn_risk';
};

export const mapSeverityToInternal = (severity: string): AlertSeverity => {
  const normalizedSeverity = severity.toLowerCase();
  const severityMap: Record<string, AlertSeverity> = {
    'critical': 'critical',
    'high': 'high',
    'medium': 'medium',
    'low': 'low'
  };
  return severityMap[normalizedSeverity] || 'high';
};
