// server/controllers/authController.js
/* eslint-env node */
/* global process */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// 🟢 Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // check agar user already exist karta hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user create
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    // JWT token generate
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "90d" } // 3 months
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔵 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // user check
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // password compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // token generate
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
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

    // reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"iTask Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password.</p>
        <p>Click here to reset: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link is valid for 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟠 Reset Password (via email link)
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

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟡 Change Password (while logged in)
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // JWT middleware se aayega
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
