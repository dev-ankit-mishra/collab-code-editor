// routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();

  if (session === undefined) {
    return <div className="text-white p-4">Loading...</div>;
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
