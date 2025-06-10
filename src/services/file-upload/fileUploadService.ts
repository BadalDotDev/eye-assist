import api from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/api/types";
import { toast } from "react-toastify";
import { commonResponseWithError } from "../constants";
import { errorMessages } from "@/constants/messages/error";
import { FileUploadPayloadType, FileUploadResponseType } from "./type";

export const fileUploadService = {
  singleFileUpload: async (payload: FileUploadPayloadType) => {
    try {
      const formData = new FormData();
      formData.append("file", payload.file);
      formData.append("mediaType", payload.mediaType);

      if (payload.duration !== undefined) {
        formData.append("duration", payload.duration.toString());
      }

      const response: ApiResponse<FileUploadResponseType> = await api.post(
        API_ENDPOINTS.SINGLE_FILE_UPLOAD,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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
};
