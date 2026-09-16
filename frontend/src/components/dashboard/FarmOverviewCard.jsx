import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trees, MapPin, Layers, Droplets, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function FarmOverviewCard({ farm, crops = [] }) {
  const navigate = useNavigate();
  const primaryCrop = crops.find(c => c.name?.toLowerCase().includes(farm?.primary_crop?.toLowerCase())) || crops[0] || {
    name: farm?.primary_crop || "Tomato",
    variety: "Arka Rakshak F1",
    growth_stage: "Vegetative",
    health_status: "Healthy",
    planting_date: "2026-08-18"
  };

  return (
    <Card className="p-6 border-slate-200/80 bg-linear-to-br from-white via-emerald-50/20 to-white relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Left Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm" icon={Sparkles}>
              Active Farm Unit
            </Badge>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">{farm?.size_hectares || 2.5} Hectares (~{(farm?.size_hectares || 2.5) * 2.471} Acres)</span>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              {farm?.name || "Green Valley Agro Farm"}
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              <span>{farm?.location || "Coimbatore, Tamil Nadu"}</span>
              <span className="text-slate-300">•</span>
              <span>Water Source: {farm?.water_source || "Borewell"}</span>
            </p>
          </div>

          {/* Key tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <Layers className="h-3.5 w-3.5 text-amber-600" />
              <span>Soil: <strong>{farm?.soil_type || "Loamy Soil"}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <Droplets className="h-3.5 w-3.5 text-sky-600" />
              <span>System: <strong>{farm?.irrigation_type || "Drip Irrigation"}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Active Crop Highlights */}
        <div className="lg:w-80 rounded-2xl bg-white p-4 border border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primary Standing Crop</span>
            <Badge variant="success" size="sm">{primaryCrop.health_status}</Badge>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900">{primaryCrop.name}</h4>
            <p className="text-xs text-slate-500">{primaryCrop.variety || "Hybrid Variety"}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Growth Stage</p>
              <p className="font-bold text-emerald-800">{primaryCrop.growth_stage}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Schedule</p>
              <p className="font-bold text-slate-700">Drip (2 Days)</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/crops')}
            className="w-full text-xs font-semibold justify-between bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
          >
            <span>Manage All Crops</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

      </div>

    </Card>
  );
}
