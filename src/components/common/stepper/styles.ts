import { hexToRgba } from "@/utils/ColorUtils";
import { Box, StepLabel, Stepper, styled } from "@mui/material";

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 8,
  },
}));

export const StepIconWrapper = styled(Box)<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  ".MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        ".MuiSvgIcon-root": {
          color: theme.palette.primary.main,
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        ".MuiSvgIcon-root": {
          color: theme.palette.primary.light,
        },
      },
    },
  ],
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const StepIconRoot = styled(Box)<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "8px",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.action.disabledBackground,
  ".MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        ".MuiSvgIcon-root": {
          color: "#fff",
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor: hexToRgba(theme.palette.primary.main, 0.15),

        ".MuiSvgIcon-root": {
          color: theme.palette.primary.main,
        },
      },
    },
  ],
}));

export const StyledStepAndConnectorContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "&.MuiStepLabel-root": {
    gap: "8px",
    "&.MuiStepLabel-alternativeLabel": {
      flexDirection: "row",
    },
  },
  "& .MuiStepLabel-labelContainer": {
    "& .MuiStepLabel-alternativeLabel": {
      textAlign: "start",
    },
  },
  "& .MuiStepLabel-label": {
    color: theme.palette.text.disabled,
    fontWeight: "400",
    fontSize: 14,
    "&.MuiStepLabel-alternativeLabel": {
      marginTop: 0,
    },
    "&.Mui-active": {
      color: theme.palette.primary.main,
      fontWeight: "500",
    },
    "&.Mui-completed": {
      color: theme.palette.primary.light,
    },
  },
}));
