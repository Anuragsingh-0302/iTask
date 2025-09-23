// server/services/reminderService.js

import cron from "node-cron";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send reminder email
const sendReminder = async (email, todo) => {
  await transporter.sendMail({
    from: `"iTask App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "⏰ Task Reminder",
    text: `Reminder: Your task "${todo.todo}" is due at ${todo.dueDate}. Please complete it.`,
  });
};

// Cron job to check for due tasks every hour
// cron job → har 5 minute check kare
cron.schedule("*/5 * * * *", async () => {
  const now = new Date();
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  // find todos jo abhi 2 ghante baad due hain aur completed nahi hain
  const todos = await Todo.find({
    isCompleted: false,
    dueDate: { $gte: now, $lte: twoHoursLater },
  }).populate("user");

  for (const todo of todos) {
    if (todo.user?.email) {
      await sendReminder(todo.user.email, todo);
      console.log(`📧 Reminder sent to ${todo.user.email} for task: ${todo.todo}`);
    }
  }
});