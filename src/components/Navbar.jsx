// src/components/Navbar.jsx

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#69d7ff] p-4">
      <div className="container mx-auto sm:flex-row flex-col flex justify-between items-center transition-all duration-200 ease-linear">
        <div className="logo flex mb-3 sm:mb-0 items-center justify-center gap-3 transition-all duration-200 ease-linear">
          <img className="w-8 h-8" src="../to-do.png" alt="logo" />
          <Link to="/" className=" text-xl font-bold">
            iTASK
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className=" font-semibold cursor-pointer hover:text-gray-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className=" font-semibold cursor-pointer hover:text-gray-500"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className=" font-semibold cursor-pointer hover:text-gray-500"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className=" font-semibold cursor-pointer hover:text-gray-500"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
