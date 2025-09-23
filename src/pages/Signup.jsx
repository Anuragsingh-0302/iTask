// src/components/Signup.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup-request",
        formData
      );

      setMessage(res.data.message || "OTP sent to your email!");

      // ✅ OTP verify page pe email ke saath bhejna
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full transform transition-transform hover:scale-102">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-0 hover:border-blue-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-0 hover:border-blue-400 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-0 hover:border-blue-400 transition"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-0 hover:border-blue-400 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
          >
            {loading ? "Sending OTP..." : "Signup"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-600 text-sm">{message}</p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
