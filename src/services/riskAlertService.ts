
import { RiskAlert, mapStatusToInternal, mapCategoryToAlertType, mapSeverityToInternal } from "@/domain/models/riskAlert";
import { RiskAlertDetails } from "@/domain/models/riskAlertDetails";
import { api } from "@/utils/api";
import { customerService } from "./customerService";

// This function will fetch customer names based on IDs
const enrichAlertsWithCustomerInfo = async (alerts: RiskAlert[]): Promise<RiskAlert[]> => {
  try {
    // In a real implementation, we would batch fetch customer data
    // For this example, we'll use static data
    return await Promise.all(alerts.map(async (alert) => {
      // Simulate customer lookup with static data
      const customerName = `Customer ${alert.id}`;
      return {
        ...alert,
        customerName
      };
    }));
  } catch (error) {
    console.error("Error enriching alerts with customer info:", error);
    return alerts;
  }
};

export const riskAlertService = {
  // Fetch all risk alerts from the API
  getRiskAlerts: async (): Promise<RiskAlert[]> => {
    try {
      // Fetch risk alerts from the API
      const apiAlerts = await api.get<any[]>("/risk");
      
      // Transform API response to our domain model
      const alerts: RiskAlert[] = apiAlerts.map(apiAlert => ({
        id: apiAlert.id,
        created_at: apiAlert.created_at,
        status: apiAlert.status,
        category: apiAlert.category,
        message: apiAlert.message,
        assigned_to: apiAlert.assigned_to,
        severity: apiAlert.severity,
        customerId: apiAlert.id // Using id as customerId since they're related
      }));
      
      // Enrich alerts with customer names
      return await enrichAlertsWithCustomerInfo(alerts);
    } catch (error) {
      console.error("Error fetching risk alerts:", error);
      // Fallback to mock data in case of API failure
      return mockRiskAlerts;
    }
  },

  // Get alerts by status
  getAlertsByStatus: async (status: string): Promise<RiskAlert[]> => {
    try {
      const allAlerts = await riskAlertService.getRiskAlerts();
      return allAlerts.filter(alert => 
        mapStatusToInternal(alert.status) === status
      );
    } catch (error) {
      console.error("Error fetching alerts by status:", error);
      return mockRiskAlerts.filter(alert => alert.status === status);
    }
  },

  // Get alerts by customer ID
  getAlertsByCustomerId: async (customerId: string): Promise<RiskAlert[]> => {
    try {
      const allAlerts = await riskAlertService.getRiskAlerts();
      return allAlerts.filter(alert => alert.id === customerId);
    } catch (error) {
      console.error("Error fetching alerts by customer ID:", error);
      return mockRiskAlerts.filter(alert => alert.customerId === customerId);
    }
  },

  // Get alert details by ID
  getAlertDetails: async (alertId: string): Promise<RiskAlertDetails | null> => {
    try {
      // Simulate fetching detailed information
      // In a real app, you'd make an API call to get details for a specific alert
      const allAlerts = await riskAlertService.getRiskAlerts();
      const alert = allAlerts.find(a => a.id === alertId);
      
      if (!alert) return null;
      
      // Add mock details
      return {
        ...alert,
        relatedTickets: Math.floor(Math.random() * 5),
        lastActivityDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        customerValue: `$${Math.floor(Math.random() * 10000)}`,
        customerSince: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        riskDetails: [
          {
            factor: "Product Usage",
            value: `${Math.floor(Math.random() * 100)}%`,
            impact: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
          },
          {
            factor: "Support Tickets",
            value: `${Math.floor(Math.random() * 10)} open`,
            impact: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
          },
          {
            factor: "Payment History",
            value: Math.random() > 0.3 ? 'Good' : 'Delayed',
            impact: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
          }
        ]
      };
    } catch (error) {
      console.error("Error fetching alert details:", error);
      return null;
    }
  },

  // Update alert status
  updateAlertStatus: async (alertId: string, status: string, assignedTo?: string): Promise<RiskAlert> => {
    try {
      // In a real app, this would make an API call to update the status
      // For now, we'll simulate the update
      console.log(`Updating alert ${alertId} to status ${status} assigned to ${assignedTo || 'nobody'}`);
      
      // Return simulated updated alert
      return {
        id: alertId,
        created_at: new Date().toISOString(),
        status: status as any,
        category: 'Churn Risk',
        message: "Status updated alert",
        assigned_to: assignedTo || null,
        severity: 'High'
      };
    } catch (error) {
      console.error("Error updating alert status:", error);
      throw new Error(`Failed to update alert status: ${(error as Error).message}`);
    }
  }
};

// Mock risk alerts for fallback
const mockRiskAlerts: RiskAlert[] = [
  {
    id: "alert-1",
    customerId: "cust-1",
    customerName: "Acme Corporation",
    created_at: "2023-09-05T10:15:22Z",
    status: "New",
    category: "Churn Risk",
    message: "Customer has shown a 60% decrease in product usage over the last 30 days",
    assigned_to: null,
    severity: "Critical"
  },
  {
    id: "alert-2",
    customerId: "cust-2",
    customerName: "TechStart Inc",
    created_at: "2023-09-06T14:30:15Z",
    status: "Acknowledged",
    category: "Activity Drop",
    message: "Active users dropped from 45 to 20 in the last 2 weeks",
    assigned_to: "Jane Smith",
    severity: "High"
  },
  // More mock data can be added here if needed
];
