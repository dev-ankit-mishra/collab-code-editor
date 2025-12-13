import {Project} from "../models/Project"

export const requireProjectOwner= async (req,res,next)=>{
  try{
    const {projectId}=req.params
    const userId=req.user.id

    const project=await Project.findBy(projectId);

    if(!project){
      return res.status(404).json({message:"Project Not Found"})
    }

    if(project.owner.toString()!==userId){
      return res.status(403).json({message:"Access Denied"})
    }

    req.project=project

    next();

  }catch(err){
    res.send(401).json({messgae:"Authentication Failed"})
  }
}