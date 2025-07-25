
import React from "react";
import { ApiKey } from "@/domain/models/apiKey";
import ApiKeyCard from "./ApiKeyCard";
import NoApiKeys from "./NoApiKeys";

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  onRevoke: (id: string) => void;
  isRevoking: boolean;
  onView: (id: string) => void;
}

const ApiKeyList: React.FC<ApiKeyListProps> = ({ apiKeys, onRevoke, isRevoking, onView }) => {
  if (!apiKeys.length) {
    return <NoApiKeys />;
  }

  // Sort by creation date, newest first
  const sortedApiKeys = [...apiKeys].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedApiKeys.map(apiKey => (
        <ApiKeyCard
          key={apiKey.id}
          apiKey={apiKey}
          onRevoke={onRevoke}
          isRevoking={isRevoking}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default ApiKeyList;
