import { Box, Typography } from "@mui/material";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const page = () => {
  return (
    <Box>
      <Typography>Home</Typography>
    </Box>
  );
};

export default page;
