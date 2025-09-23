// server/controllers/todoController.js

import Todo from "../models/Todo.js";

// 🔹 Get all todos (sirf logged-in user ke)
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch todos",
      details: err.message,
    });
  }
};

// 🔹 Add new todo
export const addTodo = async (req, res) => {
  try {
    const { todo, dueDate, priority, category, isCompleted } = req.body;

    if (!todo || todo.trim() === "") {
      return res.status(400).json({ error: "Todo text is required" });
    }

    const newTodo = new Todo({
      todo,
      user: req.user.id, // ✅ link todo to logged-in user
      dueDate: dueDate ? new Date(dueDate) : null, // ensure proper Date object
      priority: priority || "medium",
      category: category || "general",
      isCompleted: isCompleted || false,
    });

    await newTodo.save();
    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add todo",
      details: err.message,
    });
  }
};

// 🔹 Update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ sirf apne hi todos update kar paaye
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body, // isme todo, dueDate, priority, category, isCompleted sab aa sakta hai
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or not authorized" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update todo",
      details: err.message,
    });
  }
};

// 🔹 Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ sirf apne hi todos delete kar paaye
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete todo",
      details: err.message,
    });
  }
};
