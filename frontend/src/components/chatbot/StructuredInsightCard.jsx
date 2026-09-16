import React from 'react';
import { Droplets, FlaskConical, Sprout, CloudSun, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export function StructuredInsightCard({ card, className }) {
  if (!card) return null;

  const categoryIcons = {
    irrigation: Droplets,
    soil: FlaskConical,
    crop_health: Sprout,
    weather: CloudSun,
    fertilizer: FlaskConical,
    general: Sprout,
  };

  const categoryColors = {
    irrigation: "bg-sky-50 border-sky-200 text-sky-900",
    soil: "bg-amber-50 border-amber-200 text-amber-900",
    crop_health: "bg-emerald-50 border-emerald-200 text-emerald-900",
    weather: "bg-blue-50 border-blue-200 text-blue-900",
    fertilizer: "bg-purple-50 border-purple-200 text-purple-900",
    general: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };

  const Icon = categoryIcons[card.category] || Sprout;
  const colorScheme = categoryColors[card.category] || categoryColors.general;

  return (
    <div className={cn("rounded-2xl border p-4 shadow-sm space-y-3 mt-3", colorScheme, className)}>
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white shadow-xs">
            <Icon className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-75">AGRINEX INSIGHT</h4>
            <p className="text-sm font-bold text-slate-900 leading-tight">{card.title}</p>
          </div>
        </div>
        <Badge variant="success" size="sm">Grounded</Badge>
      </div>

      {/* Summary */}
      <p className="text-xs font-medium text-slate-800 leading-relaxed">
        {card.summary}
      </p>

      {/* Points */}
      {card.points && card.points.length > 0 && (
        <div className="bg-white/80 rounded-xl p-3 border border-black/5 space-y-1.5">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Key Agronomic Observations</p>
          <ul className="space-y-1">
            {card.points.map((pt, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Items */}
      {card.action_items && card.action_items.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Recommended Next Steps</p>
          <div className="grid grid-cols-1 gap-1.5">
            {card.action_items.map((act, i) => (
              <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-800 bg-white/90 p-2 rounded-lg border border-black/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      {card.disclaimer && (
        <div className="pt-2 border-t border-black/5 flex items-start gap-1.5 text-[10px] text-slate-500 italic">
          <AlertCircle className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
          <span>{card.disclaimer}</span>
        </div>
      )}

    </div>
  );
}
