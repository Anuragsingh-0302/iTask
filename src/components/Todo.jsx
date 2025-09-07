// src/components/Todo.jsx

import React, { useEffect } from "react";
import Line from "./line";
import Enter from "./Enter";
import Item from "./Item";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmD from "./confirmD";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showFinished, setShowFinished] = useState(true);

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  // saveToLS();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    try {
      if (storedTodos) {
        const parsed = JSON.parse(storedTodos);
        setTodos(parsed);
      }
    } catch (err) {
      console.error("Error parsing todos from localStorage", err);
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (isEditing) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { ...updatedTodos[editIndex], todo }; // Updating only the todo text
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isChecked: false }]);
      // Add a new todo item with a unique ID
    }
    setTodo("");
    saveToLS(todos);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return; // If user cancels, do nothing
    const newTodos = todos.filter((item) => item.id !== id); // Filter out the deleted todo by id
    if (id === todos[editIndex]?.id) {
      // Deleted the item being edited
      setIsEditing(false);
      setEditIndex(null);
      setTodo("");
    } else if (
      editIndex !== null &&
      todos[editIndex]?.id &&
      todos[editIndex]?.id > id
    ) {
      // Deleted an item above the one being edited
      setEditIndex(editIndex - 1); // Adjusting editIndex if the deleted item was above the edited item
    }
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (id) => {
    const index = todos.findIndex((item) => item.id === id);
    if (todos[index].isChecked) {
      alert("You can't edit a finished todo");
      setTodo("");
      setIsEditing(false);
      setEditIndex(null);
      return;
    }
    setTodo(todos[index].todo);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleCheck = (id) => {
    const index = todos.findIndex((item) => item.id === id); // Finding the todo by id
    if (index === -1) return; // If not found, do nothing
    const newTodos = [...todos]; // Creating a copy to avoid mutation
    newTodos[index].isChecked = !newTodos[index].isChecked; // Toggle the checked state
    setTodos(newTodos);
    saveToLS(todos);
  };

  return (
    <div
      className="lg:w-[60vw] w-[95vw] mx-auto mt-4 min-h-screen bg-slate-300 rounded-[20px] p-5 shadow-lg transition-all duration-200 ease-linear"
      style={{ boxShadow: "0 4px 8px #69d7ff" }}
    >
      <h1 className="text-center mb-4">
        <span
          className="text-3xl font-bold inline-block lg:w-[40%] w-[80%] shadow-lg rounded-[20px] p-2 transition-all duration-200 ease-linear"
          style={{ boxShadow: "0 4px 8px #69d7ff" }}
        >
          YOUR TODOS
        </span>
      </h1>
      <div>
        <h2 className="text-2xl font-bold">Add your todos</h2>
      </div>
      <div>
        <Enter todo={todo} handleChange={handleChange} handleAdd={handleAdd} />
      </div>
      <div className="showF">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
            className="mr-2"
          />
          Show Finished
        </label>
      </div>
      <Line />
      {todos.map((item) => (
        <Item
          showFinnished={showFinished}
          key={item.id} // Use item.id as key for unique identification
          text={item}
          onCheck={() => handleCheck(item.id)} // Pass item.id to handleCheck
          onDelete={() => handleDelete(item.id)} // Pass item.id to handleDelete
          onEdit={() => handleEdit(item.id)} // Pass item.id to handleEdit
        />
      ))}
      {todos.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No todos available. Please add some!
        </div>
      )}
      <div className="comp flex items-center justify-around mt-4">
        {todos.length > 0 && (
          <div className="text-center text-gray-500 mt-4">
            You have {todos.length} todo{todos.length > 1 ? "s" : ""}.
          </div>
        )}
        {todos.length > 0 && (
          <div className="text-center text-gray-500 mt-4">
            {todos.filter((item) => item.isChecked).length} completed
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
