import React from 'react';
import { cn } from '../../utils/cn';

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  valueText,
  variant = 'emerald', // 'emerald', 'blue', 'amber', 'rose'
  size = 'md',        // 'sm', 'md', 'lg'
  className
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantFills = {
    emerald: "bg-emerald-600",
    blue: "bg-sky-600",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  };

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || valueText) && (
        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
          {label && <span>{label}</span>}
          <span>{valueText || `${Math.round(percentage)}%`}</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-100 rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn("transition-all duration-500 ease-out rounded-full", heights[size], variantFills[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
