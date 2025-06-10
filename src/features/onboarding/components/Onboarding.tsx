"use client";

import React, { useEffect } from "react";
import { Divider, Grid2, useMediaQuery, useTheme } from "@mui/material";
import AppStepper from "@/components/common/stepper/AppStepper";
import StepperForm from "./StepperForm";
import BannerImage from "@/assets/OnboardingLeftSideImage.png";
import {
  BannerAndLogoWithText,
  BannerContainer,
  LeftSideImage,
  OnboardingContainer,
  StepperAndFormContainer,
} from "../styles";
import LogoWithText from "@/components/common/LogoWithText";
import { logoWithText } from "@/features/auth/styles";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllStreamsAPI,
  getUserDetails,
} from "@/redux/slices/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCurrentStep } from "@/redux/slices/onboarding/onboardingSlice";
import { steps } from "../constants";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { setAppLoading } from "@/redux/slices/ui/uiSlice";
import { selectUserData } from "@/redux/slices/user/selectors";
import { selectCurrentStep } from "@/redux/slices/onboarding/selectors";

export const stepIcons: { [index: string]: React.ReactElement<unknown> } = {
  1: <GroupAddIcon />,
  2: <AutoStoriesIcon />,
  3: <VideoLabelIcon />,
};

const Onboarding = () => {
  const theme = useTheme();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const currentStep = useAppSelector(selectCurrentStep);
  const userDetails = useAppSelector(selectUserData);

  const queryStep = Number(searchParams.get("step"));

  const handleStepChange = (newStep: number) => {
    if (newStep < 0 && newStep === currentStep && newStep > steps.length)
      return;
    dispatch(setCurrentStep({ newStep }));
    router.replace(`/onboarding?step=${newStep}`, { scroll: false });
  };

  const getUserDetailsAPICall = async () => {
    const response = await dispatch(getUserDetails());
    const res = unwrapResult(response);
    if (res) {
      const newStep = currentStep + 1;
      handleStepChange(newStep);

      if (res?.highestQualificationId) {
        await dispatch(
          getAllStreamsAPI({
            qualificationId: res.highestQualificationId,
            role: res.role,
          }),
        );
      }
    }
    dispatch(setAppLoading(false));
  };

  useEffect(() => {
    getUserDetailsAPICall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When user change the step from search bar
  useEffect(() => {
    const isParamStepValid =
      queryStep > 0 && queryStep <= steps.length && queryStep != currentStep;

    // Prevent from exceeding the completed step
    const isExceedingCompletedStep = queryStep > userDetails?.stepComplete;

    if (isParamStepValid && !isExceedingCompletedStep)
      handleStepChange(queryStep);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStep]);

  return (
    <OnboardingContainer container>
      {isSmallScreen ? null : (
        <BannerAndLogoWithText size={isSmallScreen ? 0 : 4}>
          <LogoWithText styles={logoWithText} />
          <BannerContainer>
            <LeftSideImage src={BannerImage} alt="Banner image" />
          </BannerContainer>
        </BannerAndLogoWithText>
      )}
      <Grid2 size={1} />

      <StepperAndFormContainer size={isSmallScreen ? 10 : 6}>
        <AppStepper
          steps={steps}
          stepIcons={stepIcons}
          activeStep={currentStep}
        />
        <Divider />
        <StepperForm
          steps={steps}
          activeStep={currentStep}
          handleStepChange={handleStepChange}
        />
      </StepperAndFormContainer>

      <Grid2 size={1} />
    </OnboardingContainer>
  );
};

export default Onboarding;
