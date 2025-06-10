import { getCookie, removeCookie } from "@/utils/cookieUtils";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,

  // Timeout is essential for errors to fail gracefully
  // Currently commented the timeout as the BE is on renderer and sometimes the responses are delayed
  // TODO: Uncomment if the BE migrates, maybe someday

  // timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach tokens
api.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return {
      ...response.data,
      hasError: false,
    };
  },
  async (error) => {
    const { status, message } = error.response.data;

    if ([401, 403, 400, 500].includes(status)) {
      toast.error(message);

      // Token expired
      if (status === 401 || (status === 403 && typeof window !== "undefined")) {
        removeCookie("authToken");
      }
    }

    return {
      ...error.response.data,
      hasError: true,
    };
  },
);

export default api;
