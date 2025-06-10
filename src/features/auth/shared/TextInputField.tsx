"use client"
import React from "react";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { fieldsMap, placeholderList } from "../utils/utils";
import {
  StyledFormLabel,
  StyledTextfieldInput,
  TextfieldInputContainer,
} from "../styles";
import ErrorHelpMessage from "@/components/common/form-elements/ErrorHelpMessage";

const InputField = ({
  field,
  errors,
}: {
  // TODO: Type safe the field with specific type
  field: ControllerRenderProps<any>;
  errors: FieldErrors;
}) => {
  return (
    <TextfieldInputContainer>
      <StyledFormLabel>{fieldsMap[field.name]}</StyledFormLabel>
      <StyledTextfieldInput
        {...field}
        value={field.value}
        placeholder={placeholderList[field.name]}
        variant="outlined"
        fullWidth
        size="small"
        error={!!errors[field.name]}
        type={field.name.includes("password") ? "password" : "text"}
      />
      {errors && errors[field.name]?.message && (
        <ErrorHelpMessage message={errors[field.name]?.message as string} />
      )}
    </TextfieldInputContainer>
  );
};

export default InputField;
