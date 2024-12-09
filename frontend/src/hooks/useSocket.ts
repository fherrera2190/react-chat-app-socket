import { useCallback, useEffect, useState } from "react";
import { connect, Socket } from "socket.io-client";

export const useSocket = (server: string) => {
  // const socket = useMemo(() => connect(server), [server]);

  const [socket, setSocket] = useState({} as Socket);
  const [onLine, setOnLine] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp = connect(server, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: { "x-token": token },
    });
    setSocket(socketTemp);
  }, [server]);

  const disconnectSocket = useCallback(() => {
    socket.disconnect?.();
  }, [socket]);

  useEffect(() => {
    setOnLine(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on?.("connect", () => {
      setOnLine(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on?.("disconnect", () => {
      setOnLine(false);
    });
  }, [socket]);

  return { socket, onLine, connectSocket, disconnectSocket };
};
