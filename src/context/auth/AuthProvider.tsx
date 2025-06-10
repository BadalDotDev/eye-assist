"use client";

import { AuthProviderPropsType } from "./type";
import AuthContext from "./AuthContext";
import { authService, LoginPayload } from "@/services/auth/authService";
import { LoginAPIDataType } from "@/services/auth/types";
import { ApiResponse } from "@/api/types";
import { setCookie } from "@/utils/cookieUtils";
import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAppLoading } from "@/redux/slices/ui/uiSlice";

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const dispatch = useAppDispatch();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleSignin = async (payload: LoginPayload) => {
    const response: ApiResponse<LoginAPIDataType> = await authService.signin(
      payload,
    );
    const { data, hasError } = response;

    if (!hasError && data && data.token) {
      const token = data.token;
      // Set token to cookie
      setCookie("authToken", token);
      setAuthToken(token);
    }
    await dispatch(setAppLoading(false));
  };

  const handleLogout = () => {
    window.localStorage.clear();

    // TODO: Call logout API
  };

  return (
    <AuthContext.Provider
      value={{ authToken, signin: handleSignin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
