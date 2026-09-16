import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  trend,
  trendText,
  visualType, // 'progress', 'dots', 'status'
  progressValue = 0,
  statusVariant = 'success',
  className
}) {
  return (
    <Card className={cn("p-5 border-slate-200/80 hover:border-emerald-200/80 transition-all flex flex-col justify-between", className)}>
      
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
            {subvalue && <span className="text-xs text-slate-400 font-medium">{subvalue}</span>}
          </div>
        </div>
        {Icon && (
          <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Visual Indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {visualType === 'progress' && (
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Dry (0%)</span>
              <span className="font-semibold text-emerald-700">{progressValue}% (Optimal)</span>
              <span>Wet (100%)</span>
            </div>
          </div>
        )}

        {visualType === 'dots' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs"
                />
              ))}
            </div>
            <Badge variant="success" size="sm">Optimal Health</Badge>
          </div>
        )}

        {visualType === 'status' && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">{trendText || 'Telemetry active'}</span>
            <Badge variant={statusVariant} size="sm">{trend || 'Normal'}</Badge>
          </div>
        )}
      </div>

    </Card>
  );
}
