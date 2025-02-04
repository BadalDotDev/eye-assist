import { ApiResponse } from "@/api/types";
import { ToastMessages } from "@/constants/Toasts";

export const commonResponseWithError: ApiResponse = {
  data: null,
  status: 400,
  message: ToastMessages.common.error.SomethingWentWrong,
  hasError: true,
};
