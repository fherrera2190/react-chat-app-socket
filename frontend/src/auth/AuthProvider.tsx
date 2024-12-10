import { ReactNode, useCallback, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { AuthResponse } from "../interfaces";
import ChatContext from "../context/chat/ChatContex";
import { ActionChatType } from "../context";

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
  const { dispatch } = useContext(ChatContext);
  const login = async (email: string, password: string) => {
    const resp = await fetchWithoutToken<AuthResponse>(
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
    }

    return resp;
  };

  const register = async (name: string, email: string, password: string) => {
    const resp = await fetchWithoutToken<AuthResponse>(
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

    const resp = await fetchWithToken<AuthResponse>("api/login/renew");

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
    dispatch({ type: ActionChatType.clearMessages });
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
