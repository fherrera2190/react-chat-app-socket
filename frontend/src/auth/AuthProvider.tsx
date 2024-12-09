import { ReactNode, useCallback, useState } from "react";
import AuthContext from "./AuthContext";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";

interface Props {
  children: ReactNode;
}

export interface AuthState {
  checking: boolean;
  email?: string;
  logged: boolean;
  name?: string;
  uid?: string;
}

const initialSate: AuthState = {
  checking: true,
  logged: false,
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(initialSate);

  const login = async (email: string, password: string) => {
    const resp = await fetchWithoutToken(
      "api/login",
      {
        email,
        password,
      },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      setAuth({
        checking: false,
        email: resp.user.email,
        logged: true,
        name: resp.user.name,
        uid: resp.user.uid,
      });
      console.log("Autenticado!");
    }

    return resp;
  };

  const register = async (name: string, email: string, password: string) => {
    const resp = await fetchWithoutToken(
      "api/login/new",
      {
        name,
        email,
        password,
      },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      setAuth({
        checking: false,
        email: resp.user.email,
        logged: true,
        name: resp.user.name,
        uid: resp.user.uid,
      });
      console.log("Registrado!");
    }

    return resp;
  };

  const verifyToken = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        checking: false,
        logged: false,
      });
      return false;
    }

    const resp = await fetchWithToken("api/login/renew");
  
    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { user } = resp;
      setAuth({
        checking: false,
        email: user.email,
        logged: true,
        name: user.name,
        uid: user.uid,
      });
      console.log("Token renovado!");
      return true;
    } else {
      setAuth({
        checking: false,
        logged: false,
      });
      return false;
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,

        login,
        register,
        verifyToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
