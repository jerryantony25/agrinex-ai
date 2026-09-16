import { apiClient } from './api';

export const cropService = {
  async getCrops(farmerId = 'default-farmer') {
    const res = await apiClient.get(`/crops/${farmerId}`);
    return res.data;
  },

  async addCrop(cropData) {
    const res = await apiClient.post('/crops', cropData);
    return res.data;
  },

  async uploadCropImage(file, cropName = 'Tomato') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('crop_name', cropName);
    
    const res = await apiClient.post('/crops/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
};
