import { useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import { AuthContext } from "./AuthContext"; // <- now imported
import type { Session } from "@supabase/supabase-js";

export  function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

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

  const { data: listener } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      setSession(session);
      console.log("Session Changed");

      if (session?.user) {
        const user = session.user;

        try {
          const res = await fetch("https://codevspace-aqhw.onrender.com/api/users/create-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              userName: user.user_metadata.full_name || user.email,
              userEmail: user.email,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "User not created!");
          }

          console.log("User created or already exists:", data);
        } catch (err) {
          console.error("Failed to create user:", err);
        }
      }
    }
  );

  return () => {
    listener?.subscription.unsubscribe();
  };
}, []);


  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error occurred" };
    }
  };

  const signOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Unexpected error" };
    }
  };

  const signUpUser = async (name:string ,email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
         options: {
      data: {
        full_name: name, 
      },
    }
      });
      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (err) {
      return { success: false, error: "Error occurred" };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://codevspace.netlify.app/dashboard",
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: "Error occurred" };
    }
  };

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "http://codevspace.netlify.app/dashboard",
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: "Error occurred" };
    }
  };

  const resetPassword=async (email:string)=>{
    try{
      const {error}=await supabase.auth.resetPasswordForEmail(email,{
        redirectTo:"http://codevspace/change-password",
      })
      if(error){
        return {success:false,error:error.message}
      }
      return {success:true}

    }catch (err:any){
      return {success:false,error:err?.message}
    }
  }

  const updateUser=async(password:string)=>{
    try{
      const {error}=await supabase.auth.updateUser({
        password:password
      })
      if(error){
        return {success:false,error:error.message}
      }
      return {success:true}

    }catch (err: any) {
    return { success: false, error: err?.message || "Something went wrong." };
  }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        signInUser,
        signOutUser,
        signUpUser,
        signInWithGoogle,
        signInWithGithub,
        resetPassword,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
