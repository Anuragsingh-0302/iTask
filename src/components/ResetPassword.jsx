// src/components/ResetPassword.jsx

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaLock } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams(); // ✅ URL se token lena
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        formData
      );

      setIsError(false);
      setMessage(res.data?.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Password reset failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full transform transition-transform hover:scale-105">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-400" />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full pl-10 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className="w-full pl-10 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            {loading ? "Resetting..." : "Reset Password"}
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
