"use client";

import { useState } from "react";
import { AuthProviderPropsType, UserType } from "./type";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = () => {
    const localUser = window.localStorage.getItem("user");

    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);

      return;
    } else {
      // TODO: Call login API
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();

    // TODO: Call logout API
  };

  return (
    <AuthContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
