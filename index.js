import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import pool from "./config/db.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { scheduleMonthlyNewsletter } from "./services/newsletterScheduler.js";

const app = express();

// ✅ CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.kachijames.com"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ ROUTES
app.use("/api", subscriberRoutes);
app.use("/api", eventRoutes);

// ✅ TEST ROUTE (VERY IMPORTANT FOR RENDER DEBUG)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ DATABASE CONNECTION CHECK
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ DB connected successfully!");
    client.release();
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();

// ✅ START CRON JOB (ONLY ONCE)
scheduleMonthlyNewsletter();

// ✅ PORT CONFIG (PRODUCTION SAFE)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});