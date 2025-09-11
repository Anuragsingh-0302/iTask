// server/controllers/todoController.js

import Todo from "../models/Todo.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos", details: err.message });
  }
};

// Add new todo
export const addTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo || todo.trim() === "") {
      return res.status(400).json({ error: "Todo text is required" });
    }

    const newTodo = new Todo({ todo });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo", details: err.message });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo", details: err.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo", details: err.message });
  }
};
