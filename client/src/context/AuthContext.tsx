import { createContext } from "react";
import type { AuthContextType } from "../components/Types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
