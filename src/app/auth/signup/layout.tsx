import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup page",
  description: "Signup page for user",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
