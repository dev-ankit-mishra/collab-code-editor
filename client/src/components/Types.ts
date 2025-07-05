export interface ModalProps {
  setShowModals: (val: boolean) => void;
  create: (val:ProjectDetails)=>void
}
export type ProjectDetails={
  name:string,
  time:Date
}
export interface RecentCardProps {
  project: ProjectDetails[];
}
