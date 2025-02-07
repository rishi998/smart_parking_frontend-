import axios from "axios";

/**
 * Create a custom axios instance with default configuration
 * This instance can be imported and used throughout the application
 */
const axiosInstance = axios.create({
  // Base URL for all requests
  BASE_URL: 'http://localhost:5001',
  // Request timeout in milliseconds
  timeout: 10000,
  // Default headers
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * Request interceptor
 * Automatically adds the authentication token to all requests if available
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("token");
    
    // If token exists, add it to the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;