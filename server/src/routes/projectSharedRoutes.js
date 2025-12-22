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

export default router;
