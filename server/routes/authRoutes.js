import { Router } from "express";
import { createAdminToken } from "../utils/adminToken.js";

const router = Router();

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return res.status(500).json({
      error: "Admin credentials are missing. Add ADMIN_USERNAME and ADMIN_PASSWORD to .env, then restart the server.",
    });
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid admin credentials." });
  }

  return res.json({ token: createAdminToken() });
});

export default router;
