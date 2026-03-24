//import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Gmail App Password
//   },
// });

// import nodemailer from "nodemailer";

// console.log("📌 EMAIL_USER:", process.env.EMAIL_USER);
// console.log("📌 EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");



// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,          // ✅ CHANGE THIS
//   secure: false,      // ✅ VERY IMPORTANT
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


// export const sendEmail = async (to, subject, html) => {
//   return transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html,
//   });
// };

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Kachi James Gallery" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent:", info.messageId);
//   } catch (error) {
//     console.error("❌ Email failed:", error);
//   }
// };


import SibApiV3Sdk from "sib-api-v3-sdk";

// 🔍 Check env once at startup
const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
  console.error("❌ BREVO API KEY NOT SET");
} else {
  console.log("✅ BREVO API KEY LOADED");
}

// 🔧 Initialize Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// 📤 Send Email Function
export const sendEmail = async (to, subject, html) => {
  console.log("📤 Sending email to:", to);

  try {
    const result = await tranEmailApi.sendTransacEmail({
      sender: {
        email: "kachijamesgallery1@gmail.com", // must be verified in Brevo
        name: "Kachi James Gallery",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully:", result?.messageId || result);
    return result;

  } catch (error) {
    console.error(
      "❌ Brevo error:",
      error?.response?.body || error.message || error
    );
    throw error; // 🔥 important for debugging upstream
  }
};