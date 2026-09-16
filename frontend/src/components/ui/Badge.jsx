import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({
  children,
  className,
  variant = 'default', // 'default', 'success', 'warning', 'danger', 'info', 'amber', 'purple'
  size = 'md',
  icon: Icon,
  ...props
}) {
  const variants = {
    default: "bg-slate-100 text-slate-700 border-slate-200/80",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800 border-amber-200/80",
    danger: "bg-rose-50 text-rose-800 border-rose-200/80",
    info: "bg-sky-50 text-sky-800 border-sky-200/80",
    purple: "bg-purple-50 text-purple-800 border-purple-200/80",
    ai: "bg-emerald-900 text-emerald-200 border-emerald-700/50 shadow-sm",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-3 w-3 shrink-0" />}
      {children}
    </span>
  );
}
