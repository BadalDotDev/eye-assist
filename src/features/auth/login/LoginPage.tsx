"use client";

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

import AuthPageBannerImage from "@/assets/Banner3.png";
import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import LoginForm from "./LoginForm";
import LogoWithText from "@/components/common/LogoWithText";

const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          <InspiringTextContainer>
            <MotoText>Welcome Back, Beacon</MotoText>
            <SubMotoText>{`Let's assist your journey forward.`}</SubMotoText>
          </InspiringTextContainer>
          <LoginForm />
        </AuthFormSection>
      </Grid2>

      <Grid2 size={1.5} />
    </AuthContainer>
  );
};

export default LoginPage;
