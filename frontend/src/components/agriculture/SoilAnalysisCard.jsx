import React from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, AlertCircle, Info, Sparkles, Sprout } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function SoilAnalysisCard({ analysis }) {
  if (!analysis) return null;

  const getNurientBadge = (level) => {
    if (!level) return <Badge variant="default">Normal</Badge>;
    const l = level.toLowerCase();
    if (l.includes('optimal') || l.includes('balanced')) return <Badge variant="success">{level}</Badge>;
    if (l.includes('low') || l.includes('acidic') || l.includes('moderate')) return <Badge variant="warning">{level}</Badge>;
    return <Badge variant="danger">{level}</Badge>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Summary Banner */}
      <div className="p-5 rounded-2xl bg-emerald-900 text-white shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-emerald-300" />
            <h3 className="text-base font-bold text-white">Soil Diagnostic Summary</h3>
          </div>
          <Badge variant="ai" size="sm">Agronomic AI Analysis</Badge>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-sans">
          {analysis.soil_summary}
        </p>
      </div>

      {/* Nutrients Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* pH Card */}
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Soil Reaction (pH)</span>
            {getNurientBadge(analysis.ph_assessment?.level)}
          </div>
          <h4 className="text-sm font-bold text-slate-900">{analysis.ph_assessment?.status_text}</h4>
          <p className="text-[11px] text-slate-400 mt-1">Optimal Target: {analysis.ph_assessment?.optimal_range}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <strong>Advisory:</strong> {analysis.ph_assessment?.recommendation}
          </div>
        </Card>

        {/* Nitrogen Card */}
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Nitrogen (N)</span>
            {getNurientBadge(analysis.nitrogen_assessment?.level)}
          </div>
          <h4 className="text-sm font-bold text-slate-900">{analysis.nitrogen_assessment?.status_text}</h4>
          <p className="text-[11px] text-slate-400 mt-1">Optimal Target: {analysis.nitrogen_assessment?.optimal_range}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <strong>Advisory:</strong> {analysis.nitrogen_assessment?.recommendation}
          </div>
        </Card>

        {/* Phosphorus Card */}
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Phosphorus (P)</span>
            {getNurientBadge(analysis.phosphorus_assessment?.level)}
          </div>
          <h4 className="text-sm font-bold text-slate-900">{analysis.phosphorus_assessment?.status_text}</h4>
          <p className="text-[11px] text-slate-400 mt-1">Optimal Target: {analysis.phosphorus_assessment?.optimal_range}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <strong>Advisory:</strong> {analysis.phosphorus_assessment?.recommendation}
          </div>
        </Card>

        {/* Potassium Card */}
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Potassium (K)</span>
            {getNurientBadge(analysis.potassium_assessment?.level)}
          </div>
          <h4 className="text-sm font-bold text-slate-900">{analysis.potassium_assessment?.status_text}</h4>
          <p className="text-[11px] text-slate-400 mt-1">Optimal Target: {analysis.potassium_assessment?.optimal_range}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <strong>Advisory:</strong> {analysis.potassium_assessment?.recommendation}
          </div>
        </Card>

        {/* Moisture Card */}
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Soil Moisture</span>
            {getNurientBadge(analysis.moisture_assessment?.level)}
          </div>
          <h4 className="text-sm font-bold text-slate-900">{analysis.moisture_assessment?.status_text}</h4>
          <p className="text-[11px] text-slate-400 mt-1">Field Capacity: {analysis.moisture_assessment?.optimal_range}</p>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
            <strong>Advisory:</strong> {analysis.moisture_assessment?.recommendation}
          </div>
        </Card>

        {/* Fertilizer Strategy */}
        <Card className="p-4 bg-emerald-50/50 border-emerald-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-emerald-900 uppercase">Fertilizer Regimen</span>
            <Badge variant="success">Priority Action</Badge>
          </div>
          <h4 className="text-xs font-semibold text-emerald-950 leading-relaxed">
            {analysis.fertilizer_guidance}
          </h4>
          <div className="mt-3 pt-2.5 border-t border-emerald-100 text-[11px] text-emerald-800">
            <strong>Irrigation Insight:</strong> {analysis.irrigation_insight}
          </div>
        </Card>

      </div>

      {/* Crop Suitabilities Ranking */}
      {analysis.crop_suitabilities && analysis.crop_suitabilities.length > 0 && (
        <Card className="p-5 border-slate-200 bg-white">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sprout className="h-4 w-4 text-emerald-700" />
            <span>Crop Suitability Index</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.crop_suitabilities.map((crop, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">{crop.crop_name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700">{crop.suitability_score}%</span>
                    <Badge variant={crop.suitability_score >= 80 ? "success" : "warning"} size="sm">
                      {crop.category}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${crop.suitability_score}%` }} />
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{crop.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-start gap-2">
        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
        <span>{analysis.caution_note}</span>
      </div>

    </div>
  );
}
