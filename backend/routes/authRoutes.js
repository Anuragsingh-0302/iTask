// server/routes/authRoutes.js

import express from "express";
import {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  signupRequest,
  verifyOtp,
  updateProfile
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🟢 OTP Based Signup
router.post("/signup-request", signupRequest); // step 1 → OTP bhejna
router.post("/verify-otp", verifyOtp);         // step 2 → OTP verify + user create

// 🔵 Normal Login
router.post("/login", login);

// 🔑 Forgot Password → reset link email me bhejna
router.post("/forgot-password", forgotPassword);

// ♻️ Reset Password → email link se aakar naya password set karna
router.post("/reset-password/:token", resetPassword);

// 🔒 Change Password → login hone ke baad (JWT required)
router.put("/change-password", protect, changePassword);

router.put("/update-profile", protect, updateProfile);

export default router;

