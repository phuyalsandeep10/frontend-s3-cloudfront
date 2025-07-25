
import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeDeltaType = 
  | "increase" 
  | "moderateIncrease" 
  | "decrease" 
  | "moderateDecrease" 
  | "unchanged";

interface BadgeDeltaProps {
  type: BadgeDeltaType;
  className?: string;
}

export const BadgeDelta: React.FC<BadgeDeltaProps> = ({ type, className }) => {
  // Configure the badge based on type
  const config = {
    increase: {
      icon: ArrowUpRight,
      text: "text-emerald-700",
      bg: "bg-emerald-100",
    },
    moderateIncrease: {
      icon: TrendingUp,
      text: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    decrease: {
      icon: ArrowDownRight,
      text: "text-red-700",
      bg: "bg-red-100",
    },
    moderateDecrease: {
      icon: TrendingDown,
      text: "text-red-600",
      bg: "bg-red-50",
    },
    unchanged: {
      icon: ArrowRight,
      text: "text-gray-600",
      bg: "bg-gray-100",
    },
  };

  const { icon: Icon, text, bg } = config[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        bg,
        text,
        className
      )}
    >
      <Icon className="h-3 w-3" />
    </span>
  );
};
