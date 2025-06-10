"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1F4A5A",
      light: "#4b7683",
      dark: "#051821",
      contrastText: "#fff",
    },
    // secondary: {
    //   main: "#FFC107",
    // },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#f58800",
      light: "#f7a400",
      dark: "#f37413",
      contrastText: "#fff",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    // divider: "",
    background: {
      paper: "#ffffff",
      default: "#1F4A5A26",
    },
    
  },
});

export default theme;
