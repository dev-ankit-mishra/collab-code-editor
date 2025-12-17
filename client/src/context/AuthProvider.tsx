import { useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import { AuthContext } from "./AuthContext";
import type { Session } from "@supabase/supabase-js";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 🔑 IMPORTANT

  /* ---------- INITIAL SESSION ---------- */
  useEffect(() => {
    // Restore session on page load / refresh
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false); // ✅ session check done
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false); // ✅ auth state resolved

      // Create user only when logged in
      if (session?.user) {
        createUserIfNotExists(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /* ---------- CREATE USER (BACKEND) ---------- */
  async function createUserIfNotExists(session: Session) {
    try {
      await fetch("https://codevspace-aqhw.onrender.com/api/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          userName:
            session.user.user_metadata.full_name || session.user.email,
          userEmail: session.user.email,
        }),
      });
    } catch (err) {
      console.error("Failed to sync user:", err);
    }
  }

  /* ---------- AUTH ACTIONS ---------- */

  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  };

  const signUpUser = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  };

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  /* ---------- OAUTH ---------- */

  const signInWithGoogle = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const signInWithGithub = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  /* ---------- PASSWORD ---------- */

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/change-password`,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const updateUser = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading, // 🔑 EXPOSED
        signInUser,
        signOutUser,
        signUpUser,
        signInWithGoogle,
        signInWithGithub,
        resetPassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
