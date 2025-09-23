// src/components/About.jsx

import React from "react";
import { FaTasks, FaBell, FaCloud, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-[#e0f7ff] to-white">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <img
          className="w-12 h-12 md:w-14 md:h-14"
          src="../to-do.png"
          alt="logo"
        />
        <a
          href="/"
          className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-800 hover:text-blue-600 transition-colors"
        >
          iTASK
        </a>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
        About <span className="text-blue-600">iTASK</span>
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center leading-relaxed mb-12">
        <span className="font-semibold text-gray-800">iTASK</span> is your
        personal productivity partner. We designed it to make task management
        simple, smart, and stress-free. Whether you are planning your day,
        organizing projects, or collaborating with others — iTASK keeps you
        focused and on track.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-start gap-4 hover:shadow-xl transition">
          <FaTasks className="text-blue-600 text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Easy Task Management
            </h3>
            <p className="text-gray-600">
              Add, edit, and delete tasks effortlessly with our intuitive
              interface.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-start gap-4 hover:shadow-xl transition">
          <FaBell className="text-blue-600 text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Smart Reminders
            </h3>
            <p className="text-gray-600">
              Stay ahead of deadlines with timely email and in-app reminders.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-start gap-4 hover:shadow-xl transition">
          <FaCloud className="text-blue-600 text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Cloud Sync
            </h3>
            <p className="text-gray-600">
              Access your tasks anywhere, anytime — your data stays in sync.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-start gap-4 hover:shadow-xl transition">
          <FaUsers className="text-blue-600 text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Team Collaboration
            </h3>
            <p className="text-gray-600">
              Share tasks and work together seamlessly with your team members.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At iTASK, our mission is to help people stay organized and reduce
          stress by giving them the right tools to manage their time effectively.
          We believe productivity should be simple, beautiful, and accessible
          for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
