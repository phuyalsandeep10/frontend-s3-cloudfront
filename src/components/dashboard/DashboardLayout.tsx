
import React, { useEffect, useState } from "react";
import { getSubdomain } from "@/utils/subdomain";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // In a real app, you would fetch company data based on the subdomain or user session
    const subdomain = getSubdomain();
    
    // Simulate API call
    setTimeout(() => {
      setCompanyName(subdomain || "Demo Company");
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-40px)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-purple-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-purple-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-purple-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-[calc(100vh-40px)]">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, <span className="text-purple-600">{companyName}</span>
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your customer churn metrics.
        </p>
      </div>
      
      <div className="animate-fade-in" style={{animationDelay: "0.3s"}}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
