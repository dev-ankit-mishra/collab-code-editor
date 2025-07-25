import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "../components/Types";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
