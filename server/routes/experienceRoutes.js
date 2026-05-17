import { Router } from "express";
import { isMongoReady } from "../config/database.js";
import { defaultExperiences } from "../data/defaultExperiences.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireMongo } from "../middleware/requireMongo.js";
import Experience from "../models/Experience.js";

const router = Router();

const normalizeExperiencePayload = (body) => ({
  title: body.title?.trim(),
  company: body.company?.trim(),
  startYear: Number(body.startYear),
  endYear: body.endYear ? Number(body.endYear) : undefined,
  ongoing: Boolean(body.ongoing),
  description: body.description?.trim(),
  link: body.link?.trim() || "",
  linkLabel: body.linkLabel?.trim() || "",
});

router.get("/experiences", async (_req, res) => {
  if (!isMongoReady()) {
    return res.json(defaultExperiences);
  }

  const experiences = await Experience.find().sort({ startYear: -1, createdAt: -1 });
  return res.json(experiences);
});

router.get("/admin/experiences", requireAdmin, requireMongo, async (_req, res) => {
  const experiences = await Experience.find().sort({ startYear: -1, createdAt: -1 });
  return res.json(experiences);
});

router.post("/admin/experiences", requireAdmin, requireMongo, async (req, res) => {
  const payload = normalizeExperiencePayload(req.body);

  if (!payload.title || !payload.company || !payload.startYear || !payload.description) {
    return res.status(400).json({
      error: "Title, company, start year, and description are required.",
    });
  }

  const experience = await Experience.create(payload);
  return res.status(201).json(experience);
});

router.put("/admin/experiences/:id", requireAdmin, requireMongo, async (req, res) => {
  const payload = normalizeExperiencePayload(req.body);
  const experience = await Experience.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!experience) {
    return res.status(404).json({ error: "Experience not found." });
  }

  return res.json(experience);
});

router.delete("/admin/experiences/:id", requireAdmin, requireMongo, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  return res.json({ ok: true });
});

export default router;
