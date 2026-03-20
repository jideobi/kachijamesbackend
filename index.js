import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import pool from "./config/db.js"; 
import subscriberRoutes from "./routes/subscriberRoutes.js";
import { scheduleMonthlyNewsletter } from "./services/newsletterScheduler.js";
import eventRoutes from "./routes/eventRoutes.js";


// Start cron jobs
scheduleMonthlyNewsletter();

const app = express();

//pp.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",      // local dev
      "https://www.kachijames.com" // live site
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());


pool.connect()
  .then(client => {
    console.log("✅ DB connected successfully!");
    client.release(); // release connection back to pool
  })
  .catch(err => {
    console.error("❌ DB connection error:", err);
  });

  //console.log("DATABASE_URL:", process.env.DATABASE_URL);


  // Routes
app.use("/api", subscriberRoutes);

// Start cron jobs
scheduleMonthlyNewsletter();

// send event newsletter
app.use("/api", eventRoutes);



app.listen(5000, () => console.log("Server running on port 5000"));
