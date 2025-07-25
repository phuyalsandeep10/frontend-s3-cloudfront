
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SettingsHeader from "@/components/settings/SettingsHeader";
import ApiKeyForm from "@/components/settings/api-keys/ApiKeyForm";
import ApiKeyList from "@/components/settings/api-keys/ApiKeyList";
import ApiKeyModal from "@/components/settings/api-keys/ApiKeyModal";
import ViewApiKeyModal from "@/components/settings/api-keys/ViewApiKeyModal";
import { useApiKeys } from "@/hooks/useApiKeys";

const ApiKeysSettings = () => {
  const {
    apiKeys,
    newApiKey,
    isLoading,
    isGenerating,
    isRevoking,
    generateApiKey,
    revokeApiKey,
    clearNewApiKey,
    visualizedKey,
    viewKeyById,
    clearVisualizedKey,
  } = useApiKeys();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card className="overflow-hidden border-0 shadow-sm">
        <CardHeader className="border-b bg-card px-6 py-4">
          <SettingsHeader title="API Keys" description="Manage API keys for external integrations" />
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate API Key</TabsTrigger>
              <TabsTrigger value="manage">Manage Keys</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
                <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-800 dark:text-blue-300">Security Note</AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400">
                  API keys grant full access to your account's data. Store them securely and never expose them in client-side code. You'll only be shown the API key once when it's generated.
                </AlertDescription>
              </Alert>

              <ApiKeyForm onSubmit={generateApiKey} isGenerating={isGenerating} />

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Using API Keys</h3>
                <div className="prose dark:prose-invert max-w-none text-sm">
                  <p>To authenticate API requests, include your API key in the Authorization header:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                  <p>Example curl request:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto text-xs">
                    <code>{`curl -X GET https://{tenant}.mausamcrm.site/api/customers \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                  </pre>
                  <p>See the API Documentation for more details on available endpoints and request formats.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="mb-4">
                      <CardContent className="p-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-48" />
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4 w-96" />
                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-64" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <ApiKeyList
                  apiKeys={apiKeys}
                  onRevoke={revokeApiKey}
                  isRevoking={isRevoking}
                  onView={viewKeyById}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ApiKeyModal apiKey={newApiKey} onClose={clearNewApiKey} />
      <ViewApiKeyModal apiKey={visualizedKey} onClose={clearVisualizedKey} />
    </div>
  );
};

export default ApiKeysSettings;
