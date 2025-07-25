
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiEndpoint } from "@/domain/models/apiDocumentation";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import ApiParamsTable from "./ApiParamsTable";
import ApiErrorsTable from "./ApiErrorsTable";
import ApiCodeBlock from "./ApiCodeBlock";

interface ApiEndpointCardProps {
  endpoint: ApiEndpoint;
  activeLang: string;
  onLangChange: (lang: string) => void;
  onCopyExample: (text: string) => void;
}

const ApiEndpointCard: React.FC<ApiEndpointCardProps> = ({ 
  endpoint, 
  activeLang, 
  onLangChange, 
  onCopyExample 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("examples");

  // Method badge colors
  const methodColors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    POST: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    PATCH: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  };

  const hasParams = endpoint.requestParams && endpoint.requestParams.length > 0;
  const hasRequestBody = !!endpoint.requestBody;
  const hasResponseBody = !!endpoint.responseBody;
  const hasErrors = endpoint.errors && endpoint.errors.length > 0;
  const hasExamples = endpoint.examples && endpoint.examples.length > 0;

  return (
    <Card className="border-l-4" style={{ borderLeftColor: endpoint.method === "GET" ? "#3b82f6" : 
      endpoint.method === "POST" ? "#10b981" : 
      endpoint.method === "PUT" ? "#f59e0b" : 
      endpoint.method === "PATCH" ? "#f97316" : 
      "#ef4444" }}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Badge className={methodColors[endpoint.method]} variant="outline">
                {endpoint.method}
              </Badge>
              <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {endpoint.path}
              </code>
            </div>
            <CardTitle className="text-xl mt-2">{endpoint.title}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="self-start sm:self-center"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-1" />
            )}
            {expanded ? "Hide" : "Expand"}
          </Button>
        </div>
        <CardDescription>{endpoint.description}</CardDescription>
      </CardHeader>

      {expanded && (
        <CardContent>
          <div className="py-1 mb-4">
            <span className="text-sm font-medium">Authentication Required:</span> {endpoint.authentication}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              {hasExamples && (
                <TabsTrigger value="examples">Examples</TabsTrigger>
              )}
              {hasParams && (
                <TabsTrigger value="params">Parameters</TabsTrigger>
              )}
              {hasRequestBody && (
                <TabsTrigger value="request">Request Body</TabsTrigger>
              )}
              {hasResponseBody && (
                <TabsTrigger value="response">Response</TabsTrigger>
              )}
              {hasErrors && (
                <TabsTrigger value="errors">Error Codes</TabsTrigger>
              )}
            </TabsList>

            {hasExamples && (
              <TabsContent value="examples">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Language:</span>
                      <Tabs value={activeLang} onValueChange={onLangChange} className="w-fit">
                        <TabsList className="h-8">
                          <TabsTrigger value="curl" className="text-xs px-2 py-1">curl</TabsTrigger>
                          <TabsTrigger value="javascript" className="text-xs px-2 py-1">JavaScript</TabsTrigger>
                          <TabsTrigger value="python" className="text-xs px-2 py-1">Python</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const example = endpoint.examples[0];
                        const code = activeLang === "curl" ? example.request.curl : 
                          activeLang === "javascript" ? example.request.javascript : 
                          example.request.python;
                        
                        if (code) {
                          onCopyExample(code);
                        }
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                  </div>
                  
                  <div className="mt-2">
                    {endpoint.examples.map((example, index) => {
                      const code = activeLang === "curl" ? example.request.curl : 
                        activeLang === "javascript" ? example.request.javascript : 
                        example.request.python;
                      
                      return (
                        <div key={index} className="mb-4">
                          <h4 className="text-sm font-medium mb-2">{example.title}</h4>
                          <ApiCodeBlock language={activeLang} code={code || ""} />
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Response</h4>
                    {endpoint.examples[0] && (
                      <ApiCodeBlock language="json" code={endpoint.examples[0].response} />
                    )}
                  </div>
                </div>
              </TabsContent>
            )}

            {hasParams && (
              <TabsContent value="params">
                <ApiParamsTable params={endpoint.requestParams || []} />
              </TabsContent>
            )}

            {hasRequestBody && (
              <TabsContent value="request">
                <div className="space-y-4">
                  {endpoint.requestBody && (
                    <>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Request Body Structure</h4>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                          <p className="text-sm mb-2"><strong>Type:</strong> {endpoint.requestBody.type}</p>
                          <div className="mb-2">
                            <strong className="text-sm">Properties:</strong>
                            <ul className="mt-1 space-y-2">
                              {Object.entries(endpoint.requestBody.properties).map(([key, value]) => (
                                <li key={key} className="pl-4 text-sm">
                                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">{key}</code>: {value.type}
                                  {value.required && <Badge className="ml-2 text-xs" variant="outline">Required</Badge>}
                                  <div className="text-xs text-muted-foreground">{value.description}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Example Request Body</h4>
                        <ApiCodeBlock language="json" code={endpoint.requestBody.example} />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            )}

            {hasResponseBody && (
              <TabsContent value="response">
                <div className="space-y-4">
                  {endpoint.responseBody && (
                    <>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Response Structure</h4>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                          <p className="text-sm mb-2"><strong>Type:</strong> {endpoint.responseBody.type}</p>
                          <div className="mb-2">
                            <strong className="text-sm">Properties:</strong>
                            <ul className="mt-1 space-y-2">
                              {Object.entries(endpoint.responseBody.properties).map(([key, value]) => (
                                <li key={key} className="pl-4 text-sm">
                                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">{key}</code>: {value.type}
                                  {value.required && <Badge className="ml-2 text-xs" variant="outline">Required</Badge>}
                                  <div className="text-xs text-muted-foreground">{value.description}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Example Response</h4>
                        <ApiCodeBlock language="json" code={endpoint.responseBody.example} />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            )}

            {hasErrors && (
              <TabsContent value="errors">
                <ApiErrorsTable errors={endpoint.errors} />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default ApiEndpointCard;
