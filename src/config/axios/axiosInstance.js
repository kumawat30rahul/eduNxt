import axios from "axios";

// Creating an Axios instance with default configurations
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding a request interceptor to handle Authorization tokens
axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = cookies.get('access_token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adding a response interceptor to handle successful and error responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
