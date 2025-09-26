// src/components/VerifyOtp.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Signup se email mila

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Email not found. Please signup again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
        email,
        otp,
      });
      setMessage(res.data.message);

      // OTP verify ho gaya => Login page pe bhej do
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        OTP sent to <span className="font-semibold">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {message && <p className="text-center text-sm mt-4">{message}</p>}
    </div>
  );
}

export default VerifyOtp;
