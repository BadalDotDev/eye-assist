import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { uiReducer } from "./slices/ui/uiSlice";
import { userReducer } from "./slices/user/userSlice";
import { authReducer } from "./slices/auth/authSlice";
import { onboardingReducer } from "./slices/onboarding/onboardingSlice";
import { singleFileUploadReducer } from "./slices/file-upload/singleFileUploadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    onboarding: onboardingReducer,
    singleFileUpload: singleFileUploadReducer,
    ui: uiReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector;
