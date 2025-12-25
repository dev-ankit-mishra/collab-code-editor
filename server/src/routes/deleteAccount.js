import express from "express";
import { supabaseAdmin } from "../supabaseAdmin.js";

const router = express.Router();

router.delete("/delete-account", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.replace("Bearer ", "");

    // 🔑 Verify user JWT
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = user.id;

    /* ===============================
       1. DELETE USER DATA (DB)
       =============================== */

    // Example tables (adjust to your schema)
    await supabaseAdmin.from("projects").delete().eq("owner_id", userId);
    await supabaseAdmin.from("collaborations").delete().eq("user_id", userId);
    await supabaseAdmin.from("users").delete().eq("id", userId);

    /* ===============================
       2. DELETE AUTH USER (SUPABASE)
       =============================== */
    const { error: deleteError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      throw deleteError;
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Delete account failed:", err);
    return res.status(500).json({
      error: "Failed to delete account",
    });
  }
});

export default router;
