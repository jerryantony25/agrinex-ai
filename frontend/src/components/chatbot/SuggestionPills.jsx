import React from 'react';
import { Sparkles } from 'lucide-react';
import { INITIAL_SUGGESTION_PILLS } from '../../data/demoData';

export function SuggestionPills({ onSelectPill, suggestions = INITIAL_SUGGESTION_PILLS }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {suggestions.map((item, idx) => {
        const label = typeof item === 'string' ? item : item.label;
        const query = typeof item === 'string' ? item : item.query;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPill(query)}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-slate-200/80 text-slate-700 transition-all font-medium flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95"
          >
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
