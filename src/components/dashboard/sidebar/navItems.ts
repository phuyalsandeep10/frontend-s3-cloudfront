
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Settings,
  HelpCircle,
  FileText,
  ShoppingCart,
  CreditCard,
  LifeBuoy,
  Code,
  Package
} from "lucide-react";
import { NavItem } from "./SidebarNavGroup";

// Main navigation items
export const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Customers", icon: Users, path: "/customers" },
  { title: "Orders", icon: ShoppingCart, path: "/orders" },
  { title: "Payments", icon: CreditCard, path: "/payments" },
  { title: "Interactions", icon: MessageSquare, path: "/interactions" },
  { title: "Support", icon: LifeBuoy, path: "/support" },
  { title: "Predictions", icon: TrendingUp, path: "/predictions" },
  { title: "Risk Alerts", icon: AlertTriangle, path: "/risk-alerts" },
];

// Secondary navigation items
export const secondaryNavItems: NavItem[] = [
  { title: "Reports", icon: FileText, path: "/reports" },
  { title: "Help & Support", icon: HelpCircle, path: "/help-support" },
  { title: "API Documentation", icon: Code, path: "/api-documentation" },
  { title: "Subscription", icon: Package, path: "/subscription" },
  { title: "Settings", icon: Settings, path: "/settings" },
];
