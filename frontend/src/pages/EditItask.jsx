// src/pages/EditItask.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditItask = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // 🔹 Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      if (isLoggedIn) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/todos`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTodos(res.data);
        } catch (err) {
          console.error("Error fetching todos", err);
        }
      } else {
        const localTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(localTodos);
      }
    };
    fetchTodos();
  }, [isLoggedIn, token]);

  // 🔹 Save Edit
  const handleSave = async () => {
    if (!editingTodo) return;

    if (isLoggedIn) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/todos/${editingTodo._id}`,
          editingTodo,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTodos((prev) =>
          prev.map((t) => (t._id === editingTodo._id ? editingTodo : t))
        );
      } catch (err) {
        console.error("Error updating todo", err);
      }
    } else {
      const updated = todos.map((t) =>
        t.id === editingTodo.id ? editingTodo : t
      );
      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
    }

    setEditingTodo(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/services")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow text-gray-700 transition"
      >
        ⬅ Back to Services
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        ✏️ Edit your iTask
      </h1>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id || todo.id}
              className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {editingTodo && editingTodo._id === todo._id ? (
                // 🔹 Edit Mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingTodo.todo}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, todo: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  />

                  <select
                    value={editingTodo.priority}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        priority: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <input
                    type="date"
                    value={
                      editingTodo.dueDate
                        ? new Date(editingTodo.dueDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  />

                  <input
                    type="text"
                    value={editingTodo.category}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        category: e.target.value,
                      })
                    }
                    placeholder="Category"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTodo(null)}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // 🔹 Display Mode
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {todo.todo}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Priority:</span>{" "}
                      {todo.priority || "medium"} |{" "}
                      <span className="font-medium">Category:</span>{" "}
                      {todo.category || "general"} |{" "}
                      <span className="font-medium">Due:</span>{" "}
                      {todo.dueDate
                        ? new Date(todo.dueDate).toLocaleDateString()
                        : "No due date"}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingTodo(todo)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EditItask;
