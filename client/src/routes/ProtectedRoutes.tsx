// routes/ProtectedRoutes.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import SplashScreen from "../components/FullScreenLoader";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useAuth();

  // ⏳ Wait until Supabase finishes restoring session
  if (loading) {
    return <SplashScreen />;
  }

  // 🔐 Not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated
  return <>{children}</>;
}
