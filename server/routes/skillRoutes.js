import { Router } from "express";
import { isMongoReady } from "../config/database.js";
import { defaultSkills } from "../data/defaultSkills.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireMongo } from "../middleware/requireMongo.js";
import Skill from "../models/Skill.js";

const router = Router();

const normalizeSkillPayload = (body) => ({
  name: body.name?.trim(),
  category: body.category?.trim(),
  image: body.image?.trim() || "",
  level: body.level?.trim() || "",
});

router.get("/skills", async (_req, res) => {
  if (!isMongoReady()) {
    return res.json(defaultSkills);
  }

  const skills = await Skill.find().sort({ createdAt: 1 });
  return res.json(skills);
});

router.get("/admin/skills", requireAdmin, requireMongo, async (_req, res) => {
  const skills = await Skill.find().sort({ createdAt: 1 });
  return res.json(skills);
});

router.post("/admin/skills", requireAdmin, requireMongo, async (req, res) => {
  const payload = normalizeSkillPayload(req.body);

  if (!payload.name || !payload.category) {
    return res.status(400).json({ error: "Skill name and category are required." });
  }

  const skill = await Skill.create(payload);
  return res.status(201).json(skill);
});

router.put("/admin/skills/:id", requireAdmin, requireMongo, async (req, res) => {
  const payload = normalizeSkillPayload(req.body);
  const skill = await Skill.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    return res.status(404).json({ error: "Skill not found." });
  }

  return res.json(skill);
});

router.delete("/admin/skills/:id", requireAdmin, requireMongo, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  return res.json({ ok: true });
});

export default router;
