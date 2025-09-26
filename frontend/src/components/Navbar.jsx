// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaCog, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { user, logout } = useContext(AuthContext); // ✅ direct context use

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const menuItems = (
    <>
      <li>
        <Link
          to="/todo"
          className="font-semibold hover:text-gray-500"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="font-semibold hover:text-gray-500"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to="/services"
          className="font-semibold hover:text-gray-500"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="font-semibold hover:text-gray-500"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </li>

      {!user ? (
        <>
          <li>
            <Link
              to="/login"
              className="font-semibold hover:text-gray-500"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="font-semibold hover:text-gray-500"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </li>
        </>
      ) : (
        <li className="relative">
          {/* Settings button */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
          >
            <FaCog /> Settings
          </button>

          {/* Dropdown */}
          {settingsOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700 z-50">
              <li>
                <button
                  onClick={() => {
                    setSettingsOpen(false);
                    setMenuOpen(false);
                    // 👇 Abhi ke liye kuch nahi, aap bataoge kya karna hai
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaUserCircle className="text-blue-600" /> Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-red-500" /> Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-[#69d7ff] p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img className="w-8 h-8" src="../to-do.png" alt="logo" />
          <Link to="/" className="text-xl font-bold">
            iTASK
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">{menuItems}</ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Drawer Menu */}
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg w-[80%] transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">iTASK Menu</h2>
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>
            <ul className="flex flex-col gap-6">{menuItems}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
