import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Trees,
  FlaskConical,
  Sprout,
  CloudSun,
  TrendingUp,
  ShoppingBag,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../../utils/cn';

const mainNavItems = [
  { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'AI Assistant', path: '/app/chat', icon: Bot, badge: 'Pro' },
  { name: 'My Farm', path: '/app/farm', icon: Trees },
  { name: 'Soil Intelligence', path: '/app/soil', icon: FlaskConical },
  { name: 'Crop Health', path: '/app/crops', icon: Sprout },
  { name: 'Weather', path: '/app/weather', icon: CloudSun },
  { name: 'Market', path: '/app/market', icon: TrendingUp },
  { name: 'Agri Store', path: '/app/store', icon: ShoppingBag },
];

const secondaryNavItems = [
  { name: 'Settings & API', path: '/app/settings', icon: Settings },
];

export function Sidebar({ className }) {
  return (
    <aside className={cn("w-64 flex-col justify-between border-r border-slate-200/80 bg-white/95 backdrop-blur-md hidden md:flex h-screen sticky top-0 z-30 select-none", className)}>
      
      {/* Top Brand */}
      <div>
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-md shadow-emerald-950/20">
            <Sprout className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">AGRINEX</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">AI</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Smart Farming Platform</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="px-3 py-4 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform</p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-emerald-50 text-emerald-900 font-semibold shadow-xs border border-emerald-200/60"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-emerald-700" : "text-slate-400 group-hover:text-slate-700")} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-700 text-white tracking-wide">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Area / Farmer Status */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                    isActive && "bg-slate-100 text-slate-900 font-semibold"
                  )
                }
              >
                <Icon className="h-4 w-4 text-slate-400" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Farmer Profile Card */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center text-xs ring-2 ring-white">
              RK
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 truncate">Ramesh Kumar</p>
              <p className="text-[10px] text-slate-500 truncate">Green Valley Farm</p>
            </div>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 animate-pulse" title="System Online" />
        </div>
      </div>

    </aside>
  );
}
