import type { Metadata } from "next";
import AuthProvider from "@/context/auth/AuthProvider";
import { ThemeProvider } from "@mui/material/styles";
import { Slide, ToastContainer } from "react-toastify";
import theme from "@/context/theme/CustomTheme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eye Assist",
  description: "Eye Assist ",
};

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
        <ThemeProvider theme={theme}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            transition={Slide}
          />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
