
import { CustomerRisk } from "@/hooks/useDashboardData";
import { CustomerRiskData } from "@/domain/models/customerRisk";
import { useMemo } from "react";

export function useCustomerRiskData(atRiskCustomers: CustomerRisk[] = []) {
  // Transform customer data into the required format with better risk calculations
  const transformCustomerData = useMemo((): CustomerRiskData[] => {
    return atRiskCustomers.map(customer => {
      // Determine status based on risk level
      let status: 'High Risk' | 'Medium Risk' | 'Low Risk';
      
      if (customer.riskLevel === 'high') {
        status = 'High Risk';
      } else if (customer.riskLevel === 'medium') {
        status = 'Medium Risk';
      } else {
        status = 'Low Risk';
      }

      // Generate randomized but consistent value based on customer ID
      const customerId = parseInt(customer.id) || Math.floor(Math.random() * 1000);
      const idBasedValue = (customerId * 127) % 10000;
      const formattedValue = `$${idBasedValue.toLocaleString()}`;

      return {
        id: customerId,
        name: customer.name,
        email: customer.email,
        company: customer.company,
        industry: customer.company || 'Technology',
        value: formattedValue,
        riskScore: customer.riskScore,
        riskLevel: customer.riskLevel,
        lastActivity: customer.lastActivity,
        status: status,
        customFields: {
          revenueYTD: `$${Math.floor((customerId * 157) % 50000).toLocaleString()}`,
          contractEndDate: getRandomFutureDate(customerId),
          supportTickets: Math.floor((customerId * 13) % 10)
        }
      };
    });
  }, [atRiskCustomers]);

  return transformCustomerData;
}

// Helper function to generate a consistent future date based on customer ID
function getRandomFutureDate(seed: number): string {
  const today = new Date();
  const months = (seed * 17) % 12 + 1; // 1-12 months in the future
  const futureDate = new Date(today);
  futureDate.setMonth(today.getMonth() + months);
  
  return futureDate.toISOString().split('T')[0];
}
