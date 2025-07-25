
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiCategory } from "@/domain/models/apiDocumentation";
import { Database, ShoppingCart, CreditCard, TrendingUp, Users } from "lucide-react";

interface ApiSidebarProps {
  categories: ApiCategory[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const ApiSidebar: React.FC<ApiSidebarProps> = ({ categories, activeCategory, onSelectCategory }) => {
  // Map of category IDs to icons
  const categoryIcons: Record<string, React.ReactNode> = {
    customers: <Users className="h-5 w-5" />,
    orders: <ShoppingCart className="h-5 w-5" />,
    payments: <CreditCard className="h-5 w-5" />,
    predictions: <TrendingUp className="h-5 w-5" />,
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">API Reference</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-1">
            <Button
              variant={activeCategory === "customers" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectCategory("customers")}
            >
              <Database className="mr-2 h-5 w-5" />
              Overview
            </Button>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground pl-2">Endpoints</h3>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onSelectCategory(category.id)}
                >
                  {categoryIcons[category.id] || <Database className="h-5 w-5" />}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ApiSidebar;
