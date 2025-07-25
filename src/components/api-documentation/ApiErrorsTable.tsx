
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApiError } from "@/domain/models/apiDocumentation";

interface ApiErrorsTableProps {
  errors: ApiError[];
}

const ApiErrorsTable: React.FC<ApiErrorsTableProps> = ({ errors }) => {
  if (errors.length === 0) {
    return <p className="text-muted-foreground text-sm">No error codes documented for this endpoint.</p>;
  }

  // Status code to color mapping
  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/4">Code</TableHead>
            <TableHead className="w-1/4">Message</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {errors.map((error) => (
            <TableRow key={`${error.status}-${error.code}`}>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(error.status)}>
                  {error.status}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{error.code}</TableCell>
              <TableCell>{error.message}</TableCell>
              <TableCell className="text-sm">{error.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApiErrorsTable;
