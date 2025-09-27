// server/server.js
/* eslint-env node */
/* global process */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js"; // 👈 import routes
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // 👈 import contact routes
// ⏰ reminder service import (background scheduler)
import "./services/reminderService.js";

dotenv.config(); // .env load ho gaya

// DB connect
connectDB();

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes); // 👈 ab routes register ho gaye

app.use("/api/contact", contactRoutes); // 👈 contact routes register ho gaye

// test route
app.get("/", (req, res) => {
  res.send("iTask Backend is running 🚀");
});

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});
