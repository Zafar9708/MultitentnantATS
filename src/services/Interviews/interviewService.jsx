const API_BASE_URL = 'https://ab84e28a52f5.ngrok-free.app/api/v1/job';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};


export const fetchInterviewData = async () => {
  try {
    const [onlineInterviews, offlineInterviews, upcomingInterviews] = await Promise.all([
      axios.get(`${API_BASE_URL}/interviews/schedule`, getAuthHeaders()),
      axios.get(`${API_BASE_URL}/offline-interviews/get`, getAuthHeaders()),
      axios.get(`${API_BASE_URL}/interviews/upcoming`, getAuthHeaders())
    ]);

    return {
      online: onlineInterviews.data.count || 0,
      offline: offlineInterviews.data.data?.length || 0,
      upcoming: upcomingInterviews.data.count || 0,
      upcomingInterviews: upcomingInterviews.data.data || []
    };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};