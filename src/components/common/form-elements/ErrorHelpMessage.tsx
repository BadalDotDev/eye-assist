import React from "react";
import {
  StyledErrorContainer,
  StyledErrorMessage,
  StyledHelpIcon,
} from "./styles";

const ErrorHelpMessage = ({ message }: { message: string }) => {
  return (
    <StyledErrorContainer>
      <StyledHelpIcon />
      <StyledErrorMessage>{message}</StyledErrorMessage>
    </StyledErrorContainer>
  );
};

export default ErrorHelpMessage;
