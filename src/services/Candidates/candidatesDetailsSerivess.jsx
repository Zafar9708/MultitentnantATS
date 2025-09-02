// // services/candidateService.js
// import axios from 'axios';

// const API_BASE_URL = 'http://192.168.0.128:5000/api/v1';

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Add token to requests
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const candidateService = {
//   getCandidate: (id) => {
//     return apiClient.get(`/candidates/${id}`);
//   },
//   createNote:(id)=>{
//     return apiClient.post(`/candidatesnotes/candidate/${id}`);

//   },
//   getNotes:(id)=>{
//     return apiClient.get(`/candidatesnotes/candidate/${id}`);
//   },

//   getStageHistory: (id) => {
//     return apiClient.get(`/candidates/${id}/stage-history`);
//   },

//   downloadResume: (id) => {
//     return apiClient.get(`/candidates/download-resume/${id}`, {
//       responseType: 'blob'
//     });
//   },

//   // Preview resume
//   previewResume: (id) => {
//     return apiClient.get(`/candidates/preview-resume/${id}`, {
//       responseType: 'blob'
//     });
//   },
  
// };

// export const externalServices = {
//   // External APIs (from your existing code)
//   getMessages: (id) => {
//     return axios.get(`https://hire-onboardbackend-production.up.railway.app/api/messages/${id}`);
//   },
  
//   getRemarks: (id) => {
//     return axios.get(`https://hire-onboardbackend-production.up.railway.app/api/candidate-comments/${id}`);
//   },
  
//   getNotes: (id) => {
//     return axios.get(`https://hire-onboardbackend-production.up.railway.app/api/candidate-notes/candidate/${id}`);
//   },
  
//   createNote: (noteData) => {
//     return axios.post(`https://hire-onboardbackend-production.up.railway.app/api/candidate-notes`, noteData);
//   },
  
//   updateNote: ({ id, noteData }) => {
//     return axios.put(`https://hire-onboardbackend-production.up.railway.app/api/candidate-notes/${id}`, noteData);
//   },
  
//   deleteNote: (id) => {
//     return axios.delete(`https://hire-onboardbackend-production.up.railway.app/api/candidate-notes/${id}`);
//   },
  
//   getFeedback: (id) => {
//     return axios.get(`https://hire-onboardbackend-production.up.railway.app/api/feedback/candidate/${id}`);
//   },
// };

// services/candidateService.js
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.128:5000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const candidateService = {
  // Get candidate by ID
  getCandidate: (id) => {
    return apiClient.get(`/candidates/${id}`);
  },

  // Get candidate stage history
  getStageHistory: (id) => {
    return apiClient.get(`/candidates/${id}/stage-history`);
  },

  // Download resume
  downloadResume: (id) => {
    return apiClient.get(`/candidates/download-resume/${id}`, {
      responseType: 'blob'
    });
  },

  // Preview resume
  previewResume: (id) => {
    return apiClient.get(`/candidates/preview-resume/${id}`, {
      responseType: 'blob'
    });
  },

  // Get candidate notes
  getNotes: (id) => {
    return apiClient.get(`/candidatesnotes/candidate/${id}`);
  },

  // Create candidate note
  createNote: (noteData) => {
    return apiClient.post(`/candidatesnotes`, noteData);
  },

  // Update candidate note
  updateNote: (id, noteData) => {
    return apiClient.put(`/candidatesnotes/${id}`, noteData);
  },

  // Delete candidate note
  deleteNote: (id) => {
    return apiClient.delete(`/candidatesnotes/${id}`);
  },
};

export const externalServices = {
  // External APIs (from your existing code)
  getMessages: (id) => {
    return axios.get(`https://hire-onboardbackend-production.up.railway.app/api/messages/${id}`);
  },
  
  getRemarks: (id) => {
    return axios.get(`https://hire-onboardbackend-production.up.railway.app/api/candidate-comments/${id}`);
  },
  
  getFeedback: (id) => {
    return axios.get(`http://192.168.0.128:5000/api/v1/interviews/candidate/${id}/feedback`);
  },
};