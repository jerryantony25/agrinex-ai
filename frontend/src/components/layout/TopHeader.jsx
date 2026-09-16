import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Bot, Sparkles, Sprout, ShieldCheck, MapPin, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function TopHeader({ farmInfo }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: "Irrigation Advisory", desc: "Optimal moisture level reached for Tomato field. Skip morning cycle.", time: "10m ago", type: "info" },
    { id: 2, title: "Weather Alert", desc: "Moderate rain predicted for Thursday. Complete foliar spray early.", time: "1h ago", type: "warning" },
    { id: 3, title: "Soil Analysis Ready", desc: "New nutrient assessment completed for North Parcel.", time: "3h ago", type: "success" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/app/chat', { state: { initialQuery: searchQuery } });
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-slate-200/80 bg-white/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      
      {/* Search / AI Query Bar */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask AGRINEX or search farm data..."
            className="w-full pl-9 pr-24 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors flex items-center gap-1"
          >
            <Bot className="h-3 w-3 text-emerald-700" />
            <span>Ask</span>
          </button>
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        
        {/* Farm Location Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          <span className="font-medium text-slate-800">{farmInfo?.location || 'Coimbatore, TN'}</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-semibold">{farmInfo?.primary_crop || 'Tomato'}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <h4 className="text-xs font-bold text-slate-900">Farm Alerts & Advisory</h4>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ask AGRINEX AI Button */}
        <Button
          size="sm"
          variant="primary"
          icon={Bot}
          onClick={() => navigate('/app/chat')}
          className="hidden sm:inline-flex shadow-sm bg-emerald-800 hover:bg-emerald-900"
        >
          <span>Ask AGRINEX</span>
        </Button>

      </div>

    </header>
  );
}
