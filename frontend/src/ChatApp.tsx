import { AuthProvider } from "./auth/AuthProvider";
import { ChatProvider, SocketProvider } from "./context";
import { AppRouter } from "./router/AppRouter";
import moment from "moment";
moment.locale('es');

export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};
