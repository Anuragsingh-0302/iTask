// server/controllers/authController.js
/* eslint-env node */
/* global process */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import Otp from "../models/Otp.js"; // ✅ OTP model banana hoga
import dotenv from "dotenv";
dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


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

    // send email
    try {
      await transporter.sendMail({
        from: `"iTask Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Signup OTP Verification",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      });
      console.log("✅ Email sent successfully:", email);
    } catch (err) {
      console.error("❌ Email send failed:", err);
      return res
        .status(500)
        .json({ message: "Email failed", error: err.message });
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

    // OTP check
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const otpRecord = await Otp.findOne({ email, otp });
    console.log('otpRecord:', otpRecord);
    
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

    console.log('newUser:', newUser);
    

    // OTP delete
    await Otp.deleteMany({ email });

    // token generate
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name }, // ✅ name bhi add kiya
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
      { id: user._id, email: user.email, name: user.name }, // ✅ name bhi add kiya
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
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"iTask Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password.</p>
        <p>Click here to reset: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link is valid for 15 minutes.</p>
      `,
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
    const userId = req.user.id || req.user._id; // ✅ handle both cases
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
