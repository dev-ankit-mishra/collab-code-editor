import { Router } from "express";
import { Project } from "../models/Project.js";
import { UserData } from "../models/UserData.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireProjectAccess } from "../middleware/requireProjectAccess.js";

const router = Router();

router.use(requireAuth);

/* CREATE PROJECT (OWNER) */
router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { projectName, code, template } = req.body;

  const project = await Project.create({
    userId,
    projectName,
    code,
    template,
  });

  await UserData.updateOne(
    { userId },
    { $push: { projectObject: project._id } }
  );

  res.status(201).json(project);
});

/* MY PROJECTS (OWNER ONLY) */
router.get("/", async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
});

/* =========================================
   RECENT PROJECTS (OWNER + SHARED)
   ========================================= */
router.get("/recent",requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    /* ---------- OWN PROJECTS ---------- */
    const ownedProjects = await Project.find({
      userId,
    }).lean();

    /* ---------- SHARED PROJECT IDS ---------- */
    const sharedProjectIds =
      await ProjectCollaborator.distinct("projectId", {
        userId,
        status: "ACCEPTED",
      });

    /* ---------- SHARED PROJECTS ---------- */
    const sharedProjects =
      sharedProjectIds.length === 0
        ? []
        : await Project.find({
            _id: { $in: sharedProjectIds },
            userId: { $ne: userId }, // avoid duplicates
          }).lean();

    /* ---------- MERGE + SORT ---------- */
    const recentProjects = [...ownedProjects, ...sharedProjects]
      .sort(
        (a, b) =>
          new Date(b.updatedAt) - new Date(a.updatedAt)
      )
      .slice(0, 5);

    return res.json(recentProjects);
  } catch (err) {
    console.error("❌ Recent projects error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch recent projects" });
  }
});


/* OPEN PROJECT (OWNER + EDITOR + VIEWER) */
router.get(
  "/:projectId",
  requireProjectAccess("VIEWER"),
  (req, res) => {
    res.status(200).json({
      project: req.project,
      role: req.role,
    });
  }
);

/* UPDATE PROJECT (OWNER + EDITOR) */
router.put(
  "/:projectId",
  requireProjectAccess("EDITOR"),
  async (req, res) => {
    Object.assign(req.project, req.body);
    await req.project.save();
    res.json(req.project);
  }
);

/* DELETE PROJECT (OWNER ONLY) */
router.delete(
  "/:projectId",
  requireProjectAccess("OWNER"),
  async (req, res) => {
    await req.project.deleteOne();

    await UserData.updateOne(
      { userId: req.user.id },
      { $pull: { projectObject: req.project._id } }
    );

    res.json({ message: "Project deleted" });
  }
);

export default router;
