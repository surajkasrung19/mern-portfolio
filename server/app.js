import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-portfolio-jade.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", skillRoutes);
app.use("/api", experienceRoutes);
app.use("/api", contactRoutes);

export default app;
