"use client";

import AppLoader from "@/components/common/loading/AppLoader";
import { routes } from "@/constants/Routes";
import { authService } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleVerifyEmail = async (token: string) => {
    await authService.verifyEmail({
      token,
    });

    router.replace(routes.authLogin);
  };

  useEffect(() => {
    if (token) {
      handleVerifyEmail(token);
    } else {
      toast.error(
        "Url to verify email is invalid! Retry the process or contact us.",
      );
      router.replace(routes.authLogin);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <AppLoader />;
};

export default VerifyEmailPage;
