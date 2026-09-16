import { apiClient } from './api';

export const chatService = {
  async sendMessage(message, farmerId = 'default-farmer', conversationId = null, farmContext = null) {
    const res = await apiClient.post('/chat', {
      message,
      farmer_id: farmerId,
      conversation_id: conversationId,
      farm_context: farmContext
    });
    return res.data;
  },

  async getHistory(farmerId = 'default-farmer') {
    const res = await apiClient.get(`/chat/history/${farmerId}`);
    return res.data;
  }
};
