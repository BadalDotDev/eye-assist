"use client";

import { Grid2, useMediaQuery, useTheme } from "@mui/material";

import AuthPageBannerImage from "@/assets/AuthBanner.png";
import LogoWithText from "@/components/common/LogoWithText";

import {
  AuthContainer,
  AuthFormSection,
  AuthPageBanner,
  AuthPageBannerContainer,
  InspiringTextContainer,
  LogoWithTextAndBanner,
  MotoText,
  SubMotoText,
  logoWithText,
  logoWithTextForSmallScreen,
} from "../styles";
import { FC } from "react";
import SignupForm from "../signup/SignupForm";
import LoginForm from "../signin/SigninForm";

const INSPIRATION_TEXT = {
  LOGIN: {
    MOTTO: "Welcome Back, Beacon",
    SUB_MOTTO: "Let's assist your journey forward.",
  },
  SIGNUP: {
    MOTTO: "Bridging Gaps, Building Futures.",
    SUB_MOTTO: "Let's do it together.",
  },
};

interface Props {
  isSignupPage?: boolean;
}

const AuthPageWithForm: FC<Props> = ({ isSignupPage = false }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const mottoText = INSPIRATION_TEXT[isSignupPage ? "SIGNUP" : "LOGIN"].MOTTO;

  const subMotoText =
    INSPIRATION_TEXT[isSignupPage ? "SIGNUP" : "LOGIN"].SUB_MOTTO;

  return (
    <AuthContainer container>
      {isSmallScreen ? null : (
        <LogoWithTextAndBanner size={isSmallScreen ? 0 : 4}>
          <LogoWithText styles={logoWithText} />
          <AuthPageBannerContainer>
            <AuthPageBanner src={AuthPageBannerImage} alt="Auth cover Image" />
          </AuthPageBannerContainer>
        </LogoWithTextAndBanner>
      )}

      <Grid2 size={1.5} />

      <Grid2 size={isSmallScreen ? 9 : 5}>
        <AuthFormSection>
          {isSmallScreen && (
            <LogoWithText
              styles={{
                ...logoWithText,
                ...logoWithTextForSmallScreen,
              }}
            />
          )}
          <InspiringTextContainer isSignupPage={isSignupPage}>
            <MotoText>{mottoText}</MotoText>
            <SubMotoText>{subMotoText}</SubMotoText>
          </InspiringTextContainer>
          {isSignupPage ? <SignupForm /> : <LoginForm />}
        </AuthFormSection>
      </Grid2>

      <Grid2 size={1.5} />
    </AuthContainer>
  );
};

export default AuthPageWithForm;
