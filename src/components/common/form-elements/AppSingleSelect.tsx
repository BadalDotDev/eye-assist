import { noop } from "@/types/CommonTypes";
import {
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

type OptionsType = {
  label: string;
  value: string;
};

interface Props {
  value: string;
  options: OptionsType[];
  onChangeHandler: noop;
  placeholder?: string;
}

const AppSingleSelect = ({
  value,
  options,
  onChangeHandler,
  placeholder = "Select",
}: Props) => {
  return (
    <Select
      displayEmpty
      value={value}
      onChange={onChangeHandler}
      input={<StyledSelectField />}
      renderValue={(selectedValue) => {
        if (selectedValue) {
          const selectedOption = options.find(
            (option) => option.value === selectedValue,
          );
          return selectedOption ? selectedOption.label : selectedValue;
        } else {
          return <StyledPlaceholder>{placeholder}</StyledPlaceholder>;
        }
      }}
      inputProps={{ "aria-label": "Without label" }}
      fullWidth
    >
      {options.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default AppSingleSelect;

const StyledSelectField = styled(OutlinedInput)({
  "& .MuiOutlinedInput-input": {
    padding: "5px 10px",
  },
});

const StyledPlaceholder = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));
