// routes/ProtectedRoutes.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import SplashScreen from "../components/SplashScreen";

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();

  if (session === undefined) {
    return <SplashScreen/> // or a spinner
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
