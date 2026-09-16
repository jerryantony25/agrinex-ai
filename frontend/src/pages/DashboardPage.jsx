import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Droplets,
  Thermometer,
  Sprout,
  CloudSun,
  Bot,
  FlaskConical,
  TrendingUp,
  Plus,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { FarmOverviewCard } from '../components/dashboard/FarmOverviewCard';
import { QuickActionCard } from '../components/dashboard/QuickActionCard';
import { WeatherOverviewCard } from '../components/dashboard/WeatherOverviewCard';
import { AlertBanner } from '../components/dashboard/AlertBanner';
import { CropCard } from '../components/agriculture/CropCard';
import { AddCropModal } from '../components/agriculture/AddCropModal';
import { Button } from '../components/ui/Button';
import { cropService } from '../services/cropService';
import { weatherService } from '../services/weatherService';
import { DEMO_CROPS } from '../data/demoData';

export function DashboardPage() {
  const { farmInfo } = useOutletContext();
  const navigate = useNavigate();

  const [crops, setCrops] = useState(DEMO_CROPS);
  const [weatherData, setWeatherData] = useState(null);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [cropsRes, weatherRes] = await Promise.allSettled([
          cropService.getCrops('default-farmer'),
          weatherService.getWeather('default-farmer')
        ]);

        if (cropsRes.status === 'fulfilled' && cropsRes.value?.length > 0) {
          setCrops(cropsRes.value);
        }
        if (weatherRes.status === 'fulfilled') {
          setWeatherData(weatherRes.value);
        }
      } catch (err) {
        console.error("Dashboard loading error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddCrop = async (newCropData) => {
    try {
      const created = await cropService.addCrop(newCropData);
      setCrops((prev) => [created, ...prev]);
    } catch (err) {
      // Fallback
      setCrops((prev) => [
        { ...newCropData, id: 'crop-' + Date.now() },
        ...prev
      ]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Good morning, Farmer 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here is what is happening across your fields and soil telemetry today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddCropOpen(true)}
            icon={Plus}
            className="bg-white"
          >
            Add Crop
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/chat')}
            icon={Bot}
            className="bg-emerald-800 hover:bg-emerald-900"
          >
            Ask AGRINEX AI
          </Button>
        </div>
      </div>

      {/* AI Active Insight Banner */}
      <AlertBanner farmInfo={farmInfo} />

      {/* Main Farm Card */}
      <FarmOverviewCard farm={farmInfo} crops={crops} />

      {/* Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Soil Moisture"
          value="42%"
          subvalue="Target: 50-75%"
          icon={Droplets}
          visualType="progress"
          progressValue={42}
        />

        <StatCard
          title="Field Temperature"
          value="31°C"
          subvalue="Feels like 33°C"
          icon={Thermometer}
          visualType="status"
          trend="Warm"
          statusVariant="warning"
          trendText="Peak heat at 1:30 PM"
        />

        <StatCard
          title="Crop Health"
          value="Healthy"
          subvalue="Vegetative Phase"
          icon={Sprout}
          visualType="dots"
        />

        <StatCard
          title="Weather Station"
          value="Clear Sky"
          subvalue="15% Rain Prob"
          icon={CloudSun}
          visualType="status"
          trend="Telemetry Active"
          statusVariant="info"
          trendText="Spraying window favorable"
        />
      </div>

      {/* Quick Action Navigation Tiles */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Quick Farming Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <QuickActionCard
            title="Ask AI"
            description="Chat with AGRINEX assistant"
            icon={Bot}
            path="/app/chat"
            colorScheme="emerald"
            badge="AI"
          />
          <QuickActionCard
            title="Analyze Soil"
            description="NPK and pH diagnostics"
            icon={FlaskConical}
            path="/app/soil"
            colorScheme="amber"
          />
          <QuickActionCard
            title="Crop Health"
            description="Screen leaf diseases"
            icon={Sprout}
            path="/app/crops"
            colorScheme="emerald"
          />
          <QuickActionCard
            title="Irrigation"
            description="Moisture & drip guidance"
            icon={Droplets}
            path="/app/chat"
            colorScheme="sky"
          />
          <QuickActionCard
            title="Weather"
            description="7-day agro forecast"
            icon={CloudSun}
            path="/app/weather"
            colorScheme="blue"
          />
          <QuickActionCard
            title="Market"
            description="Mandi commodity rates"
            icon={TrendingUp}
            path="/app/market"
            colorScheme="purple"
          />
        </div>
      </div>

      {/* Lower Section: Weather + Crops */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weather Intelligence Preview */}
        <div className="lg:col-span-6">
          <WeatherOverviewCard weatherData={weatherData} />
        </div>

        {/* Standing Crops Section */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sprout className="h-4 w-4 text-emerald-700" />
              <span>Registered Standing Crops</span>
            </h3>
            <button
              onClick={() => navigate('/app/crops')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all ({crops.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {crops.slice(0, 2).map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>

      </div>

      {/* Add Crop Modal */}
      <AddCropModal
        isOpen={isAddCropOpen}
        onClose={() => setIsAddCropOpen(false)}
        onCropAdded={handleAddCrop}
      />

    </div>
  );
}
