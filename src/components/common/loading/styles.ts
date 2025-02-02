import { Box, keyframes, styled } from "@mui/material";

const scalingAnimation = keyframes`
  0% {
    transform: scale(0.7);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.7)
  }
`;

export const LoadingBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  height: "100vh",
  width: "100vw",
  animation: `${scalingAnimation} 2s linear infinite`,
}));
