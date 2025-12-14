import { Project } from "../models/Project.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";

/**
 * Role-based access control middleware
 * @param {"VIEWER" | "EDITOR" | "OWNER"} requiredRole
 */
export const requireProjectAccess = (requiredRole) => {
  const ROLE_LEVEL = {
    VIEWER: 1,
    EDITOR: 2,
    OWNER: 3,
  };

  if (!ROLE_LEVEL[requiredRole]) {
    throw new Error(`Invalid role: ${requiredRole}`);
  }

  return async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;

      /* 1️⃣ Fetch project */
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      /* 2️⃣ Owner has full access */
      if (project.userId === userId) {
        req.project = project;
        req.role = "OWNER";
        return next();
      }

      /* 3️⃣ Check collaborator access */
      const collaborator = await ProjectCollaborator.findOne({
        projectId,
        userId,
        status: "ACCEPTED",
      });

      if (!collaborator) {
        return res.status(403).json({ message: "Access denied" });
      }

      const userLevel = ROLE_LEVEL[collaborator.role];
      const requiredLevel = ROLE_LEVEL[requiredRole];

      if (userLevel < requiredLevel) {
        return res.status(403).json({
          message: "Insufficient permissions",
        });
      }

      /* 4️⃣ Attach context */
      req.project = project;
      req.role = collaborator.role;

      next();
    } catch (err) {
      console.error("RBAC error:", err);
      res.status(403).json({ message: "Authorization failed" });
    }
  };
};
