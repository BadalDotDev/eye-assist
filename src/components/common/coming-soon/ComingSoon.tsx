"use client";

import React from "react";
import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";

import ComingSoonImage from "@/assets/ComingSoon.png";

const ComingSoon = () => {
  return (
    <Container>
      <StyledImage src={ComingSoonImage} alt="Coming soon" />
      <TextContainer>
        <ComingSoonText>
          Hold tight — we’re building something meaningful.
        </ComingSoonText>
        <SubText>Thank you for your patience!</SubText>
      </TextContainer>
    </Container>
  );
};

export default ComingSoon;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  width: "100vw",
  height: "100vh",
  padding: "10px",

  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const TextContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    textAlign: "left",
  },
}));

const ComingSoonText = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "700",
  color: theme.palette.primary.main,
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "500",
  color: theme.palette.primary.main,
}));

const StyledImage = styled(Image)(({ theme }) => ({
  width: "80%",
  height: "60%",
  borderRadius: "8px",
  transform: "rotateY(180deg)",

  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
}));
