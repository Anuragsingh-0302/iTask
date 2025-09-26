// src/components/Item.jsx

import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Item = ({ text, showFinished, onCheck, onDelete }) => {
  if (!showFinished && text.isChecked) return null;

  // Format date if available
  const formatDate = (date) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      className={`flex items-center justify-between bg-white p-4 rounded-xl shadow-md mb-3 transition-all duration-200 ${
        text.isChecked ? "opacity-70 line-through" : ""
      }`}
    >
      {/* Left: Checkbox + Todo text */}
      <div className="flex items-center gap-3">
        <button onClick={onCheck} className="text-blue-600 text-2xl">
          {text.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>
        <span className="font-medium text-lg">{text.todo}</span>
      </div>

      {/* Right: Details + Delete */}
      <div className="flex items-center gap-5">
        {/* Category */}
        <span className="px-3 py-1 text-sm rounded-lg bg-yellow-100 text-yellow-700">
          {text.category || "General"}
        </span>

        {/* Priority */}
        <span
          className={`px-3 py-1 text-sm rounded-lg ${
            text.priority === "high"
              ? "bg-red-100 text-red-700"
              : text.priority === "low"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {text.priority || "Medium"}
        </span>

        {/* Due Date */}
        <span className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700">
          {formatDate(text.dueDate)}
        </span>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 text-xl"
          title="Delete Todo"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Item;
