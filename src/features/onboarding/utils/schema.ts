import * as yup from "yup";
import { genderList } from "../constants";

export const stepperSchema = yup.object({
  dob: yup.date().required("Date of birth is required").nullable(),
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(10, "Age must be at least 10")
    .max(30, "Age must not exceed 30"),
  gender: yup.string().oneOf(genderList),
  mobileNumber: yup.string(),
  highestQualificationId: yup.string(),
  streamId: yup.string(),
  preferredLanguage: yup.string(),
  aboutMe: yup.string().max(40),
  certificateId: yup.string(),
});
