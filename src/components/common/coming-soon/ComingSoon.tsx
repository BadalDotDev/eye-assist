import React from "react";
import { Box, styled } from "@mui/material";
import Image from "next/image";

import ComingSoonImage from "@/assets/ComingSoon.png";

const ComingSoon = () => {
  return (
    <Container>
      <Image
        src={ComingSoonImage}
        alt="Coming soon"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
      />
    </Container>
  );
};

export default ComingSoon;

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
});
