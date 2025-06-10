import api from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/api/types";
import { toast } from "react-toastify";

import { commonResponseWithError } from "../constants";
import {
  GetQualificationsResponse,
  GetStreamsPayloadType,
  UserDetailsDataType,
} from "./type";
import { errorMessages } from "@/constants/messages/error";

export const userService = {
  /**
   * Signup a user
   * @param {string} authToken
   * @returns {Promise<Response>}
   */
  getUserDetails: async () => {
    try {
      const response: ApiResponse<UserDetailsDataType> = await api.get(
        API_ENDPOINTS.GET_USER_DETAILS,
      );

      return response.data;
    } catch {
      /*
        If this is reached, means it can be one of the following reasons:
        1. timeout of 10000 is reached by api
        2. TODO: Add one if you find any
      */

      toast.error(errorMessages.common.somethingWentWrong);

      throw new Error(errorMessages.common.somethingWentWrong);
    }
  },

  getAllQualifications: async () => {
    try {
      const response: ApiResponse<GetQualificationsResponse> = await api.get(
        API_ENDPOINTS.QUALIFICATIONS,
      );

      return response;
    } catch (error) {
      /*
        If this is reached, means it can be one of the following reasons:
        1. timeout of 10000 is reached by api
        2. TODO: Add one if you find any
      */

      toast.error(errorMessages.common.somethingWentWrong);

      return commonResponseWithError;
    }
  },

  getAllStreams: async (payload: GetStreamsPayloadType) => {
    try {
      const response: ApiResponse = await api.get(API_ENDPOINTS.STREAMS, {
        params: payload,
      });
      const { message, hasError } = response;
      return response;
    } catch (error) {
      /*
        If this is reached, means it can be one of the following reasons:
        1. timeout of 10000 is reached by api
        2. TODO: Add one if you find any
      */

      toast.error(errorMessages.common.somethingWentWrong);

      return commonResponseWithError;
    }
  },
};
