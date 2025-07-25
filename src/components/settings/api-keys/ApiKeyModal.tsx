
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, AlertTriangle, Check } from "lucide-react";
import { ApiKeyResponse } from "@/domain/models/apiKey";
import { toast } from "sonner";

interface ApiKeyModalProps {
  apiKey: ApiKeyResponse | null;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ apiKey, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.rawKey);
      setCopied(true);
      toast.success("API key copied to clipboard");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!apiKey) return null;

  return (
    <Dialog open={!!apiKey} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-xl w-full p-0 sm:p-0 overflow-visible"
        style={{ maxWidth: "95vw" }}
      >
        <div className="p-6 max-h-[95vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>API Key Generated</DialogTitle>
            <DialogDescription>
              Your new API key has been generated. Please copy it now as you won't be able to see it again.
            </DialogDescription>
          </DialogHeader>

          <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 my-4">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">Important</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              This is the only time you'll see this key. It cannot be recovered if lost.
            </AlertDescription>
          </Alert>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 w-full">
              <div className="flex-1 relative">
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 flex items-center overflow-x-auto max-w-full">
                  <Input
                    id="apiKey"
                    value={apiKey.rawKey}
                    readOnly
                    spellCheck={false}
                    autoCorrect="off"
                    tabIndex={0}
                    aria-label="API key"
                    onFocus={e => e.target.select()}
                    className="font-mono text-xs sm:text-sm bg-transparent border-0 outline-none p-0 w-full tracking-tight select-all break-all"
                    style={{
                      wordBreak: "break-all",
                      whiteSpace: "pre-wrap",
                      background: "none",
                      boxShadow: "none",
                    }}
                  />
                </div>
              </div>
              <Button
                type="button"
                size="icon"
                onClick={handleCopy}
                className={
                  `shrink-0 h-10 w-10 ${copied
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-purple-600 hover:bg-purple-700"
                    }`
                }
                tabIndex={0}
                aria-label="Copy API key"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground break-all">
            <div>
              <span className="font-semibold">API key ID: </span>
              <span className="font-mono">{apiKey.id}</span>
            </div>
            <div>
              <span className="font-semibold">Created: </span>
              {new Date(apiKey.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <p className="font-medium mb-2 text-sm">Example usage:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto text-xs border border-gray-200 dark:border-gray-700">
              <code>{`curl -X GET https://{tenant}.mausamcrm.site/api/customers \\
  -H "Authorization: Bearer ${apiKey.rawKey}"`}</code>
            </pre>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
