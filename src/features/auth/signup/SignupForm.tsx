import { useState } from "react";
import { useRouter } from "next/navigation";

import { Box, Divider, Grid2, useMediaQuery, useTheme } from "@mui/material";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ScribeImage from "@/assets/Scribe3D.png";
import StudentImage from "@/assets/Student3D.png";
import AuthBtn from "@/components/common/buttons/AuthBtn";
import { authService } from "@/services/authService";
import { signupSchema, usernameRules } from "../utils/utils";
import PasswordInputField from "../shared/PasswordInputField";
import InputField from "../shared/TextInputField";
import ErrorHelpMessage from "../shared/ErrorHelpMessage";

import { SignupFormInputsType, UserRoleEnum } from "../type";
import {
  flexRow,
  RoleImage,
  RoleInputContainer,
  RoleTitle,
  StyledForm,
  fullWidth,
  FormBottomSection,
  Seperator,
  ORText,
  JumpToLoginOrSignupText,
  AlreadyUserOrNotText,
  dividerStyles,
} from "../styles";

const SignupForm = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: yupResolver(signupSchema) });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleClearForm = () => {
    reset({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const onSubmit: SubmitHandler<SignupFormInputsType> = async (data) => {
    setSubmittingForm(true);
    const res = await authService.signup(data);
    if (res) {
      handleClearForm();
      handleRedirectToLogin();
    }
    setSubmittingForm(false);
  };

  const handleRedirectToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: true }}
            render={({ field }) => <InputField field={field} errors={errors} />}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => <InputField field={field} errors={errors} />}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <Controller
            control={control}
            name="username"
            rules={usernameRules}
            render={({ field }) => <InputField field={field} errors={errors} />}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => <InputField field={field} errors={errors} />}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInputField
                field={field}
                errors={errors}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
            )}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 6}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordInputField
                field={field}
                errors={errors}
                showPassword={showConfirmPassword}
                handleClickShowPassword={handleClickShowConfirmPassword}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            control={control}
            name="role"
            render={({ field }) => {
              const isStudentSelected = field.value === UserRoleEnum.Student;
              const isScribeSelected = field.value === UserRoleEnum.Scribe;

              return (
                <>
                  <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                      <RoleInputContainer
                        onClick={() => field.onChange(UserRoleEnum.Student)}
                        isSelected={isStudentSelected}
                        hasError={!!errors.role}
                      >
                        <RoleImage src={StudentImage} alt="Student" isStudent />
                        <RoleTitle>Student</RoleTitle>
                      </RoleInputContainer>
                    </Grid2>
                    <Grid2 size={6}>
                      <RoleInputContainer
                        onClick={() => field.onChange(UserRoleEnum.Scribe)}
                        isSelected={isScribeSelected}
                        hasError={!!errors.role}
                      >
                        <RoleImage src={ScribeImage} alt="Scribe" />
                        <RoleTitle>Scribe</RoleTitle>
                      </RoleInputContainer>
                    </Grid2>
                  </Grid2>
                  {errors.role && errors.role.message && (
                    <ErrorHelpMessage message={errors.role.message} />
                  )}
                </>
              );
            }}
          />
        </Grid2>
      </Grid2>

      <FormBottomSection>
        <Grid2 container sx={fullWidth}>
          <Grid2 size={12}>
            <AuthBtn
              label="Sign Up"
              type="submit"
              variant="contained"
              disabled={submittingForm}
            />
          </Grid2>
        </Grid2>

        <Seperator>
          <Divider sx={dividerStyles} />
          <ORText> OR </ORText>
          <Divider sx={dividerStyles} />
        </Seperator>

        <Box sx={{ ...flexRow, gap: "8px" }}>
          <AlreadyUserOrNotText>Already have an account?</AlreadyUserOrNotText>

          <JumpToLoginOrSignupText onClick={handleRedirectToLogin}>
            Login
          </JumpToLoginOrSignupText>
        </Box>
      </FormBottomSection>
    </StyledForm>
  );
};

export default SignupForm;
