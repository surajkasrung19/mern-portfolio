import { verifyAdminToken } from "../utils/adminToken.js";

export const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: "Admin access required." });
  }

  return next();
};
