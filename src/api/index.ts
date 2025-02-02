import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Fetch token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error), // Handle request errors
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return {
      ...response.data,
      hasError: false,
    };
  },
  (error) => {
    const { status, message } = error.response.data;

    if (status === 401 || status === 400 || status === 500) {
      toast.error(message);
    }

    return {
      ...error.response.data,
      hasError: true,
    };
  },
);

export default api;
