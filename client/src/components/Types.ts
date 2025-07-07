export type NavbarProp={
  authRequired?:boolean,
  shareRequired?:boolean,
  userRequired?:boolean,
  projectName?:string
}

export type ModalProps={
  setShowModals: (val: boolean) => void;
  create: (val:ProjectDetails)=>void
  isCreated: boolean
}
export type ProjectDetails={
  _id?: string;
  projectName:string,
  username:string,
  code:string,
  template:string,
  time?:Date
}
export interface RecentCardProps {
  project: ProjectDetails[];
}

export type DashboardOutlet={
  project:ProjectDetails[],
  setShowModals:(val:boolean)=>void
}
