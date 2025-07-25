
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAndFilterBarProps {
  searchTerm: string;
  filterStatus: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (value: string) => void;
}

const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchTerm,
  filterStatus,
  onSearch,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search customers..."
          className="pl-10 bg-background"
          value={searchTerm}
          onChange={onSearch}
        />
      </div>
      
      <div className="w-full sm:w-48">
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="High Risk">High Risk</SelectItem>
            <SelectItem value="Medium Risk">Medium Risk</SelectItem>
            <SelectItem value="Low Risk">Low Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
