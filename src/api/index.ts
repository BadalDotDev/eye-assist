import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,

  // Timeout is essential for errors to fail gracefully
  // Currently commented the timeout as the BE is on render and sometimes the responses are delayed
  // TODO: Uncomment if the BE migrates, maybe someday

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

    // If unauthorized, bad request or server error, show error toast
    // Bad request includes: Incorrect creds, validation errors, ..etc
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
