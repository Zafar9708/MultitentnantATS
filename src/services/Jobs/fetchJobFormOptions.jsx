import axios from 'axios';

const API_BASE_URL = 'https://1a9a0cdf7ba0.ngrok-free.app/api/v1/options';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const fetchJobFormOptions = async () => {
  try {
    const response = await axios.get(API_BASE_URL, getAuthHeaders());
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};