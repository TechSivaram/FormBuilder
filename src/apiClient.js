import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR: Automatically attach JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Or use a secure cookie/state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Handle Token Expiration (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logic for Logout or Refresh Token
      console.warn("Unauthorized! Redirecting to login...");
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;