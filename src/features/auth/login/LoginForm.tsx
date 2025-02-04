import { Box, Divider, Grid2, useMediaQuery, useTheme } from "@mui/material";
import { LoginFormInputsType } from "../type";
import {
  AlreadyUserOrNotText,
  dividerStyles,
  flexRow,
  FormBottomSection,
  fullWidth,
  JumpToLoginOrSignupText,
  ORText,
  Seperator,
  StyledForm,
} from "../styles";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthBtn from "@/components/common/buttons/AuthBtn";
import { useRouter } from "next/navigation";
import { loginSchema } from "../utils/utils";
import InputField from "../shared/TextInputField";
import PasswordInputField from "../shared/PasswordInputField";
import { useState } from "react";
import { authService } from "@/services/authService";
import { routes } from "@/constants/Routes";

const LoginForm = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<LoginFormInputsType> = async (formData) => {
    setSubmittingForm(true);

    const res = await authService.login({
      email: formData.email,
      password: formData.password,
    });
    const { data, status, hasError } = res;

    // Check on component level for extra robustness
    const resOK = data && status === 200 && !hasError;

    if (resOK) {
      router.push(routes.comingSoon);
    }

    setSubmittingForm(false);
  };

  const handleRedirectToSignup = () => {
    router.push(routes.authSignup);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 size={isSmallScreen ? 12 : 9}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => <InputField field={field} errors={errors} />}
          />
        </Grid2>
        <Grid2 size={isSmallScreen ? 12 : 9}>
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
      </Grid2>

      <FormBottomSection>
        <Grid2 container sx={fullWidth}>
          <Grid2 size={12}>
            <AuthBtn
              label="Login"
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
          <AlreadyUserOrNotText>
            Have a vision for our mission?
          </AlreadyUserOrNotText>

          <JumpToLoginOrSignupText onClick={handleRedirectToSignup}>
            Sign Up
          </JumpToLoginOrSignupText>
        </Box>
      </FormBottomSection>
    </StyledForm>
  );
};

export default LoginForm;
