import { Router } from "express";
import { Project } from "../models/Project.js";
import { UserData } from "../models/UserData.js";
const projectRouter = Router();

// Create a new project for a user
projectRouter.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { projectName, username, code, template } = req.body;

  try {
    const existing = await Project.findOne({ projectName, userId });
    if (existing) {
      return res.status(409).json({ message: "Project already exists for this user" });
    }

    const newProject = new Project({
      userId,
      projectName,
      username,
      code,
      template,
    });

  
    const savedProject = await newProject.save();

    await UserData.updateOne(
    { userId: savedProject.userId },
    { $push: { projectObject: savedProject._id } }
    );
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({
      message: "Error creating project",
      error: err.message,
    });
  }
});

// Get all projects for a user
projectRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user projects",
      error: err.message,
    });
  }
});

// Get a specific project by user and project ID
projectRouter.get("/:userId/:projectId", async (req, res) => {
  const { userId, projectId } = req.params;

  try {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found for this user" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching the project",
      error: err.message,
    });
  }
});

// Update a project for a user
projectRouter.put("/:userId/:projectId", async (req, res) => {
  const { userId, projectId } = req.params;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, userId },
      { $set: req.body },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({
      message: "Error updating project",
      error: err.message,
    });
  }
});

export default projectRouter;
