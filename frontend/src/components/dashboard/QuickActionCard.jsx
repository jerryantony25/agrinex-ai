import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, FlaskConical, Sprout, Droplets, CloudSun, TrendingUp, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  path,
  colorScheme = "emerald",
  badge
}) {
  const navigate = useNavigate();

  const colorVariants = {
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white",
    amber: "bg-amber-50 text-amber-800 border-amber-100 group-hover:bg-amber-600 group-hover:text-white",
    sky: "bg-sky-50 text-sky-800 border-sky-100 group-hover:bg-sky-600 group-hover:text-white",
    blue: "bg-blue-50 text-blue-800 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-800 border-purple-100 group-hover:bg-purple-600 group-hover:text-white",
  };

  return (
    <div
      onClick={() => navigate(path)}
      className="group p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center border transition-all duration-300", colorVariants[colorScheme])}>
            <Icon className="h-5 w-5" />
          </div>
          {badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {badge}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
        <span>Explore</span>
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
