import { Project } from "../models/Project.js";

export const requireProjectOwner = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id; // Supabase user id from JWT

    // 1️⃣ Fetch project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2️⃣ Authorization check
    // IMPORTANT: field name must match your Project schema
    if (project.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 3️⃣ Attach project to request
    req.project = project;

    next();
  } catch (err) {
    console.error("Project owner check failed:", err);
    return res.status(401).json({ message: "Authorization failed" });
  }
};
