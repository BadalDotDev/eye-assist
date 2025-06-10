import {
  authService,
  LoginPayload,
  SignupPayload,
} from "@/services/auth/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authService.signin(payload);

      const { data, status, hasError, message } = response;

      if (hasError && status !== 200) {
        return rejectWithValue(message);
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await authService.signin(payload);

      const { data, status, hasError } = response;

      if (hasError && status !== 200) {
        return;
      }

      return data;
    } catch (error) {
      // Reject with a specific error message
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  isLoading: false,
  authToken: null,
  isAuthenticated: false,
  onboardingStepCompleted: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.authToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setAuthToken, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
