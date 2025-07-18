import type { Session } from "@supabase/supabase-js";
import type { IconType } from "react-icons";

export type Language = {
  label: string;
  version: string;
  icon?: IconType;
  color?: string;
  boilerplate: string;
};


export type NavbarProp={
  authRequired?:boolean,
  shareRequired?:boolean,
  projectName?:string
}

export type ModalProps={
  setShowModals: (val: boolean) => void;
  create: (val:ProjectDetails)=> Promise<string | undefined>; 
}



export type ProjectDetails={
  _id?: string;
  projectName:string,
  userId:string,
  code:string,
  template:Language,
  createdAt?:Date,
  updatedAt?:Date
}
export interface RecentCardProps {
  project: ProjectDetails[];
}

export type DashboardOutlet={
  project:ProjectDetails[],
  setShowModals:(val:boolean)=>void
}



export type codeAreaProps={
  projectObject:ProjectDetails

}

export type AuthContextType ={
  session: Session | null | undefined;
  signInUser: (email: string, password: string) => Promise<{ success: boolean; error?: string; data?: any }>;
  signOutUser: () => Promise<{ success: boolean; error?: string }>;
  signUpUser: (name:string,email:string,password:string)=>Promise<{success:boolean,error?:string,data?:any}>;
  signInWithGoogle:()=>Promise<{success:boolean,error?:string}>;
  signInWithGithub:()=>Promise<{success:boolean,error?:string}>;
  resetPassword:(email:string)=>Promise<{success:boolean,error?:string}>;
  updateUser:(password:string)=>Promise<{success:boolean,error?:string}>;

}

export type MenuProps={
  setShowModals:(val:boolean)=>void
}