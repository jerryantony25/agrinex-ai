import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, MapPin, Info, ArrowUpDown } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

export function MarketTable({ items = [], notice }) {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = items.filter(item => 
    item.commodity.toLowerCase().includes(search.toLowerCase()) ||
    item.market_name.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    return sortAsc ? a.modal_price - b.modal_price : b.modal_price - a.modal_price;
  });

  return (
    <div className="space-y-4">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commodity or mandi..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 transition-colors self-end sm:self-auto"
        >
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
          <span>Sort by Modal Price ({sortAsc ? 'Ascending' : 'Descending'})</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Commodity / Variety</th>
                <th className="py-3.5 px-4">Wholesale Mandi</th>
                <th className="py-3.5 px-4">Min - Max Price</th>
                <th className="py-3.5 px-4">Modal Price (100 kg)</th>
                <th className="py-3.5 px-4">24h Trend</th>
                <th className="py-3.5 px-4">Daily Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filtered.map((item) => {
                const isUp = item.trend === 'up';
                const isDown = item.trend === 'down';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{item.commodity}</p>
                      <p className="text-[11px] text-slate-400">{item.variety}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-slate-800">{item.market_name}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{item.location}</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      ₹{item.min_price} – ₹{item.max_price}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-slate-900 text-sm">
                        ₹{item.modal_price}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold">
                        {isUp && (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +{item.price_change_24h}%
                          </span>
                        )}
                        {isDown && (
                          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" /> {item.price_change_24h}%
                          </span>
                        )}
                        {!isUp && !isDown && (
                          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Minus className="h-3 w-3" /> Stable
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.arrival_volume_tons} Tons
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Honest Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2 leading-relaxed">
        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
        <span>{notice || "Regional wholesale mandi price indicators are modeled for educational guidance. Connect official APMC mandi live API key for real-time spot settlement."}</span>
      </div>

    </div>
  );
}
