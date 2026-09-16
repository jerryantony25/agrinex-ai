import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sprout, Plus, Sparkles, Filter, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { CropCard } from '../components/agriculture/CropCard';
import { AddCropModal } from '../components/agriculture/AddCropModal';
import { CropImageUpload } from '../components/agriculture/CropImageUpload';
import { Button } from '../components/ui/Button';
import { cropService } from '../services/cropService';
import { useToast } from '../components/ui/Toast';
import { DEMO_CROPS } from '../data/demoData';

export function CropsPage() {
  const { farmInfo } = useOutletContext();
  const { addToast } = useToast();

  const [crops, setCrops] = useState(DEMO_CROPS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    async function fetchCrops() {
      try {
        const data = await cropService.getCrops('default-farmer');
        if (data && data.length > 0) {
          setCrops(data);
        }
      } catch (err) {
        console.error("Failed to load crops:", err);
      }
    }
    fetchCrops();
  }, []);

  const handleAddCrop = async (newCrop) => {
    try {
      const added = await cropService.addCrop(newCrop);
      setCrops((prev) => [added, ...prev]);
      addToast({
        type: 'success',
        title: 'Crop Registered',
        message: `${newCrop.name} has been added to your standing farm inventory.`
      });
    } catch (err) {
      // Fallback
      setCrops((prev) => [{ ...newCrop, id: 'crop-' + Date.now() }, ...prev]);
      addToast({
        type: 'success',
        title: 'Crop Added',
        message: `${newCrop.name} registered in farm inventory.`
      });
    }
  };

  const filteredCrops = crops.filter(c => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Healthy') return c.health_status === 'Healthy';
    if (activeFilter === 'Attention') return c.health_status !== 'Healthy';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sprout className="h-6 w-6 text-emerald-800" />
            <span>Crop Health & Lifecycle Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track vegetative stages, irrigation cycles, and diagnose foliage symptoms with computer vision.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          icon={Plus}
          className="bg-emerald-800 hover:bg-emerald-900 shadow-sm"
        >
          <span>Register New Crop</span>
        </Button>
      </div>

      {/* AI Crop Image Vision Diagnostic Component */}
      <CropImageUpload />

      {/* Standing Crops Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active Standing Crops ({filteredCrops.length})
            </h3>
            <p className="text-xs text-slate-500">Parcels monitored under {farmInfo?.name || 'Your Farm'}</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['All', 'Healthy', 'Attention'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeFilter === tab
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </div>

      {/* Add Crop Modal */}
      <AddCropModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCropAdded={handleAddCrop}
      />

    </div>
  );
}
