import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FlaskConical, Sparkles, RefreshCw, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SoilAnalysisCard } from '../components/agriculture/SoilAnalysisCard';
import { soilService } from '../services/soilService';
import { useToast } from '../components/ui/Toast';
import { SOIL_TYPES } from '../utils/constants';

export function SoilPage() {
  const { farmInfo } = useOutletContext();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    ph: 6.5,
    nitrogen: 142.0,
    phosphorus: 48.0,
    potassium: 215.0,
    moisture: 42.0,
    temperature: 28.5,
    organic_matter: 2.4,
    soil_type: farmInfo?.soil_type || 'Loamy Soil',
    crop_interest: farmInfo?.primary_crop || 'Tomato'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const payload = {
        ph: parseFloat(formData.ph) || 6.5,
        nitrogen: parseFloat(formData.nitrogen) || 140.0,
        phosphorus: parseFloat(formData.phosphorus) || 45.0,
        potassium: parseFloat(formData.potassium) || 200.0,
        moisture: parseFloat(formData.moisture) || 42.0,
        temperature: parseFloat(formData.temperature) || 28.0,
        organic_matter: parseFloat(formData.organic_matter) || 2.0,
        soil_type: formData.soil_type,
        crop_interest: formData.crop_interest,
        farm_id: farmInfo?.id
      };

      const res = await soilService.analyzeSoil(payload);
      setAnalysisResult(res);
      addToast({
        type: 'success',
        title: 'Soil Analysis Completed',
        message: 'Nutrient balances and crop suitability index generated.'
      });
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Analysis Error',
        message: 'Could not complete online soil test. Showing offline agronomy report.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (type) => {
    if (type === 'optimal') {
      setFormData({
        ph: 6.5,
        nitrogen: 160.0,
        phosphorus: 52.0,
        potassium: 220.0,
        moisture: 58.0,
        temperature: 26.0,
        organic_matter: 3.0,
        soil_type: 'Loamy Soil',
        crop_interest: 'Tomato'
      });
    } else if (type === 'acidic') {
      setFormData({
        ph: 5.2,
        nitrogen: 85.0,
        phosphorus: 24.0,
        potassium: 120.0,
        moisture: 35.0,
        temperature: 30.0,
        organic_matter: 1.2,
        soil_type: 'Red Sandy Loam',
        crop_interest: 'Green Chilli'
      });
    } else if (type === 'alkaline') {
      setFormData({
        ph: 8.2,
        nitrogen: 190.0,
        phosphorus: 40.0,
        potassium: 310.0,
        moisture: 78.0,
        temperature: 29.0,
        organic_matter: 1.8,
        soil_type: 'Black Cotton Clay',
        crop_interest: 'Cotton'
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <FlaskConical className="h-6 w-6 text-emerald-800" />
            <span>Soil Intelligence & Chemical Balancing</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Input soil test lab values or IoT probe readings to assess fertility, pH, and crop suitability.
          </p>
        </div>

        {/* Sample preset buttons */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium hidden sm:inline">Presets:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('optimal')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100"
          >
            Optimal Loam
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('acidic')}
            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold hover:bg-amber-100"
          >
            Acidic Deficit
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('alkaline')}
            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100"
          >
            Alkaline Clay
          </button>
        </div>
      </div>

      {/* Input Form & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form */}
        <div className="lg:col-span-5">
          <Card className="p-6 border-slate-200 bg-white">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Soil Sample Parameters</span>
              <Badge variant="default" size="sm">Laboratory / Sensor</Badge>
            </h3>

            <form onSubmit={handleAnalyze} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Soil pH Level (0-14) *"
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="11.0"
                  value={formData.ph}
                  onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                  helperText="Ideal: 6.0 - 7.0"
                />

                <Input
                  label="Moisture % (0-100%) *"
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.moisture}
                  onChange={(e) => setFormData({ ...formData, moisture: e.target.value })}
                  helperText="Field capacity: 50-75%"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Input
                  label="Nitrogen (N)"
                  type="number"
                  step="1"
                  value={formData.nitrogen}
                  onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                  helperText="kg/ha"
                />

                <Input
                  label="Phosphorus (P)"
                  type="number"
                  step="1"
                  value={formData.phosphorus}
                  onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                  helperText="kg/ha"
                />

                <Input
                  label="Potassium (K)"
                  type="number"
                  step="1"
                  value={formData.potassium}
                  onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                  helperText="kg/ha"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Soil Temp (°C)"
                  type="number"
                  step="0.5"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                />

                <Input
                  label="Organic Matter %"
                  type="number"
                  step="0.1"
                  value={formData.organic_matter}
                  onChange={(e) => setFormData({ ...formData, organic_matter: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Soil Classification"
                  value={formData.soil_type}
                  onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                  options={SOIL_TYPES.map(s => ({ value: s, label: s }))}
                />

                <Input
                  label="Target Crop"
                  value={formData.crop_interest}
                  onChange={(e) => setFormData({ ...formData, crop_interest: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-emerald-800 hover:bg-emerald-900 mt-4"
                isLoading={isAnalyzing}
                icon={Sparkles}
              >
                <span>Analyze Soil with AGRINEX AI</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Analysis Output */}
        <div className="lg:col-span-7">
          {analysisResult ? (
            <SoilAnalysisCard analysis={analysisResult} />
          ) : (
            <Card className="p-12 border-slate-200 bg-white text-center flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
                <FlaskConical className="h-8 w-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Run Soil Intelligence Test</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your field chemistry parameters on the left or select a preset sample to view nutrient ratings, pH corrections, and suitability ranking.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAnalyze({ preventDefault: () => {} })}
                className="bg-emerald-50 text-emerald-800"
              >
                Analyze Current Sample
              </Button>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
}
