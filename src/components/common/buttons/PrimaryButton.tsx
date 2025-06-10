import { noop } from "@/types/CommonTypes";
import { Button } from "@mui/material";
import React from "react";

type ButtonVariant = "contained" | "outlined" | "text";
type ButtonType = "button" | "submit" | "reset" | undefined;

interface Props {
  label: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: noop;
  loading?: boolean;
  styles?: { [key: string]: string };
}

const PrimaryButton = ({
  label,
  onClick = () => {},
  variant = "contained",
  type = "button",
  disabled = false,
  loading= false,
  styles = {},
}: Props) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      loading={loading}
      sx={{ ...styles, ...customStyles }}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;

const customStyles = {
  height: "36px",
};
