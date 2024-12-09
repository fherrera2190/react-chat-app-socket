import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { ChatPage, LoginPage, RegisterPage } from "../pages";
import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import { LoadingPage } from "../components";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!auth.logged) {
      return <Navigate to="/auth/login" />;
    }
    return children;
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (auth.logged) {
      return <Navigate to="/" />;
    }
    return children;
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (auth.checking) return <LoadingPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="auth/*" element={<Navigate to="/auth/login" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
