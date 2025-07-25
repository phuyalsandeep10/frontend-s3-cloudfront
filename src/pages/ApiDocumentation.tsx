
import React, { useState, useEffect } from "react";
import { useApiDocumentation } from "@/hooks/useApiDocumentation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink, Info, Key, Lock } from "lucide-react";
import ApiEndpointCard from "@/components/api-documentation/ApiEndpointCard";
import ApiSidebar from "@/components/api-documentation/ApiSidebar";
import ApiCodeBlock from "@/components/api-documentation/ApiCodeBlock";
import { useToast } from "@/components/ui/use-toast";
import Markdown from "react-markdown";

const ApiDocumentation: React.FC = () => {
  const { apiDocs, isLoading, error } = useApiDocumentation();
  const [activeCategory, setActiveCategory] = useState<string>("customers");
  const [activeLang, setActiveLang] = useState<string>("curl");
  const { toast } = useToast();

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code example has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">API Documentation</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1 h-[600px]">
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-3 h-[600px]">
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !apiDocs) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">API Documentation</h1>
        </div>
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30">
          <AlertDescription>
            Failed to load API documentation. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const activeApiCategory = apiDocs.categories.find(category => category.id === activeCategory);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">API Documentation</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* API Sidebar */}
        <div className="md:col-span-1">
          <ApiSidebar 
            categories={apiDocs.categories} 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>
        
        {/* API Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Introduction Card */}
          {activeCategory === "customers" && (
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent">
                <CardTitle className="text-2xl">NestCRM API</CardTitle>
                <CardDescription>
                  Access and manage your CRM data programmatically
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <Markdown>{apiDocs.introduction}</Markdown>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-purple-50/50 dark:bg-purple-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lock className="h-4 w-4 text-purple-500" />
                        Authentication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      API requests require authentication using a Bearer token.
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50/50 dark:bg-blue-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Key className="h-4 w-4 text-blue-500" />
                        API Keys
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Available for enterprise and premium plans. Get yours from account settings.
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Info className="h-4 w-4 text-green-500" />
                        Base URL
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <code className="text-xs bg-black/5 dark:bg-white/5 p-1 rounded">
                        {apiDocs.baseUrl}
                      </code>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator className="my-6" />
                
                <div className="prose dark:prose-invert max-w-none">
                  <Markdown>{apiDocs.authentication}</Markdown>
                  <Markdown>{apiDocs.rateLimit}</Markdown>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Category Description & Endpoints */}
          {activeApiCategory && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{activeApiCategory.name} API</CardTitle>
                <CardDescription>{activeApiCategory.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {activeApiCategory.endpoints.map((endpoint) => (
                    <ApiEndpointCard 
                      key={endpoint.id} 
                      endpoint={endpoint} 
                      activeLang={activeLang} 
                      onLangChange={setActiveLang} 
                      onCopyExample={copyText}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
