import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, Github, Sparkles, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm">
                <Sprout className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">AGRINEX AI</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intelligent Smart Agriculture Management System empowering modern farmers with AI-driven decisions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Intelligence Hub</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link to="/app/chat" className="hover:text-emerald-700 transition-colors">AI Farming Assistant</Link></li>
              <li><Link to="/app/soil" className="hover:text-emerald-700 transition-colors">Soil Vitality Testing</Link></li>
              <li><Link to="/app/crops" className="hover:text-emerald-700 transition-colors">Crop Health Diagnostic</Link></li>
              <li><Link to="/app/weather" className="hover:text-emerald-700 transition-colors">Weather Micro-forecast</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link to="/app/market" className="hover:text-emerald-700 transition-colors">Regional Mandi Prices</Link></li>
              <li><Link to="/app/store" className="hover:text-emerald-700 transition-colors">Agricultural Input Store</Link></li>
              <li><Link to="/app/settings" className="hover:text-emerald-700 transition-colors">API & AI Settings</Link></li>
              <li><a href="#how-it-works" className="hover:text-emerald-700 transition-colors">System Architecture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Safety & Governance</h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>Grounded Agronomy</span>
              </div>
              <p>AI suggestions are supportive and follow responsible agronomic guidelines. Verify with local agricultural authorities for chemical interventions.</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AGRINEX AI. Intelligent Farming. Better Decisions.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for farmers worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
