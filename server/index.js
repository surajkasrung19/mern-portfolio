import "dotenv/config";
import app from "./app.js";
import { connectMongo } from "./config/database.js";

const port = process.env.PORT || 5000;

connectMongo().finally(() => {
  app.listen(port, () => {
    console.log(`Portfolio API server running on http://localhost:${port}`);
  });
});
