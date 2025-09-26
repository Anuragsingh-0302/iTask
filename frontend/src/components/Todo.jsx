// src/components/Todo.jsx

import React, { useEffect, useState, useContext } from "react";
import Line from "./line";
import Enter from "./Enter";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { showError, showSuccess, showInfo, showWarning } from "../utils/toastUtils";

const Todo = () => {
  const { user } = useContext(AuthContext);

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // ----------------------------
  // LocalStorage helpers (Guest Mode)
  // ----------------------------
  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const loadFromLS = () => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        return JSON.parse(storedTodos);
      }
    } catch (err) {
      console.error("Error parsing todos from localStorage", err);
    }
    return [];
  };

  // ----------------------------
  // Load todos on mount
  // ----------------------------
  useEffect(() => {
    if (user) {
      const fetchTodos = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/todos", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setTodos(res.data);
        } catch (err) {
          console.error("Error fetching todos from backend", err);
        }
      };
      fetchTodos();
    } else {
      setTodos(loadFromLS());
    }
  }, [user]);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (e) => setTodo(e.target.value);

  const handleAdd = async () => {
    if (todo.trim() === "") return;

    const newTodo = {
      id: uuidv4(),
      todo,
      isChecked: false,
      dueDate: null,
      priority: "medium",
      category: "general",
      isCompleted: false,
    };

    if (user) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/todos",
          newTodo,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setTodos([...todos, res.data.todo]);
        showSuccess("Todo added");
      } catch (err) {
        console.error("Error adding todo", err);
      }
    } else {
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      saveToLS(newTodos);
    }

    setTodo("");
  };

  const handleDelete = async (id, backendId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;

    const newTodos = todos.filter((item) => (user ? item._id !== backendId : item.id !== id));
    setTodos(newTodos);

    if (user) {
      try {
        await axios.delete(`http://localhost:5000/api/todos/${backendId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        showInfo("Todo deleted");
      } catch (err) {
        console.error("Error deleting todo", err);
      }
    } else {
      saveToLS(newTodos);
    }
  };

  const handleCheck = async (id, backendId) => {
    const index = todos.findIndex((item) =>
      user ? item._id === backendId : item.id === id
    );
    if (index === -1) return;

    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);

    if (user) {
      try {
        await axios.put(
          `http://localhost:5000/api/todos/${backendId}`,
          newTodos[index],
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        showSuccess(`Todo marked as ${newTodos[index].isChecked ? "completed" : "incomplete"}`);
      } catch (err) {
        console.error("Error toggling todo", err);
      }
    } else {
      saveToLS(newTodos);
    }
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="lg:w-[60vw] w-[95vw] mx-auto my-10 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 shadow-2xl">
      {/* Heading */}
      <h1 className="text-center mb-6">
        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 drop-shadow-lg">
          iTask – Your Todos ({user ? "Online" : "Guest"})
        </span>
      </h1>

      {/* Add Section */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a new task</h2>
        <Enter todo={todo} handleChange={handleChange} handleAdd={handleAdd} />
      </div>

      {/* Show Finished Toggle */}
      <div className="flex items-center mb-4 gap-2">
        <input
          type="checkbox"
          checked={showFinished}
          onChange={() => setShowFinished(!showFinished)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-gray-700 font-medium">Show Finished</label>
      </div>

      <Line />

      {/* Todo List */}
      <div className="space-y-3 mt-4">
        {todos.length === 0 ? (
          <div className="text-center text-gray-500 italic">No todos yet. Add one above!</div>
        ) : (
          todos.map((item) => (
            <Item
              showFinished={showFinished}
              key={user ? item._id : item.id}
              text={item}
              onCheck={() => handleCheck(item.id, item._id)}
              onDelete={() => handleDelete(item.id, item._id)}
            />
          ))
        )}
      </div>

      {/* Summary */}
      {todos.length > 0 && (
        <div className="flex justify-between items-center bg-white shadow-inner rounded-xl p-4 mt-6 text-gray-700">
          <div className="font-medium">
            Total: <span className="font-bold">{todos.length}</span>
          </div>
          <div className="font-medium">
            Completed:{" "}
            <span className="font-bold text-green-600">
              {todos.filter((item) => item.isChecked).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
