import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";

const router = Router();

/**
 * Get all pending invites for logged-in user
 */
router.get("/invites", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const invites = await ProjectCollaborator.find({
      userId,
      status: "PENDING",
    })
      .populate("projectId")
      .sort({ createdAt: -1 });

    res.status(200).json(invites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch invites" });
  }

});

/**
 * Accept a project invite
 */
router.post("/invites/:inviteId/accept", requireAuth, async (req, res) => {
  try {
    const { inviteId } = req.params;
    const userId = req.user.id;

    const invite = await ProjectCollaborator.findOne({
      _id: inviteId,
      userId,
      status: "PENDING",
    });

    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    invite.status = "ACCEPTED";
    await invite.save();

    res.status(200).json({
      message: "Invite accepted",
      invite,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to accept invite" });
  }
});

/**
 * Reject a project invite
 */
router.delete("/invites/:inviteId/reject", requireAuth, async (req, res) => {
  try {
    const { inviteId } = req.params;
    const userId = req.user.id;

    const deleted = await ProjectCollaborator.findOneAndDelete({
      _id: inviteId,
      userId,
      status: "PENDING",
    });

    if (!deleted) {
      return res.status(404).json({ message: "Invite not found" });
    }

    res.status(200).json({ message: "Invite rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject invite" });
  }
});
