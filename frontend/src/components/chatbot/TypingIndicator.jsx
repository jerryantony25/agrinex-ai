import React from 'react';
import { Sprout } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-in fade-in duration-300">
      <div className="h-8 w-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
        <Sprout className="h-4 w-4 text-emerald-300 animate-pulse" />
      </div>
      <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-1.5">
        <span className="text-xs text-slate-500 font-medium mr-1">AGRINEX is thinking</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
      </div>
    </div>
  );
}
