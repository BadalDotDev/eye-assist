"use client";

import AppLoader from "@/components/common/loading/AppLoader";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/auth/signup");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppLoader />;
}
