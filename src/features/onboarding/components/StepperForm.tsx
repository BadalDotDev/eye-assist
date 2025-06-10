"use client";

import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step2 from "./Step2";
import { stepperSchema } from "../utils/schema";
import {
  BackAndNextBtnContainer,
  SkipBtnContainer,
  StepperFormContainer,
  StyledLabel,
  StyledLabelContainer,
  StyledSubLabel,
} from "../styles";
import { stepperDefaultValues, stepperFormLabels } from "../constants";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { onboardUser } from "@/redux/slices/onboarding/onboardingSlice";
import { format } from "date-fns";
import { compareAndGetChangedFields } from "../utils/compareAndGetChangedFields.ts";
import { selectUserData } from "@/redux/slices/user/selectors";
import { selectIsOnboarding } from "@/redux/slices/onboarding/selectors";
import { UploadedFileType } from "@/services/file-upload/type";
import { singleFileUpload } from "@/redux/slices/file-upload/singleFileUploadSlice";
import { MEDIA_TYPE } from "@/constants/images";
import { selectUploadedFile } from "@/redux/slices/file-upload/selectors";
import { unwrapResult } from "@reduxjs/toolkit";

interface Props {
  steps: { value: number; label: string }[];
  activeStep: number;
  handleStepChange: (newStep: number) => void;
}

const StepperForm = ({ steps, activeStep, handleStepChange }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(selectUserData);
  const isOnboarding = useAppSelector(selectIsOnboarding);
  const uploadedFile = useAppSelector(selectUploadedFile);

  const methods = useForm({
    resolver: yupResolver(stepperSchema),
    defaultValues: { ...stepperDefaultValues },
  });
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (!userDetails) return;
    reset({
      dob: userDetails?.dob ? new Date(userDetails?.dob) : null,
      age: userDetails?.age ?? undefined,
      gender: userDetails?.gender ?? undefined,
      mobileNumber: userDetails?.mobileNumber ?? undefined,
      highestQualificationId: userDetails?.highestQualificationId ?? undefined,
      streamId: userDetails?.streamId ?? undefined,
      preferredLanguage: userDetails?.preferredLanguage ?? undefined,
      aboutMe: userDetails?.aboutMe ?? undefined,
      certificateId: userDetails?.certificateId ?? undefined,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, methods]);

  const uploadCeritificateAPICall = async (file: UploadedFileType) => {
    const result = await dispatch(
      singleFileUpload({
        file: file.file,
        mediaType: MEDIA_TYPE.IMAGE,
      }),
    );
    return unwrapResult(result);
  };

  const onboardUserAPICall = async (formData) => {
    const formattedDob = format(formData.dob, "yyyy-MM-dd");

    const cleanedForm = {
      dob: formattedDob,
      age: formData.age,
      gender: formData.gender,
      mobileNumber: formData.mobileNumber,
      highestQualificationId: formData.highestQualificationId,
      streamId: formData.streamId,
      preferredLanguage: formData.preferredLanguage,
      aboutMe: formData.aboutMe,
      certificateId: formData.certificateId,
    };

    const step1CleanedUser = {
      dob: userDetails?.dob,
      age: userDetails?.age,
      gender: userDetails?.gender,
      mobileNumber: userDetails?.mobileNumber,
      aboutMe: userDetails?.aboutMe,
    };

    const step2CleanedUser = {
      highestQualificationId: userDetails?.highestQualificationId,
      streamId: userDetails?.streamId,
      preferredLanguage: userDetails?.preferredLanguage,
    };

    const step3CleanedUser = {
      certificateId: userDetails?.certificateId,
    };

    const stepCleanedUserMap = {
      1: step1CleanedUser,
      2: step2CleanedUser,
      3: step3CleanedUser,
    };

    const comparableCleanedUser = stepCleanedUserMap[activeStep];

    const changedFields = compareAndGetChangedFields(
      cleanedForm,
      comparableCleanedUser,
    );

    const commonFieldsToSend = {
      isPageSkipped: false,
      stepComplete: activeStep,
    };

    const payload = {
      ...changedFields,
      ...commonFieldsToSend,
    };

    if (activeStep === 3) {
      const res = await uploadCeritificateAPICall(uploadedFile);
      if (res && res.data.id) {
        const certificateId = res.data.id;
        reset({
          ...formData,
          certificateId: certificateId,
        });
        await dispatch(
          onboardUser({
            ...commonFieldsToSend,
            certificateId: certificateId,
          }),
        );
      }
    } else {
      await dispatch(onboardUser(payload));
    }

    if (activeStep > 0 && activeStep < steps.length) {
      const nextStep = activeStep + 1;
      handleStepChange(nextStep);
    }

    // Fetch the user details with the latest data
    // getUserDetailsAPICall();
  };

  const handleSkip = () => {
    dispatch(
      onboardUser({
        isPageSkipped: true,
        stepComplete: activeStep,
      }),
    );
    handleStepChange(activeStep + 1);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    const prevStep = Math.max(activeStep - 1, 1);
    handleStepChange(prevStep);
  };

  const StepContent = () => {
    switch (activeStep) {
      case 1:
        return <Step1 control={control} errors={errors} />;

      case 2:
        return <Step2 control={control} errors={errors} />;

      case 3:
        return <Step3 control={control} />;

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <StepperFormContainer onSubmit={handleSubmit(onboardUserAPICall)}>
        <SkipBtnContainer>
          <StyledLabelContainer>
            <StyledLabel>{stepperFormLabels[activeStep].label}</StyledLabel>
            <StyledSubLabel>
              {stepperFormLabels[activeStep].subLabel}
            </StyledSubLabel>
          </StyledLabelContainer>
          <PrimaryButton
            label="Skip"
            loading={isOnboarding}
            onClick={handleSkip}
            variant="outlined"
            disabled={activeStep === steps.length}
            styles={{
              color: theme.palette.primary.main,
              fontWeight: "500",
            }}
          />
        </SkipBtnContainer>

        {StepContent()}
        <BackAndNextBtnContainer>
          <PrimaryButton
            label={"Back"}
            onClick={handleBack}
            disabled={activeStep === 1}
          />
          <PrimaryButton
            label={activeStep === 3 ? "Submit" : "Next"}
            type="submit"
            loading={isOnboarding}
          />
        </BackAndNextBtnContainer>
      </StepperFormContainer>
    </FormProvider>
  );
};

export default StepperForm;
