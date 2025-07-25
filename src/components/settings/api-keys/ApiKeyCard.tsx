
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ApiKey } from "@/domain/models/apiKey";
import { Key, Trash, Eye } from "lucide-react";

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onRevoke: (id: string) => void;
  isRevoking: boolean;
  onView: (id: string) => void;
}

const ApiKeyCard: React.FC<ApiKeyCardProps> = ({ apiKey, onRevoke, isRevoking, onView }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleRevoke = () => {
    onRevoke(apiKey.id);
    setShowConfirmDialog(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Use active if present, fallback to isActive for older entries
  const isActiveKey = apiKey.active !== undefined ? apiKey.active : apiKey.isActive;

  return (
    <>
      <Card className="mb-4">
        <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Key className="h-4 w-4 text-purple-500" />
              <span className="font-mono text-sm">•••••••{apiKey.prefix}</span>
              {!isActiveKey && (
                <Badge variant="outline" className="text-gray-500 bg-gray-100 dark:bg-gray-800">Revoked</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {apiKey.description || "No description"}
            </p>
            <div className="flex flex-col xs:flex-row gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
              <span>Created: {formatDate(apiKey.createdAt)}</span>
              <span>Last used: {formatDate(apiKey.lastUsedAt)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {isActiveKey && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(apiKey.id)}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  aria-label="View Hashed Key"
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfirmDialog(true)}
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
                >
                  <Trash className="h-3.5 w-3.5 mr-1" />
                  Revoke
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this API key? This action cannot be undone and any services using this key will immediately lose access.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleRevoke}
              disabled={isRevoking}
            >
              {isRevoking ? "Revoking..." : "Yes, Revoke Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeyCard;
