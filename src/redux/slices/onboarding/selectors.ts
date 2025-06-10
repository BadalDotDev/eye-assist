import { RootState } from "@/redux/store";

export const selectCurrentStep = (state: RootState) =>
  state.onboarding.currentStep;

export const selectStepComplete = (state: RootState) =>
  state.onboarding.stepCompleted;

export const selectIsOnboarding = (state: RootState) =>
  state.onboarding.isLoading;
