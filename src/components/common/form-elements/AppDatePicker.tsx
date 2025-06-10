import { Box } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import AppTextField from "./AppTextField";

interface Props {
  selectedDate: Date;
  placeholderText: string;
  onChangeHandler: (date: Date) => void;
  maxDate?: Date;
}

const AppDatePicker = ({
  selectedDate,
  onChangeHandler,
  maxDate,
  placeholderText = "Select",
}: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DatePicker
        id="basic-input"
        selected={selectedDate}
        placeholderText={placeholderText}
        onChange={(date: Date | null) => {
          onChangeHandler(date);
        }}
        customInput={<AppTextField fullWidth />}
        maxDate={maxDate}
        dateFormat="yyyy-MM-dd"
      />
    </Box>
  );
};

export default AppDatePicker;
