import { onboardingService } from "@/services/onboarding/onboardingService";
import { OnboardUserPayloadType } from "@/services/onboarding/type";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const onboardUser = createAsyncThunk(
  "onboarding/onboardUser",
  async (payload: OnboardUserPayloadType, { rejectWithValue }) => {
    try {
      const res = await onboardingService.onboardUser(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);

interface OnboardingState {
  isLoading: boolean;
  currentStep: number;
  stepCompleted: number;
}

const initialState: OnboardingState = {
  isLoading: false,
  currentStep: 1,
  stepCompleted: 0,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (
      state,
      { payload }: PayloadAction<{ newStep: number }>,
    ) => {
      state.currentStep = payload.newStep;
    },
    setCompletedStep: (
      state,
      {
        payload,
      }: PayloadAction<{
        step: number;
      }>,
    ) => {
      state.stepCompleted = payload.step;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onboardUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(onboardUser.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCurrentStep } = onboardingSlice.actions;

export const onboardingReducer = onboardingSlice.reducer;
