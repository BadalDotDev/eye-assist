import api from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/api/types";
import { toast } from "react-toastify";

export interface SignupPayload {
  firstName: string;
  lastName?: string | undefined;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  token: string;
}

export const authService = {
  /**
   * Signup a user
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} confirmPassword
   * @param {string} role
   * @returns {Promise<Response>}
   */
  signup: async (payload: SignupPayload) => {
    try {
      const response: ApiResponse = await api.post(
        API_ENDPOINTS.SIGNUP,
        payload,
      );

      const { data, message, hasError } = response;

      // Error toasts are already handled in api utility
      if (!hasError) toast.success(message);

      return data;
    } catch {
      toast.error("Oops! Something went wrong.");
    }
  },

  /**
   * Login a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Response>}
   */
  login: async (payload: LoginPayload) => {
    const response = await api.post(API_ENDPOINTS.LOGIN, payload);

    return response.data;
  },

  /**
   * Verify the email of the user
   * @param {string} token
   * @returns {Promise<Response>}
   */
  verifyEmail: async (payload: VerifyEmailPayload) => {
    try {
      const response: ApiResponse = await api.post(
        API_ENDPOINTS["VERIFY-EMAIL"],
        payload,
      );

      const { data, message, hasError } = response;

      // Error toasts are already handled in api utility
      if (!hasError) toast.success(message);

      return data;
    } catch {
      toast.error("Oops! Something went wrong.");
    }
  },
};
