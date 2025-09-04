import React from "react";
import { CheckCircle, Clock, Users } from "lucide-react"; // lucide-react icons use karein

const Services = () => {
  const services = [
    {
      title: "Task Management",
      desc: "Easily add, edit, and delete tasks to stay organized.",
      icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Deadline Tracking",
      desc: "Set deadlines and reminders to never miss important tasks.",
      icon: <Clock className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Team Collaboration",
      desc: "Work together with your team and manage shared projects.",
      icon: <Users className="w-10 h-10 text-purple-600" />,
    },
  ];

  return (
    <div className="bg-[#69d7ff] py-10 mt-6 w-[90%] mx-auto rounded-3xl shadow-lg min-h-[80vh]">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Services
        </h1>
        <p className="text-gray-700 mt-2 text-sm md:text-base max-w-xl mx-auto">
          We offer a variety of services to help you manage your tasks
          effectively and boost productivity.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {service.title}
            </h2>
            <p className="text-gray-600 text-sm mt-2">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
