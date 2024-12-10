import { useContext, useEffect } from "react";
import { useSocket } from "../../hooks/";
import AuthContext from "../../auth/AuthContext";
import ChatContext from "../chat/ChatContex";
import SocketContext from "./SocketContex";
import { ActionChatType } from "../chat";

interface Props {
  children: JSX.Element;
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, onLine, connectSocket, disconnectSocket } = useSocket(
    import.meta.env.VITE_BASE_URL
  );
  const { auth } = useContext(AuthContext);

  const { chatState, dispatch, bottomScroll } = useContext(ChatContext);

  void chatState;

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket.on?.("list-users", (users) => {
      dispatch({ type: ActionChatType.loadedUsers, payload: users });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on?.("personal-message", (message) => {
      dispatch({ type: ActionChatType.newMessage, payload: message });
      bottomScroll();
    });
  }, [socket, dispatch,bottomScroll]);

  return (
    <SocketContext.Provider value={{ socket, onLine }}>
      {children}
    </SocketContext.Provider>
  );
};
