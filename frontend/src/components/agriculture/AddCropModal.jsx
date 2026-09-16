import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CROP_STAGES } from '../../utils/constants';

export function AddCropModal({ isOpen, onClose, onCropAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    growth_stage: 'Vegetative',
    area_hectares: 1.0,
    planting_date: new Date().toISOString().split('T')[0],
    health_status: 'Healthy',
    irrigation_schedule: 'Every 2 Days (Drip)',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsLoading(true);
    try {
      await onCropAdded({
        ...formData,
        area_hectares: parseFloat(formData.area_hectares) || 1.0,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Crop to Farm Registry"
      description="Register a new standing crop or parcel rotation."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Crop Name *"
            placeholder="e.g. Tomato, Chilli, Cotton"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="Variety / Hybrid"
            placeholder="e.g. Arka Rakshak F1"
            value={formData.variety}
            onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Current Growth Stage"
            value={formData.growth_stage}
            onChange={(e) => setFormData({ ...formData, growth_stage: e.target.value })}
            options={CROP_STAGES.map(s => ({ value: s, label: s }))}
          />

          <Input
            label="Area (Hectares)"
            type="number"
            step="0.1"
            min="0.1"
            value={formData.area_hectares}
            onChange={(e) => setFormData({ ...formData, area_hectares: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Planting Date"
            type="date"
            value={formData.planting_date}
            onChange={(e) => setFormData({ ...formData, planting_date: e.target.value })}
          />

          <Select
            label="Health Status"
            value={formData.health_status}
            onChange={(e) => setFormData({ ...formData, health_status: e.target.value })}
            options={[
              { value: 'Healthy', label: 'Healthy (Normal Growth)' },
              { value: 'Attention Needed', label: 'Attention Needed' },
              { value: 'Critical', label: 'Critical' },
              { value: 'Under Observation', label: 'Under Observation' },
            ]}
          />
        </div>

        <Input
          label="Irrigation Schedule"
          placeholder="e.g. Every 2 Days (Drip 45 min)"
          value={formData.irrigation_schedule}
          onChange={(e) => setFormData({ ...formData, irrigation_schedule: e.target.value })}
        />

        <Input
          label="Agronomic Notes (Optional)"
          placeholder="e.g. Nursery transplanted after 25 days; basal DAP applied."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="outline" size="md" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            Save Crop
          </Button>
        </div>

      </form>
    </Modal>
  );
}
