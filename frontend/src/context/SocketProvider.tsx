import { useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import SocketContext from "./SocketContex";
import AuthContext from "../auth/AuthContext";

interface Props {
  children: JSX.Element;
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, onLine, connectSocket, disconnectSocket } = useSocket(
    import.meta.env.VITE_BASE_URL
  );
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth]);
  return (
    <SocketContext.Provider value={{ socket, onLine }}>
      {children}
    </SocketContext.Provider>
  );
};
