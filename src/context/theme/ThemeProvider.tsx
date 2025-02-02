"use client";

import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
