import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  Bot,
  FlaskConical,
  Droplets,
  CloudSun,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Leaf
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI Farming Assistant",
      desc: "Natural language agronomist answering complex queries on crop nutrition, pest control, and field management.",
      color: "bg-emerald-100 text-emerald-800"
    },
    {
      icon: FlaskConical,
      title: "Soil Intelligence",
      desc: "Evaluate pH, Nitrogen, Phosphorus, and Potassium parameters to receive scientific soil conditioning regimens.",
      color: "bg-amber-100 text-amber-800"
    },
    {
      icon: Sprout,
      title: "Crop Health Diagnostic",
      desc: "Lifecycle tracking from vegetative to harvest with computer vision image screening for foliage disease.",
      color: "bg-green-100 text-green-800"
    },
    {
      icon: Droplets,
      title: "Smart Irrigation Advisory",
      desc: "Prevent waterlogging and drought stress with dynamic soil moisture and evapotranspiration calculations.",
      color: "bg-sky-100 text-sky-800"
    },
    {
      icon: CloudSun,
      title: "Weather Intelligence",
      desc: "Micro-climate forecasting with farming-specific impacts on foliar spraying windows and rain precautions.",
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      desc: "Track regional wholesale mandi benchmark commodity prices, price volatility trends, and arrival volumes.",
      color: "bg-purple-100 text-purple-800"
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Tell AGRINEX about your farm",
      desc: "Register your farm location, soil profile, primary crops, and irrigation equipment in seconds."
    },
    {
      step: "02",
      title: "Connect available data",
      desc: "Input recent soil test values, inspect weather micro-forecasts, or upload leaf diagnostic photographs."
    },
    {
      step: "03",
      title: "AGRINEX analyzes the information",
      desc: "Our agronomic rules engine and AI co-pilot synthesize your specific conditions without hallucinations."
    },
    {
      step: "04",
      title: "Receive understandable insights",
      desc: "Get clear, actionable next steps for irrigation, balanced fertigation, and disease mitigation."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFB] selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100">
        
        {/* Background glow meshes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
                <Leaf className="h-3.5 w-3.5 text-emerald-600" />
                <span>AI-POWERED SMART AGRICULTURE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Grow Smarter.<br />
                <span className="text-emerald-800 bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent">
                  Farm Better.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Your intelligent farming assistant for crop health, soil insights, smart irrigation guidance, weather intelligence, and grounded agricultural decisions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/app/dashboard')}
                  className="w-full sm:w-auto shadow-lg shadow-emerald-950/20 bg-emerald-800 hover:bg-emerald-900 font-bold"
                >
                  <span>Start Farming Smarter →</span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/app/chat')}
                  className="w-full sm:w-auto bg-white text-slate-800 hover:bg-slate-50 border-slate-300 font-bold"
                  icon={Bot}
                >
                  <span>Talk to AGRINEX AI</span>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>No Hallucinated Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Grounded Agronomy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-emerald-600" />
                  <span>IoT & Vision Ready</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual (Rich Agriculture + AI UI Overlay) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card (Farm Context) */}
                <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-md relative z-10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-xs">
                        <Sprout className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Green Valley Agro Farm</h4>
                        <p className="text-[11px] text-slate-500">Coimbatore • 2.5 Hectares</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Standing: Tomato</Badge>
                  </div>

                  {/* Overlaid Data Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-100">
                      <p className="text-[10px] text-sky-800 font-bold uppercase">Soil Moisture</p>
                      <p className="text-lg font-black text-sky-950 mt-0.5">42%</p>
                      <span className="text-[10px] text-sky-700 font-medium">Field Capacity</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-100">
                      <p className="text-[10px] text-amber-800 font-bold uppercase">Temperature</p>
                      <p className="text-lg font-black text-amber-950 mt-0.5">31°C</p>
                      <span className="text-[10px] text-amber-700 font-medium">Sunny & Warm</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                      <p className="text-[10px] text-emerald-800 font-bold uppercase">Crop Health</p>
                      <p className="text-lg font-black text-emerald-950 mt-0.5">Healthy</p>
                      <span className="text-[10px] text-emerald-700 font-medium">Vegetative</span>
                    </div>
                  </div>

                  {/* Floating AI Assistant Response inside UI */}
                  <div className="p-4 rounded-2xl bg-emerald-900 text-white space-y-2 shadow-lg animate-float">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-emerald-300" />
                        <span className="text-xs font-bold text-emerald-100">AGRINEX AI ADVISORY</span>
                      </div>
                      <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-full text-emerald-200">Live</span>
                    </div>
                    <p className="text-xs text-emerald-50 leading-relaxed font-sans">
                      "Soil moisture is at <strong>42%</strong>. Hold morning irrigation today; daytime heat peak requires a 45-minute evening drip cycle instead."
                    </p>
                  </div>
                </div>

                {/* Floating card 1: Soil pH */}
                <div className="absolute -top-6 -left-6 rounded-2xl bg-white border border-slate-200 p-3 shadow-xl hidden sm:flex items-center gap-3 z-20 animate-pulse-subtle">
                  <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <FlaskConical className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Soil pH</p>
                    <p className="text-xs font-extrabold text-slate-900">6.5 (Optimal)</p>
                  </div>
                </div>

                {/* Floating card 2: Weather Spraying window */}
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white border border-slate-200 p-3 shadow-xl hidden sm:flex items-center gap-3 z-20">
                  <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                    <CloudSun className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Foliar Spraying</p>
                    <p className="text-xs font-extrabold text-emerald-700">Favorable (Low Wind)</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              COMPREHENSIVE INTELLIGENCE
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Intelligent Assistant.<br />Your Entire Farm.
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every tool a modern farmer needs to make precise, data-driven decisions from seed selection to market sale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200/80 bg-[#FBFDFB] hover:bg-white hover:border-emerald-300 hover:shadow-lg transition-all group cursor-pointer"
                  onClick={() => navigate('/app/dashboard')}
                >
                  <div className={`h-12 w-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              SIMPLE & POWERFUL
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How AGRINEX Works
            </h3>
            <p className="text-sm text-slate-500">
              Transforming complex agricultural science into plain, actionable farming advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
                <span className="text-3xl font-black text-emerald-100 block mb-2">{s.step}</span>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-16 rounded-3xl bg-emerald-900 text-white p-8 sm:p-12 text-center space-y-4 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Upgrade Your Farm with AI?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
              Access real-time soil analysis, weather advisory, and grounded AI farming assistance right now.
            </p>
            <div className="pt-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/app/dashboard')}
                className="bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold shadow-lg"
              >
                <span>Start Your Smart Farming Journey →</span>
              </Button>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
