"use client";

import AppLoader from "@/components/common/loading/AppLoader";
import { routes } from "@/constants/Routes";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(routes.home);
    } else {
      router.replace(routes.authSignup);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppLoader />;
}
