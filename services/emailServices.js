import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Gmail App Password
//   },
// });

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,          // ✅ CHANGE THIS
  secure: false,      // ✅ VERY IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// export const sendEmail = async (to, subject, html) => {
//   return transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html,
//   });
// };

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Kachi James Gallery" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};