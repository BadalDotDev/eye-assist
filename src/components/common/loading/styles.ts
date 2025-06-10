import { Box, keyframes, styled } from "@mui/material";
import Image from "next/image";
import { LoadingBoxContainerProps } from "./type";

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

export const LoadingBoxContainer = styled(Box)<LoadingBoxContainerProps>(
  ({ theme, bgColor, height, width }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor ?? theme.palette.background.default,
    height: height ?? "100vh",
    width: width ?? "100vw",
  }),
);

export const StyledLoadingLogo = styled(Image)({
  width: "100px",
  height: "100px",
  animation: `${scalingAnimation} 2s linear infinite`,
});
