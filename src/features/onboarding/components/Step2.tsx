import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StepContainer } from "../styles";
import RenderField from "./RenderField";
import { useAppDispatch } from "@/redux/store";
import { getAllQualificationsAPI } from "@/redux/slices/user/userSlice";

export interface Step2FormFields {
  highestQualification: string;
  stream: string;
  languageSpoken: string;
}

interface Props {
  control: Control;
  errors: FieldErrors<Step2FormFields>;
}

const Step2 = ({ control, errors }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchQualifications = async () => {
    await dispatch(getAllQualificationsAPI());
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  return (
    <StepContainer>
      <Grid2 container spacing={2}>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="Highest Qualification"
            fieldName={"highestQualificationId"}
            control={control}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="Stream"
            fieldName={"streamId"}
            control={control}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <RenderField
            label="Language Spoken"
            fieldName={"preferredLanguage"}
            control={control}
            errors={errors}
          />
        </Grid2>
      </Grid2>
    </StepContainer>
  );
};

export default Step2;
