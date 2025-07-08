
export type NavbarProp={
  authRequired?:boolean,
  shareRequired?:boolean,
  userRequired?:boolean,
  projectName?:string
}

export type ModalProps={
  setShowModals: (val: boolean) => void;
  create: (val:ProjectDetails)=> Promise<string | undefined>; 
}

export type Language={ label: string; version: string; boilerplate: string }

export type ProjectDetails={
  _id?: string;
  projectName:string,
  username:string,
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