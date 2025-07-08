import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabase-client";
import type { Session } from "@supabase/supabase-js";

import type { AuthContextType } from "../components/Types";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getInitialState() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        setSession(data.session);
      } catch (err) {
        console.error("Error getting initial session:", err);
      }
    }

    getInitialState();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session Changed");
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function signInUser(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
      if (error) return { success: false, message: error.message };
      return { success: true, data };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Signin unsuccessful" };
    }
  }

  async function signOutUser() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { success: false, message: error.message };
      return { success: true, message: "Signout successful" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Signout unsuccessful" };
    }
  }

  return (
    <AuthContext.Provider value={{ session, signInUser, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
