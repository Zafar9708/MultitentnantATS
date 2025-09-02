import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.128:5000/api/v1/templates';

export const fetchJobTemplates = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data; 
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  };