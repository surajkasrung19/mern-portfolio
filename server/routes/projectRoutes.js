import { Router } from "express";
import { isMongoReady } from "../config/database.js";
import { defaultProjects } from "../data/defaultProjects.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireMongo } from "../middleware/requireMongo.js";
import Project from "../models/Project.js";
import { normalizeProjectPayload } from "../utils/normalizeProjectPayload.js";

const router = Router();

router.get("/projects", async (_req, res) => {
  if (!isMongoReady()) {
    return res.json(defaultProjects);
  }

  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  return res.json(projects);
});

router.get("/admin/projects", requireAdmin, requireMongo, async (_req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  return res.json(projects);
});

router.post("/admin/projects", requireAdmin, requireMongo, async (req, res) => {
  const payload = normalizeProjectPayload(req.body);

  if (!payload.title || !payload.description) {
    return res.status(400).json({ error: "Title and description are required." });
  }

  const project = await Project.create(payload);
  return res.status(201).json(project);
});

router.put("/admin/projects/:id", requireAdmin, requireMongo, async (req, res) => {
  const payload = normalizeProjectPayload(req.body);
  const project = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }

  return res.json(project);
});

router.delete("/admin/projects/:id", requireAdmin, requireMongo, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  return res.json({ ok: true });
});

export default router;
