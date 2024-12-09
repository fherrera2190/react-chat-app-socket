import { AuthProvider } from "./auth/AuthProvider";
import { SocketProvider } from "./context";
import { AppRouter } from "./router/AppRouter";

export const ChatApp = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  );
};
