// src/components/Item.jsx

import React from "react";

const Item = ({showFinnished, text, onDelete, onEdit, onCheck }) => {
  return (showFinnished || !text.isChecked ) && (
    <div className="flex sm:flex-row flex-col justify-between items-center transition-all duration-200 ease-linear  rounded-[20px] px-3 py-2 mt-2.5 shadow-sm ">
      <div className="text flex items-center gap-4 sm:w-[80%] w-[90%] ">
        <input
          onChange={onCheck}
          type="checkbox"
          name={text.id} // Use text.id instead of todo.id
          checked={text.isChecked} // Bind checkbox state
          id={`todo-${text.id}`} // Unique ID for each checkbox
          className="w-4 h-4 mt-1 cursor-pointer"
        />
        <span
          className={`${
            text.isChecked ? "line-through" : ""
          } text-xl font-semibold w-[70%] break-words`}
          style={{
            wordWrap: "break-word", // Ensure the text breaks if too long
            whiteSpace: "normal", // Allow wrapping of long text
          }}
        >
          {text.todo}
        </span>
      </div>
      <div className="buttons sm:mt-0 mt-4 flex items-center justify-center transition-all duration-200 ease-linear sm:gap-4 gap-[15vw]">
        <div className="edit">
          <span
            onClick={onEdit}
            className="material-symbols-outlined hover:text-blue-500 cursor-pointer "
          >
            edit
          </span>
        </div>
        <div className="delete">
          <span
            onClick={onDelete}
            className="material-symbols-outlined hover:text-blue-500 cursor-pointer "
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item;
