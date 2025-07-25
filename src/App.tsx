import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Interactions from "./pages/Interactions";
import Support from "./pages/Support";
import Predictions from "./pages/Predictions";
import RiskAlerts from "./pages/RiskAlerts";
import Reports from "./pages/Reports";
import HelpAndSupport from "./pages/HelpAndSupport";
import ApiDocumentation from "./pages/ApiDocumentation";
import NotFound from "./pages/NotFound";
import * as React from "react";
import { isOnDashboardSubdomain } from "@/utils/subdomain";
import Settings from "./pages/Settings";
import CustomFields from "./pages/CustomFields";
import PredictionMapping from "./pages/PredictionMapping";
import AppLayout from "./components/dashboard/AppLayout";
import Profile from "./pages/Profile";
import GeneralSettings from "./pages/GeneralSettings";
import ApiKeysSettings from "./pages/ApiKeysSettings";
import { ThemeProvider } from "./context/ThemeContext";
import Subscription from "./pages/Subscription";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  React.useEffect(() => {
    if (!isOnDashboardSubdomain()) {
      window.location.href = "https://mausamcrm.site";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              } />
              <Route path="/customers" element={
                <AppLayout>
                  <Customers />
                </AppLayout>
              } />
              <Route path="/orders" element={
                <AppLayout>
                  <Orders />
                </AppLayout>
              } />
              <Route path="/payments" element={
                <AppLayout>
                  <Payments />
                </AppLayout>
              } />
              <Route path="/interactions" element={
                <AppLayout>
                  <Interactions />
                </AppLayout>
              } />
              <Route path="/support" element={
                <AppLayout>
                  <Support />
                </AppLayout>
              } />
              <Route path="/predictions" element={
                <AppLayout>
                  <Predictions />
                </AppLayout>
              } />
              <Route path="/risk-alerts" element={
                <AppLayout>
                  <RiskAlerts />
                </AppLayout>
              } />
              <Route path="/reports" element={
                <AppLayout>
                  <Reports />
                </AppLayout>
              } />
              <Route path="/help-support" element={
                <AppLayout>
                  <HelpAndSupport />
                </AppLayout>
              } />
              <Route path="/api-documentation" element={
                <AppLayout>
                  <ApiDocumentation />
                </AppLayout>
              } />
              <Route path="/settings" element={
                <AppLayout>
                  <Settings />
                </AppLayout>
              } />
              <Route path="/settings/general" element={
                <AppLayout>
                  <GeneralSettings />
                </AppLayout>
              } />
              <Route path="/settings/custom-fields" element={
                <AppLayout>
                  <CustomFields />
                </AppLayout>
              } />
              <Route path="/settings/prediction-mapping" element={
                <AppLayout>
                  <PredictionMapping />
                </AppLayout>
              } />
              <Route path="/settings/api-keys" element={
                <AppLayout>
                  <ApiKeysSettings />
                </AppLayout>
              } />
              <Route path="/profile" element={
                <AppLayout>
                  <Profile />
                </AppLayout>
              } />
              <Route path="/subscription" element={
                <AppLayout>
                  <Subscription />
                </AppLayout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
