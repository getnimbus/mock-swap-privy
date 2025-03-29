"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

interface StatisticProps {
  value?: number | string;
  suffix?: string;
  prefix?: React.ReactNode | string;
  style?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  precision?: number;
  className?: string;
}

export function Statistic({
  value,
  suffix,
  prefix,
  style,
  valueStyle,
  precision = 2,
  className,
}: StatisticProps) {
  const getColorByValue = (value: number | undefined) => {
    if (value === undefined || Number(value) === 0) return "text-foreground";
    if (Number(value) > 0) return "text-green-400";
    return "text-red-400";
  };

  const defaultValueStyle = {
    fontSize: "14px",
  };

  const combinedValueStyle = {
    ...defaultValueStyle,
    ...valueStyle,
  };

  if (!value || value === 0) {
    return (
      <div
        style={style}
        className={cn(
          "flex items-center",
          suffix === "%" ? "" : "gap-1",
          className,
        )}
      >
        <span style={combinedValueStyle} className="text-foreground">
          0
        </span>
        {suffix && (
          <span
            style={combinedValueStyle}
            className={getColorByValue(Number(value))}
          >
            {suffix}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={style}
      className={cn(
        "flex items-center",
        suffix === "%" ? "" : "gap-1",
        className,
      )}
    >
      {prefix && (
        <span className={getColorByValue(Number(value))}>{prefix}</span>
      )}
      <span
        style={combinedValueStyle}
        className={getColorByValue(Number(value))}
      >
        {formatNumber(Number(value), {
          lessThanOneNumberFormat: "0.00a",
          prefix: undefined,
          postfix: undefined,
        })}
      </span>
      {suffix && (
        <span
          style={combinedValueStyle}
          className={getColorByValue(Number(value))}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
