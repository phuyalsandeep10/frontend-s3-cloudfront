
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApiParam } from "@/domain/models/apiDocumentation";

interface ApiParamsTableProps {
  params: ApiParam[];
}

const ApiParamsTable: React.FC<ApiParamsTableProps> = ({ params }) => {
  if (params.length === 0) {
    return <p className="text-muted-foreground text-sm">No parameters for this endpoint.</p>;
  }

  return (
    <div className="rounded-md border mb-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Name</TableHead>
            <TableHead className="w-1/6">Type</TableHead>
            <TableHead className="w-1/6">Required</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {params.map((param) => (
            <TableRow key={param.name}>
              <TableCell className="font-mono text-sm">{param.name}</TableCell>
              <TableCell>{param.type}</TableCell>
              <TableCell>
                {param.required ? (
                  <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/30">
                    Required
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
                    Optional
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-sm">{param.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApiParamsTable;
