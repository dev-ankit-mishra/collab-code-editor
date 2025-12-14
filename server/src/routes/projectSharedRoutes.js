import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";

const router = Router();

/**
 * Get all projects shared with the logged-in user
 */
router.get("/shared-with-me", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const sharedProjects = await ProjectCollaborator.find({
      userId,
      status: "ACCEPTED",
    })
      .populate("projectId")
      .sort({ updatedAt: -1 });

    /**
     * Format response for frontend
     */
    const result = sharedProjects.map((entry) => ({
      project: entry.projectId,
      role: entry.role,
      invitedBy: entry.invitedBy,
      joinedAt: entry.createdAt,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch shared projects",
    });
  }
});

export default router;
