// src/components/Login.jsx

import { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { showError, showSuccess, showInfo, showWarning } from "../utils/toastUtils";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // AuthContext se login function

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );

      if (res.data?.token && res.data?.user) {
        // ✅ AuthContext ke through login call
        login(res.data.token, res.data.user);

        setIsError(false);
        setMessage("Login successful!");
        showSuccess("Login successful!");
        navigate("/todo"); // dashboard ya todo page par redirect
      } else {
        setIsError(true);
        setMessage("Invalid response from server.");
        showError("Invalid response from server.");
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Login failed");
      showError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full transform transition-transform hover:scale-102">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-blue-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* 🔹 Forgot Password link */}
          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
