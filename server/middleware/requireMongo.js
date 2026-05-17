import { getMongoStatus } from "../config/database.js";

export const requireMongo = (_req, res, next) => {
  const { mongoReady, mongoError } = getMongoStatus();

  if (!mongoReady) {
    return res.status(503).json({
      error: mongoError
        ? `MongoDB is not connected: ${mongoError}`
        : "MongoDB is not connected. Add MONGODB_URI to .env and restart the server.",
    });
  }

  return next();
};
