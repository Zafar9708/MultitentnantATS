// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/v1/job';

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
// };

// export const createJob = async (jobData) => {
//   try {
//     // Pass jobData in POST body, and attach Authorization headers
//     const response = await axios.post(API_BASE_URL, jobData, getAuthHeaders());
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to create job');
//   }
// };

// services/Jobs/jobCreationService.js
import axios from 'axios';

const API_URL =  'http://localhost:5000/api';

export const createJob = async (jobData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/jobs`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/jobs/${id}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchJobDetails = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};