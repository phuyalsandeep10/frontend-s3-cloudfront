
import React from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface RiskAlertsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RiskAlertsPagination: React.FC<RiskAlertsPaginationProps> = ({ 
  currentPage, 
  totalPages,
  onPageChange
}) => {
  const getPageNumbers = () => {
    // Logic to display pagination numbers: always show current page and surrounding pages
    const pages: number[] = [];
    
    if (totalPages <= 5) {
      // If we have 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // If we're at the beginning
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // If we're at the end
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // We're in the middle
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(Math.max(currentPage - 1, 1))} />
          </PaginationItem>
        )}
        
        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              isActive={currentPage === pageNum}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default RiskAlertsPagination;
