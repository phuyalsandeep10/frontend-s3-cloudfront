
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Check } from "lucide-react";

import { ApiKey } from "@/domain/models/apiKey";
import { toast } from "sonner";

interface ViewApiKeyModalProps {
  apiKey: ApiKey | null;
  onClose: () => void;
}

const ViewApiKeyModal: React.FC<ViewApiKeyModalProps> = ({ apiKey, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!apiKey) return null;

  const handleCopy = () => {
    if (apiKey.hashedKey) {
      navigator.clipboard.writeText(apiKey.hashedKey);
      setCopied(true);
      toast.success("Hashed key copied to clipboard");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <Dialog open={!!apiKey} onOpenChange={onClose}>
      <DialogContent
        className="max-w-xl w-full p-0 sm:p-0 overflow-visible"
        style={{ maxWidth: "95vw" }}
      >
        <div className="p-6 max-h-[95vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Visualize API Key (Hashed)</DialogTitle>
            <DialogDescription>
              This is the hashed value of your API key.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 w-full">
              <div className="flex-1 relative">
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 flex items-center overflow-x-auto max-w-full">
                  <Input
                    id="hashedKey"
                    value={apiKey.hashedKey || ""}
                    readOnly
                    spellCheck={false}
                    autoCorrect="off"
                    tabIndex={0}
                    aria-label="API key (hashed)"
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
                aria-label="Copy Hashed API key"
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

export default ViewApiKeyModal;
