import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/job';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const createJob = async (jobData) => {
  try {
    // Pass jobData in POST body, and attach Authorization headers
    const response = await axios.post(API_BASE_URL, jobData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create job');
  }
};


