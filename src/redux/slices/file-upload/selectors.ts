import { RootState } from "@/redux/store";

export const selectCurrentImage = (state: RootState) =>
  state.singleFileUpload.currentImage;

export const selectUploadedFile = (state: RootState) =>
  state.singleFileUpload.uploadedFile;

export const selectUploadedFileDetails = (state: RootState) =>
  state.singleFileUpload.details;
