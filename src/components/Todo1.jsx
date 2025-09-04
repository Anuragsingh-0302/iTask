import React from "react";
import Line from "./line";
import Enter from "./Enter";
import Item from "./Item";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (isEditing) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = todo;
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo , isChecked: false }]);
      // Add a new todo item with a unique ID
    }

    setTodo("");
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    if (index === editIndex) {
      // Deleted the item being edited
      setIsEditing(false);
      setEditIndex(null);
      setTodo("");
    } else if (editIndex !== null && index < editIndex) {
      // Deleted an item above the one being edited
      setEditIndex(editIndex - 1);
    }
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setTodo(todos[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // const handleClick = (index) => {
  //   const updatedTodos = [...todos];
  //   updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
  //   setTodos(updatedTodos);
  // }

  const handleCheck = (e) => {
  const id = e.target.name;
  const Index = todos.findIndex(item => item.id === id);  // Fixed here
  if (Index === -1) return;

  const newTodos = [...todos];  // Creating a copy to avoid mutation
  newTodos[Index].isChecked = !newTodos[Index].isChecked;
  setTodos(newTodos);
};



  return (
    <div className="w-[60vw] mx-auto mt-4 min-h-[85vh] bg-slate-300 rounded-[20px] p-5">
      <h1 className="text-center mb-4 ">
        <span
          className="text-3xl font-bold inline-block lg:w-[40%] w-[80%]  shadow-xl  rounded-[20px] p-2"
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
      <Line />
      {todos.map((item, index) => (
        <Item
          key={index}
          text={item}
          onCheck={() => handleCheck(index)}
          onDelete={() => handleDelete(index)}
          onEdit={() => handleEdit(index)}
        />
      ))}
    </div>
  );
};

export default Todo;
