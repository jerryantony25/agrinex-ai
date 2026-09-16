import { apiClient } from './api';

export const farmService = {
  async getFarm(farmerId = 'default-farmer') {
    const res = await apiClient.get(`/farm/${farmerId}`);
    return res.data;
  },

  async saveFarm(farmData) {
    const res = await apiClient.post('/farm', farmData);
    return res.data;
  },

  async getProfile(farmerId = 'default-farmer') {
    const res = await apiClient.get(`/farm/profile/${farmerId}`);
    return res.data;
  }
};
