// src/pages/Services.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8 my-10 rounded-2xl shadow-2xl mx-auto w-[92%] md:w-[80%] lg:w-[60%]">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Our <span className="text-blue-600">Services</span>
      </h1>

      {/* Service Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Edit iTask Card */}
        <div
          className="group relative bg-white shadow-lg p-8 rounded-2xl cursor-pointer border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all"
          onClick={() => navigate("/services/edit-itask")}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition">
              <PencilSquareIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit your iTask
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Manage and update your todos with <span className="font-medium">priority</span>,{" "}
            <span className="font-medium">category</span>, and{" "}
            <span className="font-medium">due dates</span>. Stay organized with ease.
          </p>
          <span className="absolute bottom-4 right-4 text-blue-600 font-semibold group-hover:underline">
            Get Started →
          </span>
        </div>

        {/* Future Service Example */}
        <div className="relative bg-white shadow-lg p-8 rounded-2xl border border-gray-200 opacity-80">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <ChartBarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Analytics (Coming Soon)
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Track your productivity with smart insights and visual reports to
            boost efficiency.
          </p>
          <span className="absolute bottom-4 right-4 text-gray-400 font-semibold">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services;
