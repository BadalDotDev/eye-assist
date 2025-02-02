import React from "react";
import { Button, CircularProgress, styled } from "@mui/material";

interface Props {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  variant?: "outlined" | "text" | "contained";
  onClick?: () => void;
  disabled: boolean;
}

const AuthBtn = ({
  label,
  type,
  onClick,
  disabled,
  variant = "outlined",
}: Props) => {
  return (
    <StyledButton
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
      endIcon={disabled && <CircularProgress sx={endIconStyles} size={20} />}
      fullWidth
    >
      {label}
    </StyledButton>
  );
};

export default AuthBtn;

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  fontWeight: "700",
  fontSize: "14px",
}));

const endIconStyles = {
  color: "#fff",
};
