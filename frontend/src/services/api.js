import axios from 'axios';

// Resolve base URL from environment or default to relative proxy /api
const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000,
});

// Response interceptor for consistent error messaging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Unable to connect to AGRINEX server. Please check your network or try again.';
    if (error.response?.data?.detail) {
      errorMessage = typeof error.response.data.detail === 'string' 
        ? error.response.data.detail 
        : JSON.stringify(error.response.data.detail);
    } else if (error.message) {
      errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);
