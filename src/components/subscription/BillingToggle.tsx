
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface BillingToggleProps {
  isAnnual: boolean;
  onToggle: (checked: boolean) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ isAnnual, onToggle }) => {
  return (
    <div className="flex items-center gap-3 mt-4 md:mt-0">
      <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>Monthly</span>
      <Switch
        checked={isAnnual}
        onCheckedChange={onToggle}
      />
      <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
        Annual <span className="text-green-600 font-medium">(Save 20%)</span>
      </span>
    </div>
  );
};
