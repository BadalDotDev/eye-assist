import { noop } from "@/types/CommonTypes";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Props {
  value: string;
  countryCode?: string;
  onChangeHandler: noop;
  placeholder?: string;
}

const AppPhoneNumberInput = ({
  value,
  onChangeHandler,
  placeholder = "Enter",
  countryCode = "in",
}: Props) => {
  return (
    <PhoneInput
      country={countryCode}
      value={value}
      onChange={onChangeHandler}
      placeholder={placeholder}
      countryCodeEditable={false}
      enableAreaCodes={true}
      inputStyle={{
        width: "100%",
      }}
    />
  );
};

export default AppPhoneNumberInput;
