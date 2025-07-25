
import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Get status color and icon
  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'High Risk':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1 text-red-600" />
        };
      case 'Medium Risk':
        return {
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-600" />
        };
      case 'Low Risk':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-600" />
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          icon: null
        };
    }
  };

  const { bgColor, textColor, borderColor, icon } = getStatusStyles(status);

  return (
    <span className={`px-2.5 py-1.5 rounded-full text-xs font-medium border ${bgColor} ${textColor} ${borderColor} inline-flex items-center`}>
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;
