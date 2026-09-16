import React from 'react';
import { Sprout, Calendar, Droplets, HeartPulse, ChevronRight, Layers } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../utils/formatters';

export function CropCard({ crop, onSelect }) {
  const isHealthy = crop.health_status === 'Healthy';

  return (
    <Card className="p-5 border-slate-200/80 bg-white hover:border-emerald-300 transition-all flex flex-col justify-between">
      <div className="space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{crop.name}</h3>
              <p className="text-xs text-slate-500">{crop.variety || "Hybrid"}</p>
            </div>
          </div>
          <Badge variant={isHealthy ? "success" : "warning"} size="sm">
            {crop.health_status}
          </Badge>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Growth Stage</span>
            <span className="font-bold text-slate-800">{crop.growth_stage}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Area Planted</span>
            <span className="font-bold text-slate-800">{crop.area_hectares} Ha</span>
          </div>
          <div className="mt-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Planted Date</span>
            <span className="font-medium text-slate-700">{formatDate(crop.planting_date)}</span>
          </div>
          <div className="mt-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Irrigation</span>
            <span className="font-medium text-slate-700 truncate block">{crop.irrigation_schedule || 'Drip'}</span>
          </div>
        </div>

        {crop.notes && (
          <p className="text-xs text-slate-500 italic bg-white p-2 border border-slate-100 rounded-lg">
            "{crop.notes}"
          </p>
        )}

      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
        <span>Active standing crop</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-500 font-normal">Tracking active</span>
        </div>
      </div>
    </Card>
  );
}
