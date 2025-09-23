// server/models/Otp.js

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, expires: 600 }, // 10 min auto-delete
  name: { type: String },
  password: { type: String },
  phone: { type: String },
});

export default mongoose.model("Otp", otpSchema);

