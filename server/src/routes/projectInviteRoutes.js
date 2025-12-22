import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireProjectOwner } from "../middleware/projectOwner.js";
import { UserData } from "../models/UserData.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";

const router = Router();

/**
 * Invite a user to a project
 */
router.post(
  "/:projectId/invite",
  requireAuth,
  requireProjectOwner,
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { email, role } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await UserData.findOne({
        userEmail: email.toLowerCase(),
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found. Ask them to sign up first." });
      }

      if (user.userId === req.user.id) {
        return res
          .status(400)
          .json({ message: "You already own this project" });
      }

    

      const collaborator = await ProjectCollaborator.create({
        projectId,
        userId: user.userId,
        role,
        invitedBy: req.user.id,
      });

      res.status(201).json({
        message: "Invitation sent successfully",
        collaborator,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "User already invited to this project" });
      }

      console.error(err);
      res.status(500).json({ message: "Failed to send invite" });
    }
  }
);

export default router;