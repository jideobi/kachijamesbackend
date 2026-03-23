import pool from "../config/db.js";
import { sendEmail } from "../services/emailServices.js";

// Subscribe user
export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email required" });
  }

  try {
    // ✅ Insert and RETURN result
    const result = await pool.query(
      "INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *",
      [email]
    );

    // 🔍 If no row returned → already exists
    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "⚠️ Email already subscribed",
        exists: true,
      });
    }

    // ✅ Send email (NON-BLOCKING)
    sendEmail(
      email,
      "Welcome to Our Newsletter 🎉",
      `
      <h2>Welcome 🎉</h2>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You will now receive updates, offers, and upcoming events.</p>
      <br/>
      <p><strong>Kachi James Gallery</strong></p>
      `
    ).catch(err => console.error("Email error:", err));

    return res.json({
      message: "✅ Subscribed successfully",
      exists: false,
    });

  } catch (err) {
    console.error("Subscribe error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subscribers ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};