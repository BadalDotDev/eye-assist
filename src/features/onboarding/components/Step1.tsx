import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { StepContainer } from "../styles";
import RenderField from "./RenderField";

export interface Step1FormFields {
  dob?: Date;
  age?: number;
  gender?: string;
  country?: string;
  mobileNumber?: string;
  aboutMe?: string;
}

interface Props {
  control: Control;
  watch: UseFormWatch<Step1FormFields>;
  errors: FieldErrors<Step1FormFields>;
}

const Step1 = ({ control, watch, errors }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StepContainer>
      <Grid2 container spacing={2}>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="DOB"
            fieldName={"dob"}
            control={control}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="Age"
            fieldName={"age"}
            control={control}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="Gender"
            fieldName={"gender"}
            control={control}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="Mobile Number"
            fieldName={"mobileNumber"}
            control={control}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={12}>
          <RenderField
            label="About Me"
            fieldName="aboutMe"
            control={control}
            errors={errors}
          />
        </Grid2>
      </Grid2>
    </StepContainer>
  );
};

export default Step1;
