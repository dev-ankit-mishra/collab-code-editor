import { Router } from "express";
import { Project } from "../models/Project";

const router = Router();

router.get("/projects", async (_, res) => {
  const projects = await Project.find().sort({ time: -1 });
  res.json(projects);
});

router.post("/projects", async (req, res) => {
  const { name } = req.body;
  const newProject = await Project.create({ name });
  res.status(201).json(newProject);
});

export default router;
