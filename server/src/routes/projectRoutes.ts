import { Router } from "express";
import {Project} from "../models/Project.js";
import { error } from "console";

const router = Router();

// Create a new project
router.post("/", async (req, res) => {
  const { projectName, username, code } = req.body;

  try {
    const newProject = new Project({
      projectName,
      username,
      code,
      timeOfCreation: new Date()
    });

    await newProject.save();
    console.log("Project created successfully");
    res.status(201).json(newProject);

  } catch (err) {
    res.status(500).json({
      message: "Error occurred, project not created",
      error: err
    });
  }
});

// Fetch all projects
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});

router.get("/:id",async (req,res)=>{
  const {id}=req.params
  try{
    const data=await Project.findById(id)
    if(!data){
      res.status(400).json({message: "Project Not Found"})
    }
    res.status(200).json(data)
  }catch (err){
    res.status(500).json({message:"Error fetching project",error:err});
  }
})

export default router;
