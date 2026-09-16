import { apiClient } from './api';

export const weatherService = {
  async getWeather(farmerId = 'default-farmer') {
    const res = await apiClient.get(`/weather/${farmerId}`);
    return res.data;
  }
};
