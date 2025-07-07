import { Router } from "express";
import {Project} from "../models/Project.js";

const router = Router();

// Create a new project
router.post("/", async (req, res) => {
  const { projectName, username, code, template } = req.body;

  try {
    const newProject = new Project({
      projectName,
      username,
      code,
      template,
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
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project", error: err });
  }
});


router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});




export default router;
