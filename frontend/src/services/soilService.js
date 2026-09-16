import { apiClient } from './api';

export const soilService = {
  async analyzeSoil(soilData) {
    const res = await apiClient.post('/soil/analyze', soilData);
    return res.data;
  },

  async getLatestSoilRecord(farmerId = 'default-farmer') {
    const res = await apiClient.get(`/soil/latest/${farmerId}`);
    return res.data;
  }
};
