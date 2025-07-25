
import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/api";
import { useSubscription } from "@/hooks/useSubscription";
import {
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const SidebarUserProfile: React.FC = () => {
  const { subscription } = useSubscription();
  
  // Handle logout click
  const handleLogout = async () => {
    await logout();
    // The logout function already handles the redirect
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <div className="flex flex-col gap-3 px-3 py-3">
          <Link to="/profile" className="flex items-center gap-3 rounded-md hover:bg-purple-50 transition-colors py-2 px-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <User size={16} className="text-purple-700" />
            </div>
            <div>
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">View Profile</div>
            </div>
          </Link>
          
          {subscription && (
            <>
              <Separator className="my-1" />
              <Link to="/subscription" className="flex items-center justify-between rounded-md hover:bg-purple-50 transition-colors py-2 px-2">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-purple-700" />
                  <span className="text-sm">Subscription</span>
                </div>
                {subscription.subscribed ? (
                  <Badge variant="outline" className="text-xs capitalize bg-primary/10">
                    {subscription.subscription_tier}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800">
                    Inactive
                  </Badge>
                )}
              </Link>
            </>
          )}
          
          <Button 
            variant="ghost" 
            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 mt-2"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
