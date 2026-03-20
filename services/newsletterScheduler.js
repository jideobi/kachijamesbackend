// /services/newsletterScheduler.js
import cron from "node-cron";
import pool from "../config/db.js";
import { sendEmail } from "./emailServices.js";

// Function to send newsletter to all subscribers
export const sendMonthlyNewsletter = async () => {
  try {
    const result = await pool.query("SELECT email FROM subscribers");
    const subscribers = result.rows;

    for (const subscriber of subscribers) {
      await sendEmail(
        subscriber.email,
        "Monthly Newsletter 📰",
        `<h2>Hello!</h2>
        <p>Here’s our latest news, updates, and events for this month.</p>
        <p>Visit our site for more info!</p>`
      );
    }

    console.log("✅ Monthly newsletter sent to all subscribers");
  } catch (err) {
    console.error("❌ Error sending newsletter:", err);
  }
};

// Schedule monthly newsletter: 1st of every month at 10:00 AM
export const scheduleMonthlyNewsletter = () => {
  cron.schedule("0 10 1 * *", () => {
    console.log("📅 Sending monthly newsletter...");
    sendMonthlyNewsletter();
  });
};

// Function to send event-based newsletter immediately
export const sendEventNewsletter = async (subject, htmlContent) => {
  try {
    const result = await pool.query("SELECT email FROM subscribers");
    const subscribers = result.rows;

    for (const subscriber of subscribers) {
      await sendEmail(subscriber.email, subject, htmlContent);
    }

    console.log("✅ Event newsletter sent to all subscribers");
  } catch (err) {
    console.error("❌ Error sending event newsletter:", err);
  }
};