import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Onboarding",
  description: "Onboarding process for users",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
