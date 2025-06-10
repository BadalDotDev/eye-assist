import {
  Box,
  FormLabel,
  Grid2,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

export const fullWidth = {
  width: "100%",
};

export const dividerStyles = {
  width: "40%",
};

export const logoWithText = {
  width: "125px",
  position: "absolute",
  mixBlendMode: "multiply",
  margin: "16px",
};

export const logoWithTextForSmallScreen = {
  position: "static",
  margin: 0,
  marginTop: 16,
};

export const LogoWithTextAndBanner = styled(Grid2)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100%",
}));

export const StyledForm = styled("form")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
});

export const AuthContainer = styled(Grid2)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
  display: "flex",
  alignItems: "center",
}));

export const AuthPageBannerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const AuthPageBanner = styled(Image)(({ theme }) => ({
  display: "block",
  maxHeight: "60%",
  maxWidth: "60%",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

interface InspiringTextContainerProps {
  isSignupPage?: boolean;
}

export const InspiringTextContainer = styled(Box)(
  ({ isSignupPage }: InspiringTextContainerProps) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: !isSignupPage ? "center" : "flex-start",
    gap: "8px",
  }),
);

export const MotoText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  color: theme.palette.primary.main,
  lineHeight: "1.2",
}));

export const SubMotoText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "700",
  color: theme.palette.primary.light,
  lineHeight: "1.2",
}));

export const AuthFormSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  gap: 20,
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

export const StyledFormLabel = styled(FormLabel)({
  fontSize: "14px",
  fontWeight: "500",
});

export const PasswordInputContainer = styled(Box)({
  ...fullWidth,
  display: "flex",
  flexDirection: "column",
});

export const TextfieldInputContainer = styled(Box)({
  ...fullWidth,
});

export const StyledOutlinedInput = styled(OutlinedInput)({
  "& .MuiOutlinedInput-input": {
    padding: "5px 10px",
  },
});

export const StyledTextfieldInput = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    padding: "5px 10px",
  },
});

interface RoleImageProps {
  isStudent?: boolean;
}

export const RoleImage = styled(Image)<RoleImageProps>(({ isStudent }) => ({
  borderRadius: "8px",
  cursor: "pointer",
  width: "100px",
  height: "100px",
  transform: isStudent ? "scaleX(-1)" : "scaleX(1)",
}));

export const RoleTitle = styled(Typography)(() => ({
  color: "inherit",
  fontSize: "16px",
  textAlign: "center",
  fontWeight: "600",
}));

export const RoleInputContainer = styled(Box)<{
  isSelected: boolean;
  hasError: boolean;
}>(({ theme, isSelected, hasError }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: hasError
    ? `1px solid ${theme.palette.error.main}`
    : isSelected
    ? `1px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  padding: "8px",
  color: isSelected ? theme.palette.primary.main : theme.palette.text.disabled,
  opacity: isSelected ? "1" : "0.7",
  transition: "opacity 0.3s ease",
  ":hover": {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    opacity: "1",
  },
}));

export const FormBottomSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const Seperator = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
});

export const ORText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontWeight: 600,
}));

export const AlreadyUserOrNotText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const JumpToLoginOrSignupText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  cursor: "pointer",
  textWrap: "nowrap",
}));

export const SwitchAuthFormContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
