import { ReactNode } from "react";

export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: UserType | null;
  login: () => void;
  logout: () => void;
  // loading: boolean; // TODO: uncomment when login api is ready
}

export interface AuthProviderPropsType {
  children: ReactNode;
}
