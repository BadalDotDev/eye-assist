import { styled, TextField, TextFieldProps } from "@mui/material";
import React from "react";

const AppTextField = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default AppTextField;

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    padding: "5px 10px",
  },
});
