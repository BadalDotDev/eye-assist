import { Divider, Grid2, useMediaQuery, useTheme } from "@mui/material";
import { SigninFormInputsType } from "../type";
import {
  AlreadyUserOrNotText,
  dividerStyles,
  FormBottomSection,
  fullWidth,
  JumpToLoginOrSignupText,
  ORText,
  Seperator,
  StyledForm,
  SwitchAuthFormContainer,
} from "../styles";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthBtn from "@/components/common/buttons/AuthBtn";
import { useRouter } from "next/navigation";
import { signinSchema } from "../utils/utils";
import InputField from "../shared/TextInputField";
import PasswordInputField from "../shared/PasswordInputField";
import { useState } from "react";
import { routes } from "@/constants/Routes";
import { useAppDispatch } from "@/redux/store";
import { useAuth } from "@/context/auth/AuthContext";
import { setAppLoading } from "@/redux/slices/ui/uiSlice";

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { signin } = useAuth();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(signinSchema) });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<SigninFormInputsType> = async (formData) => {
    setSubmittingForm(true);

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    await signin(payload);
    dispatch(setAppLoading(true));

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

        <SwitchAuthFormContainer>
          <AlreadyUserOrNotText>
            Have a vision for our mission?
          </AlreadyUserOrNotText>

          <JumpToLoginOrSignupText onClick={handleRedirectToSignup}>
            Sign Up
          </JumpToLoginOrSignupText>
        </SwitchAuthFormContainer>
      </FormBottomSection>
    </StyledForm>
  );
};

export default SigninForm;
