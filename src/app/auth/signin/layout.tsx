import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin page",
  description: "Signin page for user",
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
