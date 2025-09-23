// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#69d7ff] py-4 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Side - Copyright */}
        <p className="text-sm font-semibold text-gray-800 text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-red-400 font-bold">iTASK</span>. All rights reserved.
        </p>

        {/* Right Side - Links */}
        <div className="flex gap-6 mt-3 md:mt-0">
          <a
            href="/privacy"
            className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
