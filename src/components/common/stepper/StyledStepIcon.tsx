import { StepIconProps } from "@mui/material";
import { StepIconRoot } from "./styles";
import { IconPropType } from "./types";
import React from "react";

interface Props {
  stepIconProps: StepIconProps;
  stepIcons: IconPropType;
}

const StyledStepIcon = ({ stepIconProps, stepIcons }: Props) => {
  const { active, completed, className } = stepIconProps;

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      {stepIcons[String(stepIconProps.icon)]}
    </StepIconRoot>
  );
};

export default StyledStepIcon;
