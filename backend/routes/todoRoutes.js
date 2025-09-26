// server/routes/todoRoutes.js

import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/todos
 * @desc    Get all todos of logged-in user
 * @access  Private (JWT required)
 */
router.get("/", protect, getTodos);

/**
 * @route   POST /api/todos
 * @desc    Add new todo (with optional dueDate, priority, category)
 * @access  Private (JWT required)
 */
router.post("/", protect, addTodo);

/**
 * @route   PUT /api/todos/:id
 * @desc    Update a todo (can update todo text, dueDate, priority, category, isCompleted)
 * @access  Private (JWT required)
 */
router.put("/:id", protect, updateTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete a todo by ID
 * @access  Private (JWT required)
 */
router.delete("/:id", protect, deleteTodo);

export default router;

