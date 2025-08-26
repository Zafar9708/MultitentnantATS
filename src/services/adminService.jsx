// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1';

// const getToken = () => localStorage.getItem('token');

// // Get all recruiters
// const getRecruiters = async () => {
//   const response = await axios.get(`${API_URL}/admin/recruiters`, {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   });
//   return response.data;
// };

// // Add recruiter
// const addRecruiter = async (data) => {
//   const response = await axios.post(`${API_URL}/admin/recruiters`, data, {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   });
//   return response.data;
// };

// // Edit recruiter
// const updateRecruiter = async (id, data) => {
//   const response = await axios.put(`${API_URL}/admin/recruiters/${id}`, data, {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   });
//   return response.data;
// };

// // Delete recruiter
// const deleteRecruiter = async (id) => {
//   const response = await axios.delete(`${API_URL}/admin/recruiters/${id}`, {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   });
//   return response.data;
// };

// // Get all jobs with recruiter names
// const getAllJobs = async () => {
//   const response = await axios.get(`${API_URL}/job`, {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   });
//   return response.data;
// };



// export default {
//   getRecruiters,
//   addRecruiter,
//   updateRecruiter,
//   deleteRecruiter,
//   getAllJobs,
// };
//-------

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const getToken = () => localStorage.getItem('token');

// Get all recruiters
const getRecruiters = async () => {
  const response = await axios.get(`${API_URL}/admin/recruiters`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Add recruiter
const addRecruiter = async (data) => {
  const response = await axios.post(`${API_URL}/admin/recruiters`, data, {
    headers: { 
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    },
  });
  return response.data;
};

// Edit recruiter
const updateRecruiter = async (id, data) => {
  const response = await axios.put(`${API_URL}/admin/recruiters/${id}`, data, {
    headers: { 
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    },
  });
  return response.data;
};

// Delete recruiter
const deleteRecruiter = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/recruiters/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Get all jobs with recruiter names
const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/job`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Send welcome email to recruiter
const sendWelcomeEmail = async (recruiterId) => {
  const response = await axios.post(`${API_URL}/admin/send-welcome-email/${recruiterId}`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};


// resendWelcomeEmail: (id) => api.post(`/admin/recruiters/${id}/resend-welcome`),
const resendWelcomeEmail=async (id)=>{
    const response = await axios.post(`${API_URL}/admin/recruiters/${id}/resend-welcome`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
}


export default {
  getRecruiters,
  addRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getAllJobs,
  sendWelcomeEmail,
  resendWelcomeEmail
};