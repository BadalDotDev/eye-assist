export enum UserRoleEnum {
  Student = "student",
  Scribe = "scribe",
}

export interface SignupFormInputsType {
  firstName: string;
  lastName?: string | undefined;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRoleEnum;
}

export interface LoginFormInputsType {
  email: string;
  password: string;
}
