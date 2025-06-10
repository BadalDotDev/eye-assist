import api from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/api/types";
import { toast } from "react-toastify";
import { commonResponseWithError } from "../constants";
import { OnboardUserPayloadType } from "./type";
import { errorMessages } from "@/constants/messages/error";

export const onboardingService = {
  /**
   * Onboard a user
   * @param {boolean} isPageSkipped
   * @param {number} stepComplete
   * @param {string} dob
   * @param {number} age
   * @param {string} gender
   * @param {string} country
   * @param {string} mobileNumber
   */
  onboardUser: async (payload: OnboardUserPayloadType) => {
    try {
      const response: ApiResponse = await api.post(
        API_ENDPOINTS.ONBOARD_USER,
        payload,
      );
      return response;
    } catch (error) {
      /*
        If this is reached, means it can be one of the following reasons:
        1. timeout of 10000 is reached by api
        2. TODO: Add one if you find any
      */
      console.error(error)
      toast.error(errorMessages.common.somethingWentWrong);

      return commonResponseWithError;
    }
  },
};
