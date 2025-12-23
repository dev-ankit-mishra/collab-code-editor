import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { ChatMessage } from "../models/ChatMessage.js";

const router = express.Router();

/**
 * GET /api/projects/:projectId/chat
 * Fetch chat history for a project
 */
router.get(
  "/projects/:projectId/chat",
  requireAuth,
  async (req, res) => {
    try {
      const { projectId } = req.params;

      const messages = await ChatMessage.find({ projectId })
        .sort({ createdAt: 1 }) // oldest → newest
        .limit(200); // safety limit

      res.json(messages);
    } catch (err) {
      console.error("❌ Chat history error:", err);
      res.status(500).json({ message: "Failed to load chat" });
    }
  }
);

export default router;
