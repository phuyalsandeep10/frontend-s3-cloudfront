
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { KnowledgeBaseArticle } from "@/domain/models/helpAndSupport";
import { formatDistanceToNow } from "date-fns";

interface KnowledgeBaseDialogProps {
  article: KnowledgeBaseArticle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KnowledgeBaseDialog: React.FC<KnowledgeBaseDialogProps> = ({ article, open, onOpenChange }) => {
  if (!article) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{article.title}</DialogTitle>
          <Badge variant="outline" className="mt-1">{article.category}</Badge>
        </DialogHeader>
        <div className="my-3 space-x-1">
          {article.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <div className="text-muted-foreground mb-3 text-xs">
          Updated {formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}
        </div>
        <div className="prose dark:prose-invert max-w-none text-base" style={{whiteSpace: "pre-line"}}>
          {article.content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeBaseDialog;
