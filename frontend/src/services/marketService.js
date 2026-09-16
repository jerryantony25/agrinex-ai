import { apiClient } from './api';

export const marketService = {
  async getMarketInsights() {
    const res = await apiClient.get('/market');
    return res.data;
  }
};
