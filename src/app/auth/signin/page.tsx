"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import AppLoader from "@/components/common/loading/AppLoader";
import { useAppSelector } from "@/redux/store";
import AuthPageWithForm from "@/features/auth/shared/AuthPageWithForm";

export default function SigninPage() {
  const { authToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const source = searchParams.get("from");

  const isAppLoading = useAppSelector((state) => state.ui.isAppLoading);

  useEffect(() => {
    // Clean up after short delay
    if (reason || source) {
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => {
        sessionStorage.removeItem("unauthorizedRedirectHandled");
      }, 100);
    }
  }, [authToken, reason, source]);

  useEffect(() => {
    if (authToken) {
      router.replace("/onboarding?step=1");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  if (isAppLoading) return <AppLoader />;

  return <AuthPageWithForm />;
}
