"use client";

import AppDatePicker from "@/components/common/form-elements/AppDatePicker";
import AppFormLabel from "@/components/common/form-elements/AppFormLabel";
import AppSingleSelect from "@/components/common/form-elements/AppSingleSelect";
import AppTextField from "@/components/common/form-elements/AppTextField";
import { Box } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Step1FormFields } from "./Step1";
import { genderOptions, languageOptions } from "../constants";
import AppPhoneNumberInput from "@/components/common/form-elements/AppPhoneNumberInput";
import ErrorHelpMessage from "@/components/common/form-elements/ErrorHelpMessage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  QualificationsListType,
  RoleType,
  StreamsListType,
} from "@/services/user/type";
import { getAllStreamsAPI } from "@/redux/slices/user/userSlice";

type FieldNames =
  | "dob"
  | "age"
  | "gender"
  | "country"
  | "mobileNumber"
  | "highestQualificationId"
  | "streamId"
  | "preferredLanguage"
  | "aboutMe";

interface Props {
  label: string;
  fieldName: FieldNames;
  control: Control;
  errors: FieldErrors<Step1FormFields>;
}

const RenderField = ({ label, fieldName, control, errors }: Props) => {
  const qualificationOptionsList: QualificationsListType[] | [] =
    useAppSelector((state) => state.user.qualificationList);

  const streamsOptionsList: StreamsListType[] | [] = useAppSelector(
    (state) => state.user.streamsList,
  );

  const role: RoleType = useAppSelector((state) => state.user.role);

  const dispatch = useAppDispatch();

  const renderInputFields = () => {
    switch (fieldName) {
      case "dob":
        return (
          <Controller
            control={control}
            name="dob"
            render={({ field }) => {
              const today = format(new Date(), "yyyy-MM-dd");

              return (
                <AppDatePicker
                  selectedDate={field.value}
                  onChangeHandler={(date) => {
                    field.onChange(date);
                  }}
                  placeholderText={`Select or type as ${today}`}
                  maxDate={new Date()}
                />
              );
            }}
          />
        );
      case "age":
        return (
          <Controller
            control={control}
            name="age"
            render={({ field }) => {
              const { value, onChange } = field;

              return (
                <AppTextField
                  type="number"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Enter your age b/w 10 - 30"
                  fullWidth
                />
              );
            }}
          />
        );

      case "gender":
        return (
          <Box>
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              render={({ field }) => {
                const { value, onChange } = field;
                return (
                  <AppSingleSelect
                    value={value}
                    options={genderOptions}
                    onChangeHandler={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="Select"
                  />
                );
              }}
            />
          </Box>
        );

      case "mobileNumber":
        return (
          <Controller
            control={control}
            name="mobileNumber"
            defaultValue={""}
            render={({ field }) => {
              const { value, onChange } = field;

              return (
                <AppPhoneNumberInput
                  value={value}
                  onChangeHandler={(value) => {
                    onChange(value);
                  }}
                  placeholder="Select"
                  countryCode={"in"}
                />
              );
            }}
          />
        );

      case "highestQualificationId":
        return (
          <Box>
            <Controller
              control={control}
              name="highestQualificationId"
              defaultValue=""
              render={({ field }) => {
                const { value, onChange } = field;
                return (
                  <AppSingleSelect
                    value={value}
                    options={qualificationOptionsList}
                    onChangeHandler={(e) => {
                      onChange(e.target.value);
                      dispatch(
                        getAllStreamsAPI({
                          qualificationId: e.target.value,
                          role,
                        }),
                      );
                    }}
                    placeholder="Select"
                  />
                );
              }}
            />
          </Box>
        );

      case "streamId":
        return (
          <Controller
            control={control}
            name="streamId"
            defaultValue=""
            render={({ field }) => {
              const { value, onChange } = field;
              return (
                <AppSingleSelect
                  value={value}
                  options={streamsOptionsList}
                  onChangeHandler={(e) => {
                    onChange(e.target.value);
                  }}
                  placeholder="Select"
                />
              );
            }}
          />
        );

      case "preferredLanguage":
        return (
          <Box>
            <Controller
              control={control}
              name="preferredLanguage"
              defaultValue=""
              render={({ field }) => {
                const { value, onChange } = field;
                return (
                  <AppSingleSelect
                    value={value}
                    options={languageOptions}
                    onChangeHandler={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="Select"
                  />
                );
              }}
            />
          </Box>
        );

      case "aboutMe":
        return (
          <Controller
            control={control}
            name="aboutMe"
            render={({ field }) => {
              const { value, onChange } = field;

              return (
                <AppTextField
                  type="textarea"
                  multiline
                  minRows={2}
                  maxRows={4}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Write about you..."
                  fullWidth
                />
              );
            }}
          />
        );
    }
  };

  return (
    <>
      <AppFormLabel>{label}</AppFormLabel>
      {renderInputFields()}
      {errors && errors[fieldName]?.message && (
        <ErrorHelpMessage message={errors[fieldName]?.message as string} />
      )}
    </>
  );
};

export default RenderField;
