// server/utils/receiveEmail.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const receiveEmail = async ({ name, email, message }) => {
  try {
    // Transporter config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Developer ka email
      subject: `📩 New Contact Message from ${name}`,
      text: `
New contact form message:

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, message: "Failed to send message" };
  }
};
