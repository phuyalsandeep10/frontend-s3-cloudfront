
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerRiskData } from '@/domain/models/customerRisk';
import SearchAndFilterBar from './SearchAndFilterBar';
import CustomerRiskRow from './CustomerRiskRow';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";

interface CustomerListProps {
  customers: CustomerRiskData[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState<keyof CustomerRiskData>('riskScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter customers based on search term and status
  const filteredCustomers = React.useMemo(() => {
    if (!customers?.length) return [];
    
    return customers.filter(customer => {
      // Status filter
      const statusMatch = filterStatus === 'All' || customer.status === filterStatus;
      
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = customer.name?.toLowerCase().includes(searchLower) || false;
      const emailMatch = customer.email?.toLowerCase().includes(searchLower) || false;
      const industryMatch = customer.industry?.toLowerCase().includes(searchLower) || false;
      
      return statusMatch && (nameMatch || emailMatch || industryMatch || !searchTerm);
    });
  }, [customers, searchTerm, filterStatus]);

  // Sort customers based on sort field and direction
  const sortedCustomers = React.useMemo(() => {
    if (!filteredCustomers?.length) return [];

    return [...filteredCustomers].sort((a, b) => {
      // Special handling for riskScore - higher is worse
      if (sortField === 'riskScore') {
        return sortDirection === 'desc' 
          ? (b[sortField] || 0) - (a[sortField] || 0)
          : (a[sortField] || 0) - (b[sortField] || 0);
      }
      
      // Generic string sorting
      const aValue = String(a[sortField] || '');
      const bValue = String(b[sortField] || '');
      
      return sortDirection === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    });
  }, [filteredCustomers, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field: keyof CustomerRiskData) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set default direction
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Column definitions
  const columns = [
    { field: 'name', label: 'Customer Name' },
    { field: 'email', label: 'Email' },
    { field: 'industry', label: 'Industry' },
    { field: 'value', label: 'Value' },
    { field: 'riskScore', label: 'Risk Score' },
    { field: 'status', label: 'Status' },
  ];

  // Get sort icon
  const getSortIcon = (field: keyof CustomerRiskData) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4" />
      : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">At-Risk Customers</CardTitle>
        <SearchAndFilterBar
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSearch={(e) => setSearchTerm(e.target.value)}
          onFilterChange={setFilterStatus}
        />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th 
                    key={column.field} 
                    className="py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  >
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 font-medium"
                      onClick={() => handleSort(column.field as keyof CustomerRiskData)}
                    >
                      {column.label}
                      {getSortIcon(column.field as keyof CustomerRiskData)}
                    </Button>
                  </th>
                ))}
                <th className="py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="py-4 text-center text-muted-foreground">
                    No customers found matching your criteria
                  </td>
                </tr>
              ) : (
                sortedCustomers.map((customer) => (
                  <CustomerRiskRow 
                    key={customer.id} 
                    customer={customer}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerList;
