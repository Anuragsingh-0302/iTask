import React from "react";

const Enter = ({ todo, handleChange, handleAdd }) => {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-between transition-all duration-200 ease-linear">
      <input
        onChange={handleChange}
        value={todo}
        className="bg-blue-100 inline-block sm:w-[80%] w-[90%] py-2 px-6 rounded-full my-4 transition-all duration-200 ease-linear"
        type="text"
        placeholder="Enter your todo"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <button
        onClick={handleAdd}
        className="bg-[#69d7ff] py-2 sm:px-6 px-[25vw] mb-3 sm:mb-0 font-semibold rounded-full transition-all duration-200 ease-linear"
      >
        Save
      </button>
    </div>
  );
};

export default Enter;
