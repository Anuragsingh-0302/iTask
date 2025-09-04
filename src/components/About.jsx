import React from "react";

const About = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <img
          className="w-10 h-10 md:w-12 md:h-12"
          src="../to-do.png"
          alt="logo"
        />
        <a
          href="/"
          className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-800 hover:text-blue-600 transition-colors"
        >
          iTASK
        </a>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        About
      </h1>

      {/* Description */}
      <p className="text-base md:text-lg text-gray-600 max-w-2xl text-center leading-relaxed">
        <span className="font-semibold text-gray-800">iTASK</span> is a simple
        and efficient task management application designed to help you stay
        organized and productive. With its user-friendly interface, you can
        easily add, edit, and delete tasks, set deadlines, and track your
        progress. Whether you're managing personal projects or collaborating
        with a team, iTASK provides the tools you need to get things done.
      </p>
    </div>
  );
};

export default About;
