import { apiClient } from './api';

export const productService = {
  async getProducts(category = null) {
    const params = category && category !== 'All' ? { category } : {};
    const res = await apiClient.get('/products', { params });
    return res.data;
  },

  async placeOrder(orderData) {
    const res = await apiClient.post('/products/orders', orderData);
    return res.data;
  }
};
