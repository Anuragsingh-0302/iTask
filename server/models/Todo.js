// server/models/Todo.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
      trim: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    // ✅ har todo ek user se linked hoga
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ✅ new fields
    dueDate: {
      type: Date, // optional deadline
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      default: "general",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
