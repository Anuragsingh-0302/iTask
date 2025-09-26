// src/components/Contact.jsx

import React, { useState } from "react";
import {
  Mail,
  Linkedin,
  Instagram,
  Twitter,
  Github,
  Send,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { showError, showSuccess, showInfo, showWarning } from "../utils/toastUtils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);

      if (res.data.success) {
        setStatus("✅ Message sent successfully!");
        showSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Something went wrong. Try again later.");
      showError("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-[#d9f4ff] to-[#ffffff] py-16 my-10 w-[92%] mx-auto rounded-3xl shadow-xl">
      <div className="container mx-auto flex flex-col items-center px-6 md:px-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-base md:text-lg text-gray-700 text-center max-w-2xl mb-10">
          We’d love to hear from you! Reach out via email, connect with us on
          social media, or drop us a message directly.
        </p>

        {/* Email Section */}
        <div className="bg-white rounded-xl shadow-md p-5 md:p-6 flex items-center gap-3 mb-10 w-full max-w-md border border-gray-100">
          <Mail className="w-8 h-8 text-blue-600" />
          <p className="text-lg font-semibold text-gray-800">
            anuragsingh4006@gmail.com
          </p>
        </div>

        {/* Social Media Links */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect with us</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          <a
            href="https://www.linkedin.com/in/anurag-singh-155155173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition hover:scale-105"
          >
            <Linkedin className="w-10 h-10 text-blue-600 mb-2" />
            <span className="font-medium text-gray-800">LinkedIn</span>
          </a>
          <a
            href="https://github.com/Anuragsingh-0302"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition hover:scale-105"
          >
            <Github className="w-10 h-10 text-gray-800 mb-2" />
            <span className="font-medium text-gray-800">GitHub</span>
          </a>
          <a
            href="https://www.instagram.com/anuragsingh_0302/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition hover:scale-105"
          >
            <Instagram className="w-10 h-10 text-pink-600 mb-2" />
            <span className="font-medium text-gray-800">Instagram</span>
          </a>
          <a
            href="https://twitter.com/Anuragsingh0302"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition hover:scale-105"
          >
            <Twitter className="w-10 h-10 text-blue-400 mb-2" />
            <span className="font-medium text-gray-800">Twitter</span>
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-6 md:p-10 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Send us a Message
          </h3>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : <>
                <Send className="w-5 h-5" />
                Send Message
              </>}
            </button>
          </form>

          {status && (
            <p className="text-center text-sm mt-4 font-medium text-gray-700">
              {status}
            </p>
          )}

          <p className="text-center text-gray-600 text-sm mt-6">
            We usually reply within 24 hours 😊
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
