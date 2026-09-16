import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplet,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
  Calendar,
  Clock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { weatherService } from '../services/weatherService';

export function WeatherPage() {
  const { farmInfo } = useOutletContext();
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      setIsLoading(true);
      try {
        const data = await weatherService.getWeather('default-farmer');
        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWeather();
  }, []);

  const data = weather || {
    location: farmInfo?.location || "Coimbatore, Tamil Nadu",
    current_temp_c: 31.2,
    feels_like_c: 33.5,
    humidity: 58,
    precipitation_prob: 15,
    wind_speed_kmh: 12.5,
    wind_direction: "North-East (NE)",
    uv_index: 8,
    condition: "Sunny & Clear",
    hourly: [
      { time: "06:00 AM", temp_c: 23.5, condition: "Partly Cloudy", rain_chance: 5 },
      { time: "09:00 AM", temp_c: 27.0, condition: "Sunny", rain_chance: 10 },
      { time: "12:00 PM", temp_c: 31.8, condition: "Sunny", rain_chance: 15 },
      { time: "03:00 PM", temp_c: 33.2, condition: "Clear Sky", rain_chance: 10 },
      { time: "06:00 PM", temp_c: 28.5, condition: "Partly Cloudy", rain_chance: 20 },
      { time: "09:00 PM", temp_c: 25.0, condition: "Clear Night", rain_chance: 10 },
    ],
    daily: [
      { day: "Today", date: "Sep 16", max_temp_c: 33.2, min_temp_c: 22.8, condition: "Sunny & Warm", rain_chance: 15, humidity: 58, wind_speed_kmh: 12.5 },
      { day: "Tomorrow", date: "Sep 17", max_temp_c: 32.5, min_temp_c: 23.0, condition: "Partly Cloudy", rain_chance: 25, humidity: 62, wind_speed_kmh: 14.0 },
      { day: "Thursday", date: "Sep 18", max_temp_c: 30.0, min_temp_c: 22.5, condition: "Scattered Showers", rain_chance: 65, humidity: 74, wind_speed_kmh: 18.0 },
      { day: "Friday", date: "Sep 19", max_temp_c: 29.2, min_temp_c: 21.8, condition: "Light Rain", rain_chance: 55, humidity: 78, wind_speed_kmh: 15.5 },
      { day: "Saturday", date: "Sep 20", max_temp_c: 31.0, min_temp_c: 22.0, condition: "Mostly Sunny", rain_chance: 20, humidity: 65, wind_speed_kmh: 11.0 },
    ],
    farming_impact: {
      irrigation_advisory: "Evaporation rate is 4.8 mm/day. Schedule 45-minute evening drip cycle after 5:30 PM.",
      spraying_suitability: "Favorable (Wind speed is low at 12.5 km/h until 11:00 AM).",
      pest_disease_risk: "Moderate (Warm daytime temperature with evening humidity increases whitefly and thrips pressure).",
      harvesting_window: "Optimal today and tomorrow. Complete picking before predicted rain on Thursday.",
      summary: "Clear skies and moderate breeze allow standard field operations. Rain expected mid-week."
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CloudSun className="h-6 w-6 text-emerald-800" />
            <span>Weather Intelligence & Agro-Forecast</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Localized micro-climate modeling and AI interpretations for spray scheduling, irrigation, and harvest timing.
          </p>
        </div>

        <Badge variant="info" size="sm">Micro-Climate Telemetry</Badge>
      </div>

      {/* Current Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Main Current Telemetry */}
        <div className="lg:col-span-7">
          <Card className="p-6 border-slate-200 bg-linear-to-br from-white via-sky-50/20 to-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Micro-Climate</span>
                <h3 className="text-xl font-extrabold text-slate-900">{data.location}</h3>
                <p className="text-xs text-slate-500">{data.condition}</p>
              </div>
              <Sun className="h-12 w-12 text-amber-500" />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black text-slate-900">{data.current_temp_c}°C</span>
              <span className="text-sm text-slate-500 font-medium">Feels like {data.feels_like_c}°C</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1">
                  <Droplet className="h-3 w-3 text-sky-600" /> Humidity
                </span>
                <p className="text-base font-extrabold text-slate-900">{data.humidity}%</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1">
                  <CloudRain className="h-3 w-3 text-blue-600" /> Rain Chance
                </span>
                <p className="text-base font-extrabold text-slate-900">{data.precipitation_prob}%</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1">
                  <Wind className="h-3 w-3 text-slate-600" /> Wind
                </span>
                <p className="text-base font-extrabold text-slate-900">{data.wind_speed_kmh} km/h</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1">
                  <Sun className="h-3 w-3 text-amber-500" /> UV Index
                </span>
                <p className="text-base font-extrabold text-slate-900">{data.uv_index} (High)</p>
              </div>
            </div>

            {/* Hourly strip */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" /> Today's Hourly Progression
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                {data.hourly.map((h, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 block">{h.time}</span>
                    <span className="text-xs font-bold text-slate-800 block">{h.temp_c}°C</span>
                    <span className="text-[10px] text-blue-600 font-semibold block">{h.rain_chance}% Rain</span>
                  </div>
                ))}
              </div>
            </div>

          </Card>
        </div>

        {/* Right: AI Agronomic Impact Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 border-emerald-200 bg-linear-to-b from-emerald-50/50 to-white space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
              <Sparkles className="h-5 w-5 text-emerald-800" />
              <div>
                <h3 className="text-base font-bold text-slate-900">AI Farming Impact Advisory</h3>
                <p className="text-[11px] text-emerald-800">Operational recommendations based on climate model</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-emerald-900 uppercase">💧 Smart Irrigation Timing</span>
                <p className="text-xs text-slate-700 leading-relaxed">{data.farming_impact?.irrigation_advisory}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-emerald-900 uppercase">🌿 Foliar Spraying Window</span>
                <p className="text-xs text-slate-700 leading-relaxed">{data.farming_impact?.spraying_suitability}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-emerald-900 uppercase">🐛 Pest & Disease Risk</span>
                <p className="text-xs text-slate-700 leading-relaxed">{data.farming_impact?.pest_disease_risk}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold text-emerald-900 uppercase">🌾 Harvesting Recommendation</span>
                <p className="text-xs text-slate-700 leading-relaxed">{data.farming_impact?.harvesting_window}</p>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* 5-Day Outlook */}
      <Card className="p-6 border-slate-200 bg-white">
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-emerald-700" />
          <span>5-Day Agricultural Forecast</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {data.daily.map((d, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-center">
              <p className="text-xs font-bold text-slate-900">{d.day}</p>
              <p className="text-[10px] text-slate-400">{d.date}</p>
              <div className="py-2">
                <span className="text-lg font-extrabold text-slate-900">{d.max_temp_c}°</span>
                <span className="text-xs text-slate-400 ml-1">/ {d.min_temp_c}°</span>
              </div>
              <p className="text-[11px] font-medium text-slate-700">{d.condition}</p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-blue-700 font-semibold">
                {d.rain_chance}% Rain
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs flex items-start gap-2">
        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
        <span>Weather telemetry is modeled for farm micro-climates. Connect official hardware weather station or OpenWeatherMap API for live automated updates.</span>
      </div>

    </div>
  );
}
