import { FormLabel, styled } from "@mui/material";
import React, { FC } from "react";

const AppFormLabel: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledFormLabel>{children}</StyledFormLabel>;
};

export default AppFormLabel;

export const StyledFormLabel = styled(FormLabel)({
  fontSize: "14px",
  fontWeight: "500",
});
