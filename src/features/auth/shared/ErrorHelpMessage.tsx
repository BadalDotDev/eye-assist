import React from "react";
import { Box } from "@mui/material";
import { flexRow, StyledErrorMessage, StyledHelpIcon } from "../styles";

const ErrorHelpMessage = ({ message }: { message: string }) => {
  return (
    <Box sx={flexRow}>
      <StyledHelpIcon />
      <StyledErrorMessage>{message}</StyledErrorMessage>
    </Box>
  );
};

export default ErrorHelpMessage;
