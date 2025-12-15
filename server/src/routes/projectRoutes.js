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

/* MY PROJECTS */
router.get("/", async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
});

/* OPEN PROJECT (OWNER + VIEWER + EDITOR) */
router.get(
  "/:projectId",
  requireProjectAccess("VIEWER"),
  (req, res) => {
    res.json(req.project);
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
