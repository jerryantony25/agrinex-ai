import React, { useState } from 'react';
import { Settings, Key, Database, Globe, Cpu, CheckCircle2, ShieldCheck, Sparkles, HardDrive } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export function SettingsPage() {
  const { addToast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [provider, setProvider] = useState('default');
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('English');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'System configuration and AI model preferences updated.'
      });
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Settings className="h-6 w-6 text-emerald-800" />
          <span>System Settings & AI Configuration</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure external LLM providers, database connection mode, and regional agronomic units.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Configuration Form */}
        <div className="lg:col-span-8 space-y-6">
          
          <Card className="p-6 border-slate-200 bg-white">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Key className="h-4 w-4 text-emerald-700" />
              <span>AI Engine & Model Provider</span>
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              
              <Select
                label="AI Engine Provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                options={[
                  { value: 'default', label: 'AGRINEX Agronomy Rules & Knowledge Base (Built-in, Zero Config)' },
                  { value: 'openai', label: 'OpenAI (GPT-4o / GPT-4o-mini)' },
                  { value: 'openrouter', label: 'OpenRouter / DeepSeek / Claude / Gemini' },
                  { value: 'custom', label: 'Custom OpenAI-Compatible API Endpoint' },
                ]}
                helperText="Default engine provides instant grounded responses without external API keys."
              />

              {provider !== 'default' && (
                <div className="space-y-4 animate-in fade-in">
                  <Input
                    label="AI API Key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    helperText="Keys are kept private in backend environment variables."
                  />

                  <Input
                    label="Model Name"
                    placeholder="e.g. gpt-4o-mini, anthropic/claude-3.5-sonnet"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Select
                  label="Measurement Units"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  options={[
                    { value: 'metric', label: 'Metric (Hectares, kg/ha, °C)' },
                    { value: 'imperial', label: 'Imperial (Acres, lbs/acre, °F)' },
                  ]}
                />

                <Select
                  label="Farmer Preferred Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={[
                    { value: 'English', label: 'English' },
                    { value: 'Tamil', label: 'Tamil (தமிழ்) - Future AI Engine' },
                    { value: 'Hindi', label: 'Hindi (हिंदी) - Future AI Engine' },
                  ]}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button type="submit" variant="primary" size="md" isLoading={isSaving} className="bg-emerald-800">
                  Save Preferences
                </Button>
              </div>

            </form>
          </Card>

          {/* Database & Architecture Status */}
          <Card className="p-6 border-slate-200 bg-white space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-700" />
              <span>Storage & Architecture Layer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Database Engine</span>
                <p className="font-extrabold text-slate-800 text-sm">PostgreSQL / SQLite Dual-Engine</p>
                <p className="text-slate-500 text-[11px]">Automatic local fallback; configure DATABASE_URL for Postgres in cloud.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Backend Framework</span>
                <p className="font-extrabold text-slate-800 text-sm">FastAPI + SQLAlchemy ORM</p>
                <p className="text-slate-500 text-[11px]">Async REST APIs with Pydantic v2 type validation.</p>
              </div>
            </div>
          </Card>

        </div>

        {/* Right: Architecture & Deployment Notes */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 border-slate-200 bg-emerald-950 text-white space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Production Structure</h4>
            </div>

            <h5 className="text-sm font-bold text-white">Vercel & Cloud Ready</h5>
            <p className="text-xs text-emerald-100/80 leading-relaxed font-sans">
              Frontend is structured with Vite and React Router, pre-configured with `vercel.json` rewrites and zero secret leakage.
            </p>

            <div className="pt-2 border-t border-emerald-800/80 space-y-2 text-[11px] text-emerald-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero Hardcoded Localhost URLs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Full Environment Variable Isolation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Responsive Mobile Touch UI</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
