import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

const userApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async getUserDetails() {
    try {
      const response = await userApi.get('/user-details');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
};