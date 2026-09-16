import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function AlertBanner({ farmInfo }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-6 text-white shadow-md relative overflow-hidden">
      
      {/* Background graphic */}
      <div className="absolute top-0 right-0 w-96 h-full opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold tracking-wide">
            <Bot className="h-3.5 w-3.5" />
            <span>AGRINEX AI ACTIVE ADVISORY</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Daily Farm Health Overview is Ready
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Your soil moisture is stable at <strong>42%</strong> and daytime temperature is reaching <strong>31°C</strong>. 
            Ask AGRINEX to schedule optimal drip irrigation and fertigation for your <strong>{farmInfo?.primary_crop || 'Tomato'}</strong> crop.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/app/chat')}
            className="bg-white text-emerald-950 hover:bg-emerald-50 border-0 shadow-lg font-bold w-full sm:w-auto"
          >
            <span>Ask AGRINEX →</span>
          </Button>
        </div>

      </div>

    </div>
  );
}
