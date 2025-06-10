import { LoginPayload } from "@/services/auth/authService";
import { ReactNode } from "react";

export interface AuthContextType {
  authToken: string | null;
  signin: (payload: LoginPayload) => void;
  logout: () => void;
}

export interface AuthProviderPropsType {
  children: ReactNode;
}
