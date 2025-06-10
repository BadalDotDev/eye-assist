"use client";

import { FC } from "react";
import { LoadingBoxContainer, StyledLoadingLogo } from "./styles";
import { LoadingBoxContainerProps } from "./type";

import Logo from "@/assets/LogoV2.png";

interface Props {
  containerStyles?: LoadingBoxContainerProps;
}

const AppLoader: FC<Props> = ({ containerStyles = {} }) => {
  return (
    <LoadingBoxContainer {...containerStyles}>
      <StyledLoadingLogo src={Logo} alt="Logo" />
    </LoadingBoxContainer>
  );
};

export default AppLoader;
