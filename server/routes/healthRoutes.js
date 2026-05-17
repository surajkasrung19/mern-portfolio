import { Router } from "express";
import { getMongoStatus } from "../config/database.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, ...getMongoStatus() });
});

export default router;
