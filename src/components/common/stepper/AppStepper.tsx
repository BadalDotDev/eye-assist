import React from "react";
import Step from "@mui/material/Step";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  StepIconWrapper,
  StyledStepAndConnectorContainer,
  StyledStepLabel,
  StyledStepper,
} from "./styles";
import { IconPropType } from "./types";
import StyledStepIcon from "./StyledStepIcon";

interface Props {
  steps: { value: number; label: string }[];
  stepIcons: IconPropType;
  activeStep: number;
}

const AppStepper = ({ steps, stepIcons, activeStep }: Props) => {
  return (
    <StyledStepper
      alternativeLabel
      activeStep={activeStep - 1}
      connector={null}
    >
      {steps.map((step) => {
        const label = step.label;
        const index = step.value;
        return (
          <Step key={label}>
            <StyledStepAndConnectorContainer>
              <StyledStepLabel
                StepIconComponent={(props) => (
                  <StyledStepIcon stepIconProps={props} stepIcons={stepIcons} />
                )}
              >
                {label}
              </StyledStepLabel>
              {index !== steps.length && (
                <StepIconWrapper
                  ownerState={{
                    active: activeStep === index,
                    completed: activeStep > index,
                  }}
                >
                  <KeyboardDoubleArrowRightIcon />
                </StepIconWrapper>
              )}
            </StyledStepAndConnectorContainer>
          </Step>
        );
      })}
    </StyledStepper>
  );
};

export default AppStepper;
