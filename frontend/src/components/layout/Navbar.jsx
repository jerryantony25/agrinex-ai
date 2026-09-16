import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Bot, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
            <Sprout className="h-6 w-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">AGRINEX</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">AI</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide -mt-0.5">SMART AGRICULTURE</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-emerald-700 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How it Works</a>
          <Link to="/app/chat" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
            <Bot className="h-4 w-4 text-emerald-600" />
            AI Assistant
          </Link>
          <Link to="/app/soil" className="hover:text-emerald-700 transition-colors">Soil Intelligence</Link>
          <Link to="/app/store" className="hover:text-emerald-700 transition-colors">Agri Store</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/app/chat')}
            className="hidden sm:inline-flex text-emerald-800 hover:bg-emerald-50"
            icon={Bot}
          >
            Ask AI
          </Button>

          <Button 
            variant="primary" 
            size="sm"
            onClick={() => navigate('/app/dashboard')}
            className="shadow-sm"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

      </div>
    </header>
  );
}
