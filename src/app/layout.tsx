"use client";

import AuthProvider from "@/context/auth/AuthProvider";
import { ThemeProvider } from "@mui/material/styles";
import { Slide, ToastContainer } from "react-toastify";
import theme from "@/context/theme/CustomTheme";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              transition={Slide}
            />
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
