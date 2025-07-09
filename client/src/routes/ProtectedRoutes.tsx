// routes/ProtectedRoutes.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();

  if (session === undefined) {
    return <div className="text-white p-4">Loading...</div>; // or a spinner
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
