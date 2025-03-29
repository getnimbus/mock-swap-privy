import * as React from "react";
import { cn } from "@/lib/utils";

export type RiskLevel = "Low" | "Medium" | "High";

interface RiskLevelIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  level: RiskLevel;
  showInfo?: boolean;
  size?: "sm" | "default" | "lg";
}

const riskLevelColors: Record<RiskLevel, string> = {
  // Inverted colors: Low risk = green (1 bar), Medium = yellow (2 bars), High = red (3 bars)
  High: "bg-red-400",
  Medium: "bg-yellow-400",
  Low: "bg-green-400",
};

const riskLevelSizes = {
  sm: "h-3 gap-0.5",
  default: "h-4 gap-1",
  lg: "h-5 gap-1.5",
};

const barWidths = {
  sm: "w-1",
  default: "w-1.5",
  lg: "w-2",
};

export function RiskLevelIndicator({
  level,
  showInfo = true,
  size = "default",
  className,
  ...props
}: RiskLevelIndicatorProps) {
  // Get the color based on the current risk level
  const activeColor = riskLevelColors[level];
  // Number of active bars matches the risk level: Low = 1, Medium = 2, High = 3
  const numActiveBars = level === "Low" ? 1 : level === "Medium" ? 2 : 3;

  return (
    <div className="flex items-center gap-1.5" {...props}>
      <div className={cn("flex items-end", riskLevelSizes[size], className)}>
        {/* First Bar */}
        <div
          className={cn(
            barWidths[size],
            "h-1/3 rounded-sm transition-colors",
            numActiveBars >= 1 ? activeColor : "bg-zinc-700",
          )}
        />
        {/* Second Bar */}
        <div
          className={cn(
            barWidths[size],
            "h-2/3 rounded-sm transition-colors",
            numActiveBars >= 2 ? activeColor : "bg-zinc-700",
          )}
        />
        {/* Third Bar */}
        <div
          className={cn(
            barWidths[size],
            "h-full rounded-sm transition-colors",
            numActiveBars >= 3 ? activeColor : "bg-zinc-700",
          )}
        />
      </div>
    </div>
  );
}
