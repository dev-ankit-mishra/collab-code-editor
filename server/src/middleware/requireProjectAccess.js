import { Project } from "../models/Project.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";

/**
 * Role-based access control middleware
 * @param {("VIEWER"|"EDITOR"|"OWNER")} requiredRole
 */
export const requireProjectAccess = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;

      const ROLE_LEVEL = {
        VIEWER: 1,
        EDITOR: 2,
        OWNER: 3,
      };

      const requiredLevel = ROLE_LEVEL[requiredRole];

      /* 1️⃣ Check if user is project OWNER */
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.userId === userId) {
        // Owner has full access
        req.project = project;
        req.role = "OWNER";
        return next();
      }

      /* 2️⃣ Check collaborator access */
      const collaborator = await ProjectCollaborator.findOne({
        projectId,
        userId,
        status: "ACCEPTED",
      });

      if (!collaborator) {
        return res.status(403).json({ message: "Access denied" });
      }

      const userLevel = ROLE_LEVEL[collaborator.role];

      if (userLevel < requiredLevel) {
        return res.status(403).json({
          message: "Insufficient permissions",
        });
      }

      /* 3️⃣ Attach context */
      req.project = project;
      req.role = collaborator.role;

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Authorization failed" });
    }
  };
};
