// /routes/eventRoutes.js
import express from "express";
import { sendEventNewsletter } from "../services/newsletterScheduler.js";

const router = express.Router();

// POST /api/send-event
router.post("/send-event", async (req, res) => {
  const { subject, htmlContent } = req.body;

  if (!subject || !htmlContent) {
    return res.status(400).json({ message: "Subject and HTML content required" });
  }

  await sendEventNewsletter(subject, htmlContent);
  res.json({ message: "Event newsletter sent successfully" });
});

export default router;