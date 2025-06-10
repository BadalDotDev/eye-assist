import * as yup from "yup";
import { UserRoleEnum } from "../type";

const passwordValidation = yup
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character")
  .required("Password is required");

const emailValidation = yup
  .string()
  .trim()
  .email("Invalid email address")
  .required("Email is required");

const usernameValidation = yup
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters")
  .max(15, "Username must not exceed 15 characters")
  .matches(
    /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
    "Username should have alphabets, numbers, dot, or underscore",
  )
  .required("Username is required");

const roleValidation = yup
  .string()
  .oneOf(Object.values(UserRoleEnum), "Role must be either Student or Scribe")
  .required("Select a role");

export const signupSchema = yup
  .object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string(),
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    role: roleValidation,
  })
  .required();

export const signinSchema = yup
  .object({
    email: yup.string().trim().email().required("Email is required"),
    password: passwordValidation,
  })
  .required();

export const placeholderList: { [key: string]: string } = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe123@gmail.com",
  username: "john_doe123",
  password: "●●●●●●●●",
  confirmPassword: "●●●●●●●●",
};

export const fieldsMap: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  username: "Username",
  password: "Password",
  confirmPassword: "Confirm Password",
};

export const usernameRules = {
  required: true,
  minLength: 3,
  maxLength: 15,
  pattern: {
    value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
    message: "Username should have alphabets, numbers, dot or underscore",
  },
};
