// routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import SplashScreen from "../components/SplashScreen";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();

  if (session === undefined) {
    return <SplashScreen/>
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
