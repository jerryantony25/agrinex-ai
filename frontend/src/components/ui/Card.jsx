import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  children,
  className,
  hover = false,
  glass = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-slate-100 bg-white p-6 shadow-sm",
        glass && "glass-panel shadow-emerald-950/5",
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn("flex items-center justify-between gap-4 pb-4 border-b border-slate-100/80 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, icon: Icon, ...props }) {
  return (
    <h3 className={cn("text-base font-semibold text-slate-900 flex items-center gap-2", className)} {...props}>
      {Icon && <Icon className="h-4 w-4 text-emerald-700" />}
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn("text-xs text-slate-500 mt-0.5", className)} {...props}>
      {children}
    </p>
  );
}
