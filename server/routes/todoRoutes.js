// routes/todoRoutes.js

import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);       // Get all todos
router.post("/", addTodo);       // Add new todo
router.put("/:id", updateTodo);  // Update todo
router.delete("/:id", deleteTodo); // Delete todo

export default router;
