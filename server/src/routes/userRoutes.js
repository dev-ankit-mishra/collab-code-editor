import express from "express";
import { UserData } from "../models/UserData.js";
import { Project } from "../models/Project.js";
import { ProjectCollaborator } from "../models/ProjectCollaborator.js";
import { supabaseAdmin } from "../supabaseAdmin.js";

const userRouter = express.Router();

/* =================================================
   CREATE USER
   ================================================= */
userRouter.post("/create-user", async (req, res) => {
  const { userName, userId, userEmail } = req.body;

  if (!userName || !userId || !userEmail) {
    return res.status(400).json({
      message: "userName, userId, and userEmail are required",
    });
  }

  try {
    const existingUser = await UserData.findOne({ userId });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        data: existingUser,
      });
    }

    const newUser = new UserData({ userName, userId, userEmail });
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "Successfully created new user",
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error?.message || "Unknown server error",
    });
  }
});

/* =================================================
   GET USER DATA
   ================================================= */
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await UserData.findOne({ userId: id });

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

/* =================================================
   GET USER PROJECT STATS ✅ (FIXED)
   ================================================= */
userRouter.get("/project-stats", async (req, res) => {
  try {
    /* ---------- AUTH ---------- */
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = user.id;

    /* ---------- CREATED BY USER ---------- */
    const createdByYou = await Project.countDocuments({
      userId,
    });

    /* ---------- COLLABORATED PROJECTS ---------- */
    const collaboratedProjectIds =
      await ProjectCollaborator.distinct("projectId", {
        userId,
        status: "ACCEPTED",
      });

    const collaboratedProjects =
      collaboratedProjectIds.length === 0
        ? 0
        : await Project.countDocuments({
            _id: { $in: collaboratedProjectIds },
            userId: { $ne: userId }, // avoid counting owned projects
          });

    /* ---------- TOTAL ---------- */
    const totalWorkedOn =
      createdByYou + collaboratedProjects;

    return res.json({
      totalWorkedOn,
      createdByYou,
      collaboratedProjects,
    });
  } catch (err) {
    console.error("❌ Project stats error:", err);
    return res.status(500).json({
      error: "Failed to fetch project stats",
    });
  }
});

export default userRouter;
