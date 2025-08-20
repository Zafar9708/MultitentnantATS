// // src/services/tenantService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1';

// const getTenants = async () => {
//   const token = localStorage.getItem('token');
//   const response = await axios.get(`${API_URL}/tenants`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   return response.data;
// };

// export default {
//   getTenants
// };

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/tenants';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export const getTenants = async () => {
  try {
    const response = await axios.get(API_BASE_URL, getAuthHeaders());
    return response.data.data.tenants;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tenants');
  }
};

export const createTenant = async (tenantData) => {
  try {
    const response = await axios.post(API_BASE_URL, tenantData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create tenant');
  }
};

export const updateTenantStatus = async (tenantId, isActive) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${tenantId}`,
      { isActive },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update tenant status');
  }
};

export const deleteTenant = async (tenantId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${tenantId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete tenant');
  }
};