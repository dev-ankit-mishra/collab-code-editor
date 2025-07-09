import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabase-client";
import type { Session } from "@supabase/supabase-js";

import type { AuthContextType } from "../components/Types";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
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
      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error Ocurred" };
    }
  }

async function signOutUser(){
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    let errorMessage = "An unexpected error occurred";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return { success: false, error: errorMessage };
}
}

async function signUpUser(email:string,password:string){
  try{
    const {data,error}=await supabase.auth.signUp({
      email:email.toLowerCase(),
      password:password
    })
    if(error){
      return {success:false,error:error.message}
    }
    return {success:true,data}
    
  }catch (err){
    console.log(err)
    return {success:false,error:"Error occured"}
  }
}

  return (
    <AuthContext.Provider value={{ session, signInUser, signOutUser , signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

