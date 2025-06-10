import { Box, Grid2, styled, Typography } from "@mui/material";
import Image from "next/image";

// Onboarding styles
export const OnboardingContainer = styled(Grid2)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
  display: "flex",
  alignItems: "center",
}));

export const BannerAndLogoWithText = styled(Grid2)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100%",
}));

export const BannerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const LeftSideImage = styled(Image)({
  maxWidth: "60%",
  maxHeight: "60%",
});

export const StepperAndFormContainer = styled(Grid2)(({ theme }) => ({
  padding: "0 16px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  justifyContent: "center",
  backgroundColor: "#fff",
  [theme.breakpoints.down("sm")]: {
    margin: "64px 0",
  },
}));

// Steps styles
export const StepContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

// StepperForm styles
export const StepperFormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const SkipBtnContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "8px",
});

export const BackAndNextBtnContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const StyledLabelContainer = styled(Box)({
  marginBottom: 4,
});

export const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: "500",
  color: theme.palette.text.primary,
}));

export const StyledSubLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: "400",
  color: theme.palette.text.secondary,
}));

export const LoaderContainer = styled(Box)({
  minHeight: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
