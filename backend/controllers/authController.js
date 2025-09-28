/* eslint-env node */
/* global process */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Resend } from "resend";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import dotenv from "dotenv";
dotenv.config();

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// 🟢 Signup Request → Send OTP
export const signupRequest = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone } = req.body;

    // already registered check
    const existingUser = await User.findOne({ email });
    console.log("existingUser:", existingUser);

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // OTP generate
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // DB me save karo
    await Otp.create({ email, otp, expiresAt, name, password, phone });

    // send email via Resend
    try {
      await resend.emails.send({
        from: `iTask Support <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: "🔐 Verify your iTask account",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background:#f4f7fb; padding:40px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.1); overflow:hidden;">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg,#2563eb,#1e40af); padding:20px; text-align:center;">
                <h1 style="color:#fff; margin:0; font-size:24px;">iTask</h1>
                <p style="color:#e0e7ff; margin:5px 0 0; font-size:14px;">Smart Task Management</p>
              </div>

              <!-- Body -->
              <div style="padding:30px;">
                <h2 style="color:#111827; font-size:22px; margin-bottom:15px;">Hello ${name},</h2>
                <p style="color:#374151; font-size:16px; line-height:1.6;">
                  Thanks for signing up! To complete your registration, please verify your email address by entering the following OTP:
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <div style="display:inline-block; background:#2563eb; color:#fff; font-size:28px; letter-spacing:6px; padding:16px 28px; border-radius:10px; font-weight:600; box-shadow:0 4px 10px rgba(37,99,235,0.4);">
                    ${otp}
                  </div>
                </div>

                <p style="color:#374151; font-size:15px;">
                  ⚠️ This OTP is valid for <b>10 minutes</b>. Please keep it secure and do not share it with anyone.
                </p>
                <p style="color:#6b7280; font-size:14px; margin-top:25px;">
                  If you didn’t request this, you can ignore this email.
                </p>
              </div>

              <!-- Footer -->
              <div style="background:#f9fafb; padding:15px; text-align:center; border-top:1px solid #e5e7eb;">
                <p style="margin:0; color:#6b7280; font-size:13px;">
                  © ${new Date().getFullYear()} iTask. All rights reserved.<br/>
                  <span style="color:#9ca3af;">Helping you stay organized ✅</span>
                </p>
              </div>
            </div>
          </div>
        `,
        text: `Hello ${name},\n\nYour OTP for verifying your iTask account is: ${otp}\n\nIt will expire in 10 minutes.\n\n- iTask Team`,
      });

      console.log("✅ Email sent successfully:", email);
    } catch (err) {
      console.error("❌ Email send failed:", err);
      return res.status(500).json({ message: "Email failed", error: err.message });
    }

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Verify OTP → Complete Signup
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log(req.body);

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const otpRecord = await Otp.findOne({ email, otp });
    console.log("otpRecord:", otpRecord);

    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(otpRecord.password, salt);

    // user create
    const newUser = await User.create({
      name: otpRecord.name,
      email,
      password: hashedPassword,
      phone: otpRecord.phone,
    });

    console.log("newUser:", newUser);

    // OTP delete
    await Otp.deleteMany({ email });

    // token generate
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// 🔵 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔴 Forgot Password (send reset link)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await resend.emails.send({
      from: `iTask Support <${process.env.FROM_EMAIL}>`,
      to: user.email,
      subject: "🔑 Reset your iTask password",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background:#f4f7fb; padding:40px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.1); overflow:hidden;">
            <div style="background:linear-gradient(135deg,#f59e0b,#d97706); padding:20px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:24px;">iTask</h1>
              <p style="color:#fde68a; margin:5px 0 0; font-size:14px;">Secure Password Recovery</p>
            </div>
            <div style="padding:30px;">
              <h2 style="color:#111827; font-size:22px; margin-bottom:15px;">Hello ${user.name},</h2>
              <p style="color:#374151; font-size:16px; line-height:1.6;">
                We received a request to reset your iTask account password. If this was you, click the button below to set a new password.
              </p>
              <div style="text-align:center; margin:30px 0;">
                <a href="${resetUrl}" target="_blank" style="background:#f59e0b; color:#fff; font-size:18px; font-weight:600; text-decoration:none; padding:14px 28px; border-radius:10px; display:inline-block;">
                  Reset Password
                </a>
              </div>
              <p style="color:#374151; font-size:15px;">
                ⚠️ This password reset link is valid for <b>15 minutes</b>. If you didn’t request a reset, you can safely ignore this email.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `Hello ${user.name},\n\nWe received a request to reset your iTask password.\nClick the link below:\n${resetUrl}\n\nThis link will expire in 15 minutes.\n\n- iTask Team`,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟠 Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟡 Change Password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "✅ Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
