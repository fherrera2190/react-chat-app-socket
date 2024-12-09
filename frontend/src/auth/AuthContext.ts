import { createContext } from "react";
import { AuthState } from "./AuthProvider";
import { AuthResponse, AuthResponseError } from "../interfaces";

interface AuthContextType {
  auth: AuthState;

  login: (
    email: string,
    password: string
  ) => Promise<AuthResponse | AuthResponseError>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse | AuthResponseError>;
  verifyToken: () => Promise<boolean>;
  logOut: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export default AuthContext;
