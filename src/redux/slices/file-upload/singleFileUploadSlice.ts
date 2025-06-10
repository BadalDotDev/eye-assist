import { fileUploadService } from "@/services/file-upload/fileUploadService";
import {
  CurrentImageType,
  FileUploadPayloadType,
  FileUploadResponseType,
  UploadedFileType,
} from "@/services/file-upload/type";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const singleFileUpload = createAsyncThunk(
  "file-upload/single",
  async (payload: FileUploadPayloadType, { rejectWithValue }) => {
    try {
      const res = await fileUploadService.singleFileUpload(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);

interface SingleFileUploadState {
  isLoading: boolean;
  currentImage: CurrentImageType | null;
  uploadedFile: UploadedFileType | null;
  details: FileUploadResponseType | null;
}

const initialState: SingleFileUploadState = {
  isLoading: false,
  currentImage: null,
  uploadedFile: null,
  details: null,
};

const singleFileUploadSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentImage: (
      state,
      { payload }: PayloadAction<{ newImage: CurrentImageType }>,
    ) => {
      state.currentImage = payload.newImage;
    },
    setUploadedFile: (
      state,
      { payload }: PayloadAction<{ newFileUploaded: UploadedFileType }>,
    ) => {
      state.uploadedFile = payload.newFileUploaded;
    },
    resetUploadedFileDetails: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(singleFileUpload.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(singleFileUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload.data;
      });
  },
});

export const { setCurrentImage, setUploadedFile } =
  singleFileUploadSlice.actions;

export const singleFileUploadReducer = singleFileUploadSlice.reducer;
