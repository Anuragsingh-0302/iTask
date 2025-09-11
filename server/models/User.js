// server/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ek hi email se ek account
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // security
    },
    phone: {
      type: String,
      required: false, // optional
      match: [/^\d{10}$/, "Please enter a valid phone number"], // 10 digit ka
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
