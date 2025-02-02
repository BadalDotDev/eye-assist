"use client";

import { ThemeOptions } from "@mui/material";
import { createContext, useContext } from "react";

// Initial values
export const initialTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#051821",
      light: "",
      dark: "",
    },
    secondary: {
      main: "#FFC107",
      light: "",
      dark: "",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    text: {
      primary: "",
      secondary: "",
      disabled: "",
    },
    background: {
      paper: "",
      default: "",
    },
    divider: "",
  },
};

const ThemeContext = createContext<ThemeOptions | undefined>(initialTheme);

// Custom hook to use the ThemeContext
export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};

export default ThemeContext;
