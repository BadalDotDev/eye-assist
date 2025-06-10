import { ApiResponse } from "@/api/types";
import { errorMessages } from "@/constants/messages/error";

export const commonResponseWithError: ApiResponse = {
  data: null,
  status: 400,
  message: errorMessages.common.somethingWentWrong,
  hasError: true,
};
