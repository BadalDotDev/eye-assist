import { Box, Skeleton } from "@mui/material";
import React from "react";

const StepContentLoader = () => {
  return (
    <Box>
      <Skeleton width={100} height={30} />
    </Box>
  );
};

export default StepContentLoader;
