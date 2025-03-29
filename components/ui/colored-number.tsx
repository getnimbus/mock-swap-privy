"use client";

import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ColoredNumberProps {
  value: number;
  formatOptions?: {
    prefix?: string;
    postfix?: string;
    lessThanOneNumberFormat?: string;
  };
  className?: string;
  useFormat?: boolean;
  isWinRate?: boolean;
}

export function ColoredNumber({
  value,
  formatOptions,
  className,
  useFormat = true,
  isWinRate = false,
}: ColoredNumberProps) {
  const getColorClass = () => {
    if (value === 0) return "";
    if (isWinRate) {
      if (value < 50) return "text-yellow-400";
      return value < 0 ? "text-red-400" : "text-green-400";
    }
    return value < 0 ? "text-red-400" : "text-green-400";
  };

  return (
    <span className={cn(getColorClass(), className)}>
      {useFormat ? formatNumber(value, formatOptions) : Number(value)}
    </span>
  );
}
