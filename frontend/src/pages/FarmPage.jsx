import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Trees, MapPin, Edit3, Save, CheckCircle2, Droplets, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { farmService } from '../services/farmService';
import { useToast } from '../components/ui/Toast';
import { SOIL_TYPES, IRRIGATION_TYPES } from '../utils/constants';

export function FarmPage() {
  const { farmInfo, setFarmInfo } = useOutletContext();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size_hectares: 2.5,
    primary_crop: 'Tomato',
    soil_type: 'Loamy Soil',
    irrigation_type: 'Drip Irrigation',
    water_source: 'Borewell',
    notes: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (farmInfo) {
      setFormData({
        name: farmInfo.name || 'Green Valley Agro Farm',
        location: farmInfo.location || 'Coimbatore, Tamil Nadu',
        size_hectares: farmInfo.size_hectares || 2.5,
        primary_crop: farmInfo.primary_crop || 'Tomato',
        soil_type: farmInfo.soil_type || 'Loamy Soil',
        irrigation_type: farmInfo.irrigation_type || 'Drip Irrigation',
        water_source: farmInfo.water_source || 'Borewell',
        notes: farmInfo.notes || 'Equipped with inline drip and automated filtration.'
      });
    }
  }, [farmInfo]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await farmService.saveFarm({
        ...formData,
        size_hectares: parseFloat(formData.size_hectares) || 2.5,
        farmer_id: 'default-farmer'
      });
      setFarmInfo(updated);
      setIsEditing(false);
      addToast({
        type: 'success',
        title: 'Farm Profile Updated',
        message: 'Your farm specifications have been saved and connected to AGRINEX AI.'
      });
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: 'Could not update farm details. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Trees className="h-6 w-6 text-emerald-800" />
            <span>My Farm Profile & Infrastructure</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your land parcel dimensions, soil texture classification, and irrigation layout.
          </p>
        </div>

        <Button
          variant={isEditing ? "outline" : "primary"}
          size="sm"
          icon={isEditing ? Save : Edit3}
          onClick={() => {
            if (isEditing) {
              handleSave({ preventDefault: () => {} });
            } else {
              setIsEditing(true);
            }
          }}
          className={!isEditing ? "bg-emerald-800 hover:bg-emerald-900" : ""}
          isLoading={isSaving}
        >
          <span>{isEditing ? 'Save Changes' : 'Edit Farm Details'}</span>
        </Button>
      </div>

      {/* Main Farm Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Summary Profile Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 border-slate-200 bg-white">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-sm">
                <Trees className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{formData.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{formData.location}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Registered Farmer</span>
                <span className="font-bold text-slate-800">Ramesh Kumar</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Total Farm Size</span>
                <span className="font-bold text-slate-800">{formData.size_hectares} Ha (~{(formData.size_hectares * 2.471).toFixed(1)} Acres)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Standing Primary Crop</span>
                <Badge variant="success" size="sm">{formData.primary_crop}</Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Soil Classification</span>
                <span className="font-bold text-slate-800">{formData.soil_type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Irrigation Setup</span>
                <span className="font-bold text-slate-800">{formData.irrigation_type}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Water Source</span>
                <span className="font-bold text-slate-800">{formData.water_source}</span>
              </div>
            </div>

            {formData.notes && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 italic">
                "{formData.notes}"
              </div>
            )}
          </Card>

          {/* Connected Grounding Status */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <h4 className="font-bold">AI Assistant Synchronized</h4>
              <p className="mt-0.5 opacity-90 leading-relaxed">
                AGRINEX automatically references these farm specifications to tailor crop nutrition and irrigation advice.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form Editor */}
        <div className="lg:col-span-7">
          <Card className="p-6 border-slate-200 bg-white">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
              {isEditing ? "Edit Farm Specifications" : "Farm Configuration Details"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Farm Name *"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  label="Geographical Location *"
                  disabled={!isEditing}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Farm Size (Hectares)"
                  type="number"
                  step="0.1"
                  min="0.1"
                  disabled={!isEditing}
                  value={formData.size_hectares}
                  onChange={(e) => setFormData({ ...formData, size_hectares: e.target.value })}
                />

                <Input
                  label="Primary Crop"
                  disabled={!isEditing}
                  value={formData.primary_crop}
                  onChange={(e) => setFormData({ ...formData, primary_crop: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Soil Type"
                  disabled={!isEditing}
                  value={formData.soil_type}
                  onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                  options={SOIL_TYPES.map(s => ({ value: s, label: s }))}
                />

                <Select
                  label="Irrigation Infrastructure"
                  disabled={!isEditing}
                  value={formData.irrigation_type}
                  onChange={(e) => setFormData({ ...formData, irrigation_type: e.target.value })}
                  options={IRRIGATION_TYPES.map(s => ({ value: s, label: s }))}
                />
              </div>

              <Input
                label="Water Source"
                disabled={!isEditing}
                placeholder="e.g. Borewell, Canal, Rainwater Pond"
                value={formData.water_source}
                onChange={(e) => setFormData({ ...formData, water_source: e.target.value })}
              />

              <Input
                label="Agronomic Field Notes"
                disabled={!isEditing}
                placeholder="e.g. Field parcel A undergoes organic rotation with vermicompost."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  <Button variant="outline" size="md" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" isLoading={isSaving}>
                    Save Farm
                  </Button>
                </div>
              )}

            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}
