"use client";
import React from "react";
import { FieldErrors } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { fieldsMap, placeholderList } from "../utils/utils";
import {
  PasswordInputContainer,
  StyledFormLabel,
  StyledOutlinedInput,
} from "../styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorHelpMessage from "@/components/common/form-elements/ErrorHelpMessage";

const PasswordInputField = ({
  field,
  errors,
  showPassword,
  handleClickShowPassword,
}: {
  // TODO: Type safe the field with specific type
  field: any;
  errors: FieldErrors;
  showPassword: boolean;
  handleClickShowPassword: () => void;
}) => {
  return (
    <PasswordInputContainer>
      <StyledFormLabel>{fieldsMap[field.name]}</StyledFormLabel>
      <StyledOutlinedInput
        {...field}
        value={field.value}
        aria-label="password"
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
        error={!!errors[field.name]}
        placeholder={placeholderList.password}
      />
      {errors && errors[field.name]?.message && (
        <ErrorHelpMessage message={errors[field.name]?.message as string} />
      )}
    </PasswordInputContainer>
  );
};

export default PasswordInputField;
