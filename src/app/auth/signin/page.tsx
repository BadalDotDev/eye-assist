"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth/AuthContext";
import AppLoader from "@/components/common/loading/AppLoader";
import { useAppSelector } from "@/redux/store";
import AuthPageWithForm from "@/features/auth/shared/AuthPageWithForm";
import { errorMessages } from "@/constants/messages/error";

export default function SigninPage() {
  const { authToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const isAppLoading = useAppSelector((state) => state.ui.isAppLoading);

  useEffect(() => {
    if (reason === "unauthorized" && !localStorage.getItem("redirectHandled")) {
      toast.error(errorMessages.common.UnauthorizedAccess);
      localStorage.setItem("redirectHandled", "true");
    }

    if (reason) {
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => {
        localStorage.removeItem("redirectHandled");
      }, 100);
    }
  }, [reason]);

  useEffect(() => {
    if (authToken) {
      router.replace("/onboarding?step=1");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  if (isAppLoading) return <AppLoader />;

  return <AuthPageWithForm />;
}
