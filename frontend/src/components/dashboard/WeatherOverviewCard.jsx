import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, CloudRain, Wind, Droplet, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function WeatherOverviewCard({ weatherData }) {
  const navigate = useNavigate();

  const data = weatherData || {
    location: "Coimbatore, Tamil Nadu",
    current_temp_c: 31.2,
    feels_like_c: 33.5,
    humidity: 58,
    precipitation_prob: 15,
    wind_speed_kmh: 12.5,
    condition: "Sunny & Clear",
    farming_impact: {
      irrigation_advisory: "Evaporation rate: 4.8 mm/day. Provide evening drip pulse.",
      spraying_suitability: "Favorable (Wind speed low at 12.5 km/h)",
      summary: "Clear skies and moderate breeze allow standard field operations."
    }
  };

  return (
    <Card className="p-6 border-slate-200/80 bg-white">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
            <Sun className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Weather Intelligence</h3>
            <p className="text-[11px] text-slate-500">{data.location}</p>
          </div>
        </div>
        <Badge variant="info" size="sm">Micro-forecast</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {/* Current temp */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <Sun className="h-8 w-8 text-amber-500 shrink-0" />
          <div>
            <p className="text-2xl font-black text-slate-900">{data.current_temp_c}°C</p>
            <p className="text-[11px] text-slate-500">Feels like {data.feels_like_c}°C • {data.condition}</p>
          </div>
        </div>

        {/* Humidity & Rain */}
        <div className="p-3 rounded-xl bg-slate-50 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <Droplet className="h-3.5 w-3.5 text-sky-600" /> Humidity
            </span>
            <span className="font-bold text-slate-800">{data.humidity}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <CloudRain className="h-3.5 w-3.5 text-blue-600" /> Rain Chance
            </span>
            <span className="font-bold text-slate-800">{data.precipitation_prob}%</span>
          </div>
        </div>

        {/* Wind & Spraying */}
        <div className="p-3 rounded-xl bg-slate-50 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <Wind className="h-3.5 w-3.5 text-slate-600" /> Wind Speed
            </span>
            <span className="font-bold text-slate-800">{data.wind_speed_kmh} km/h</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Foliar Spraying</span>
            <span className="font-bold text-emerald-700">Favorable</span>
          </div>
        </div>
      </div>

      {/* AI Agricultural Impact */}
      <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
          <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
          <span>Farming Impact & Advisory</span>
        </div>
        <p className="text-xs text-emerald-900 leading-relaxed">
          {data.farming_impact?.summary || data.farming_impact?.irrigation_advisory}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
        <button
          onClick={() => navigate('/app/weather')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
        >
          <span>View 7-Day Agronomic Forecast</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </Card>
  );
}
