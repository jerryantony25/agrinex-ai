import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bot, Trees, FlaskConical, User, Sprout, ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';

const mobileNavItems = [
  { name: 'Home', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'AI Co-pilot', path: '/app/chat', icon: Bot, isHighlight: true },
  { name: 'Soil', path: '/app/soil', icon: FlaskConical },
  { name: 'Crops', path: '/app/crops', icon: Sprout },
  { name: 'Farm', path: '/app/farm', icon: Trees },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all text-[11px] font-medium min-w-[56px] min-h-[48px]",
                  item.isHighlight && !isActive && "text-emerald-700 font-semibold",
                  isActive
                    ? "text-emerald-800 font-bold bg-emerald-50/80"
                    : "text-slate-500 hover:text-slate-800"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    "p-1 rounded-lg transition-transform",
                    item.isHighlight && "bg-emerald-700 text-white shadow-md shadow-emerald-900/30 p-1.5 -mt-3 mb-0.5"
                  )}>
                    <Icon className={cn("h-5 w-5", item.isHighlight ? "h-5 w-5 text-white" : isActive ? "text-emerald-700" : "text-slate-500")} />
                  </div>
                  <span className={cn(item.isHighlight && "-mt-0.5")}>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
