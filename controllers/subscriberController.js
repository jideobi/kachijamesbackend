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
            "Welcome to Kachi James Gallery 🎉",
            `
 <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
            <td align="center">

                <!-- Card -->
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.2);">

                    <!-- Header -->
                    <tr>
                        <td
                            style="background:linear-gradient(135deg,#16a34a,#059669); padding:30px; text-align:center; color:#ffffff;">
                            <h1 style="margin:0; font-size:28px;">Welcome 🎉</h1>
                            <p style="margin:8px 0 0; font-size:14px;">Kachi James Gallery Newsletter</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:30px; color:#111827;">
                            <h2 style="margin-top:0;">You're officially in 🚀</h2>

                            <p style="line-height:1.6;">
                                Thank you for subscribing to our newsletter.
                            </p>

                            <p style="line-height:1.6;">
                                You will now receive:
                            </p>

                            <ul style="padding-left:20px; line-height:1.8;">
                                <li>✨ Exclusive art updates</li>
                                <li>🎉 Upcoming events & exhibitions</li>
                                <li>💎 Special offers & insider access</li>
                            </ul>
                            <img src="https://i.ibb.co/q3kTjnKv/Kachi-James-Arts-Gallery-opening-in-Enugu.webp" />
                            <!-- Button -->
                            <div style="text-align:center; margin:30px 0;">
                                <a href="https://www.kachijames.com"
                                    style="background:#16a34a; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block;">
                                    Visit Our Website →
                                </a>
                            </div>

                            <p style="font-size:14px; color:#6b7280;">
                                We’re excited to have you with us.
                            </p>

                            <p style="margin-top:20px;">
                                <strong>Kachi James Gallery</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f3f4f6; padding:20px; text-align:center; font-size:12px; color:#6b7280;">
                            <p style="margin:0;">© ${new Date().getFullYear()} Kachi James Gallery</p>
                            <p style="margin:5px 0;">
                                Enugu, Nigeria
                            </p>
                            <p style="margin:5px 0;">
                                <a href="#" style="color:#6b7280; text-decoration:underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>

</html>
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