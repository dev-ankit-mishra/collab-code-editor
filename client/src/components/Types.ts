export interface ModalProps {
  setShowModals: (val: boolean) => void;
  create: (val:ProjectDetails)=>void
}
export type ProjectDetails={
  _id?: string;
  projectName:string,
  username:string,
  code:string,
  time:Date
}
export interface RecentCardProps {
  project: ProjectDetails[];
}
