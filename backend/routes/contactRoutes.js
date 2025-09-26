// routes/contactRoutes.js
import express from "express";
import { receiveEmail } from "../utils/receiveEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const result = await receiveEmail({ name, email, message });
  res.status(result.success ? 200 : 500).json(result);
});

export default router;
