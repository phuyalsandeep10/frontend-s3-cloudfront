
import React from 'react';
import { Button } from '@/components/ui/button';
import { CustomerRiskData } from '@/domain/models/customerRisk';
import { ExternalLink, AlertTriangle, AlertCircle, Info, Mail, Briefcase, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import RiskScoreBar from '@/components/dashboard/RiskScoreBar';

interface CustomerRiskRowProps {
  customer: CustomerRiskData;
}

const CustomerRiskRow: React.FC<CustomerRiskRowProps> = ({ customer }) => {
  // Format risk score with indicator color
  const getRiskScoreBadge = (score: number) => {
    let badgeClass = '';
    let Icon = Info;
    
    if (score >= 75) {
      badgeClass = 'bg-red-100 text-red-800 hover:bg-red-200';
      Icon = AlertTriangle;
    } else if (score >= 50) {
      badgeClass = 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      Icon = AlertCircle;
    } else if (score >= 25) {
      badgeClass = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      Icon = Info;
    } else {
      badgeClass = 'bg-green-100 text-green-800 hover:bg-green-200';
      Icon = Info;
    }
    
    return (
      <div className="flex flex-col gap-1">
        <RiskScoreBar score={score} />
        <Badge variant="outline" className={`${badgeClass} px-2 py-1 font-medium`}>
          <Icon className="h-3 w-3 mr-1" />
          {score}
        </Badge>
      </div>
    );
  };
  
  // Format status with indicator color
  const getStatusBadge = (status: string) => {
    let badgeClass = '';
    
    if (status === 'High Risk') {
      badgeClass = 'bg-red-100 text-red-800 hover:bg-red-200';
    } else if (status === 'Medium Risk') {
      badgeClass = 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    } else if (status === 'Low Risk') {
      badgeClass = 'bg-green-100 text-green-800 hover:bg-green-200';
    } else {
      badgeClass = 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
    
    return (
      <Badge variant="outline" className={`${badgeClass} px-2 py-1 font-medium`}>
        {status}
      </Badge>
    );
  };

  return (
    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-4 text-sm font-medium">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-2">
            {customer.name.charAt(0)}
          </div>
          {customer.name}
        </div>
      </td>
      <td className="py-4 text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Mail className="h-3.5 w-3.5" />
          {customer.email}
        </div>
      </td>
      <td className="py-4 text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Briefcase className="h-3.5 w-3.5" />
          {customer.industry}
        </div>
      </td>
      <td className="py-4 text-sm">
        <div className="flex items-center gap-1 font-medium">
          <DollarSign className="h-3.5 w-3.5 text-green-600" />
          {customer.value}
        </div>
      </td>
      <td className="py-4 text-sm">{getRiskScoreBadge(customer.riskScore)}</td>
      <td className="py-4 text-sm">{getStatusBadge(customer.status)}</td>
      <td className="py-4 text-sm text-right">
        <Button variant="outline" size="sm" className="text-xs transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
          <ExternalLink className="h-3 w-3 mr-1" />
          View Details
        </Button>
      </td>
    </tr>
  );
};

export default CustomerRiskRow;
