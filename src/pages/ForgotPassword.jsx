// src/components/ForgotPassword.jsx

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setIsError(false);
      setMessage(res.data?.message || "Password reset link sent!");
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full transform transition-transform hover:scale-102">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your registered email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-blue-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            {loading ? "Sending..." : "Send Reset Link"}
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
          Back to{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
