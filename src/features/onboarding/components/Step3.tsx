import AppFormLabel from "@/components/common/form-elements/AppFormLabel";
import { Grid2 } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { StepContainer } from "../styles";
import { useAppSelector } from "@/redux/store";
import { selectRole } from "@/redux/slices/user/selectors";
import ImageUpload from "@/components/common/file-uploads/ImageUpload";
import { ASPECT_RATIO } from "@/constants/images";
import { UserRoleEnum } from "@/features/auth/type";
import { CERTIFICATE_LABELS } from "../constants";

interface Props {
  control: Control;
}

const Step3 = ({ control }: Props) => {
  const userRole = useAppSelector(selectRole);

  const label =
    userRole === UserRoleEnum.Student
      ? CERTIFICATE_LABELS.student
      : CERTIFICATE_LABELS.scribe;

  return (
    <StepContainer>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <AppFormLabel>{userRole ? label : "Certificate"}</AppFormLabel>
          <Controller
            control={control}
            name="certificateId"
            render={({ field }) => {
              return <ImageUpload aspectRatio={ASPECT_RATIO.CERTIFICATE} />;
            }}
          />
        </Grid2>
      </Grid2>
    </StepContainer>
  );
};

export default Step3;
