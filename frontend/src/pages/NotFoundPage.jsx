import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBFDFB] flex flex-col items-center justify-center p-4 text-center">
      <div className="h-16 w-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 shadow-sm">
        <Sprout className="h-8 w-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-slate-700 mt-2">Field Parcel Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
        The agricultural page or resource you are looking for has moved or does not exist.
      </p>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="md" onClick={() => navigate(-1)} icon={ArrowLeft}>
          Go Back
        </Button>
        <Button variant="primary" size="md" onClick={() => navigate('/app/dashboard')} icon={Home} className="bg-emerald-800">
          Dashboard
        </Button>
      </div>
    </div>
  );
}
