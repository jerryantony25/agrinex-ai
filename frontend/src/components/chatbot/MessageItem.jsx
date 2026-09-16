import React from 'react';
import { User, Sprout, ShieldAlert, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { StructuredInsightCard } from './StructuredInsightCard';
import { formatRelativeTime } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export function MessageItem({ message, onRetry }) {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex items-start gap-3 w-full", isUser ? "flex-row-reverse" : "flex-row")}>
      
      {/* Avatar */}
      <div className={cn(
        "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs",
        isUser ? "bg-slate-800 text-white" : "bg-emerald-800 text-white"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Sprout className="h-4.5 w-4.5 text-emerald-300" />}
      </div>

      {/* Bubble Content */}
      <div className={cn("flex flex-col max-w-[85%] sm:max-w-[75%]", isUser ? "items-end" : "items-start")}>
        
        {/* Name / Role Header */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-[11px] font-semibold text-slate-500">
            {isUser ? "You" : "AGRINEX AI"}
          </span>
          <span className="text-[10px] text-slate-400">
            {formatRelativeTime(message.created_at)}
          </span>
        </div>

        {/* Bubble */}
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser 
            ? "bg-emerald-800 text-white rounded-tr-none shadow-sm shadow-emerald-950/10 font-normal" 
            : "bg-white text-slate-900 border border-slate-200/80 rounded-tl-none shadow-xs"
        )}>
          
          {/* Main message text (with line breaks) */}
          <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
            {message.content}
          </div>

          {/* Structured Card if attached */}
          {message.structured_data && (
            <StructuredInsightCard card={message.structured_data} />
          )}

          {/* AI Footer Actions */}
          {!isUser && (
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>Grounded with Farm Knowledge</span>
              </div>
              <button
                onClick={handleCopy}
                className="hover:text-slate-700 flex items-center gap-1 transition-colors p-1"
                title="Copy response"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
