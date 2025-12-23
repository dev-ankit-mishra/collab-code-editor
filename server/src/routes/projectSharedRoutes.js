import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";

const router = Router();

/**
 * GET /api/projects/shared-with-me
 * Returns projects where the logged-in user is an ACCEPTED collaborator
 */
router.get("/shared-with-me", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Find accepted collaborations and populate project
    const collaborations = await ProjectCollaborator.find({
      userId,
      status: "ACCEPTED",
    }).populate("projectId");

    // 2️⃣ Remove deleted projects (safety)
    const projects = collaborations
      .filter(c => c.projectId) // 👈 IMPORTANT
      .map(c => ({
        _id: c.projectId._id,
        projectName: c.projectId.projectName,
        template: c.projectId.template,
        role: c.role,            // VIEWER | EDITOR
        ownerId: c.projectId.userId,
        ownerName:c.userName,
        updatedAt: c.projectId.updatedAt,
      }));

    res.json(projects);
  } catch (err) {
    console.error("Shared-with-me error:", err);
    res.status(500).json({
      message: "Failed to fetch shared projects",
    });
  }
});

/**
 * DELETE /api/projects/:projectId/collaborators/:collaboratorId
 * Remove a collaborator or allow collaborator to leave project
 */
router.delete(
  "/:projectId/collaborators/:collaboratorId",
  requireAuth,
  async (req, res) => {
    try {
      const { projectId, collaboratorId } = req.params;
      const loggedInUserId = req.user.id;

      // 1️⃣ Find collaboration
      const collaboration = await ProjectCollaborator.findOne({
        projectId,
        userId: collaboratorId,
      });

      if (!collaboration) {
        return res.status(404).json({
          message: "Collaborator not found",
        });
      }

      // 2️⃣ Check permission
      const isOwner = collaboration.ownerId?.toString() === loggedInUserId;
      const isSelf = collaboratorId === loggedInUserId;

      if (!isOwner && !isSelf) {
        return res.status(403).json({
          message: "Not authorized to remove this collaborator",
        });
      }

      // 3️⃣ Delete collaborator
      await ProjectCollaborator.deleteOne({
        projectId,
        userId: collaboratorId,
      });

      res.json({
        message: "Collaborator removed successfully",
      });
    } catch (err) {
      console.error("Delete collaborator error:", err);
      res.status(500).json({
        message: "Failed to remove collaborator",
      });
    }
  }
);


export default router;
