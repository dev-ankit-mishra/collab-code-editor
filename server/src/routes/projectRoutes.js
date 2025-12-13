import { Router } from "express";
import { Project } from "../models/Project.js";
import { UserData } from "../models/UserData.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireProjectOwner } from "../middleware/projectOwner.js";

const projectRouter = Router();

/* =====================================================
   GLOBAL AUTH MIDDLEWARE
   -----------------------------------------------------
   Every route below this line:
   ✔ requires a valid Supabase JWT
   ✔ has access to req.user.id
   ===================================================== */
projectRouter.use(requireAuth);

/* =====================================================
   CREATE PROJECT
   -----------------------------------------------------
   Owner is ALWAYS the logged-in user
   Never trust userId from client
   ===================================================== */
projectRouter.post("/", async (req, res) => {
  const userId = req.user.id; // from Supabase token
  const { projectName, username, code, template } = req.body;

  try {
    // Prevent duplicate project names for same user
    const existing = await Project.findOne({ projectName, userId });
    if (existing) {
      return res.status(409).json({
        message: "Project already exists for this user",
      });
    }

    const newProject = new Project({
      userId,
      projectName,
      username,
      code,
      template,
    });

    const savedProject = await newProject.save();

    // Add project reference to user
    await UserData.updateOne(
      { userId },
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

/* =====================================================
   GET ALL PROJECTS (LOGGED-IN USER ONLY)
   -----------------------------------------------------
   User sees ONLY their own projects
   ===================================================== */
projectRouter.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching projects",
      error: err.message,
    });
  }
});

/* =====================================================
   GET SINGLE PROJECT (OWNER ONLY)
   -----------------------------------------------------
   Ownership is verified by middleware
   Project is attached to req.project
   ===================================================== */
projectRouter.get(
  "/:projectId",
  requireProjectOwner,
  (req, res) => {
    res.status(200).json(req.project);
  }
);

/* =====================================================
   UPDATE PROJECT (OWNER ONLY)
   -----------------------------------------------------
   No need to check userId again
   req.project is already authorized
   ===================================================== */
projectRouter.put(
  "/:projectId",
  requireProjectOwner,
  async (req, res) => {
    try {
      Object.assign(req.project, req.body);
      const updatedProject = await req.project.save();

      res.status(200).json(updatedProject);
    } catch (err) {
      res.status(500).json({
        message: "Error updating project",
        error: err.message,
      });
    }
  }
);

/* =====================================================
   DELETE PROJECT (OWNER ONLY)
   -----------------------------------------------------
   Also removes project reference from UserData
   ===================================================== */
projectRouter.delete(
  "/:projectId",
  requireProjectOwner,
  async (req, res) => {
    try {
      const projectId = req.project._id;

      await req.project.deleteOne();

      await UserData.updateOne(
        { userId: req.user.id },
        { $pull: { projectObject: projectId } }
      );

      res.status(200).json({
        message: "Project deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting project",
        error: err.message,
      });
    }
  }
);

export default projectRouter;
