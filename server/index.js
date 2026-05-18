import "dotenv/config";
import app from "./app.js";
import cors from "cors";
import { connectMongo } from "./config/database.js";

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-portfolio-jade.vercel.app",
    ],
     credentials: true,
  })
);

connectMongo().finally(() => {
  app.listen(port, () => {
    console.log(`Portfolio API server running on http://localhost:${port}`);
  });
});
