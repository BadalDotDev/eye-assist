"use client";

import { Grid2, useMediaQuery, useTheme } from "@mui/material";

import AuthPageBannerImage from "@/assets/Banner3.png";
import LogoWithText from "@/components/common/LogoWithText";
import SignupForm from "./SignupForm";

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

const SignupPage = () => {
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
          <InspiringTextContainer isSignupPage>
            <MotoText>Bridging Gaps, Building Futures.</MotoText>
            <SubMotoText>{`Let's do it together.`}</SubMotoText>
          </InspiringTextContainer>
          <SignupForm />
        </AuthFormSection>
      </Grid2>

      <Grid2 size={1.5} />
    </AuthContainer>
  );
};

export default SignupPage;
