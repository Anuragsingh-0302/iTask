import React from "react";
import { Mail, Linkedin, Instagram, Twitter, Facebook, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-[#69d7ff] py-12 mt-8 w-[90%] mx-auto rounded-3xl shadow-lg">
      <div className="container mx-auto flex flex-col items-center px-6 md:px-12">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-gray-700 text-center max-w-2xl mb-8">
          We would love to hear from you! Feel free to reach out via email or
          connect with us on social platforms.
        </p>

        {/* Email Section */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 flex items-center gap-3 mb-8 w-full max-w-md">
          <Mail className="w-8 h-8 text-blue-600" />
          <p className="text-lg font-semibold text-gray-800">
            anuragsingh4006@gmail.com
          </p>
        </div>

        {/* Social Media Links */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Connect with us
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          <a
            href="https://linkedin.com/in/anuragsingh4006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-blue-700 transition"
          >
            <Linkedin className="w-10 h-10 mb-2" />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href="https://instagram.com/anuragsingh4006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-pink-600 transition"
          >
            <Instagram className="w-10 h-10 mb-2" />
            <span className="font-medium">Instagram</span>
          </a>
          <a
            href="https://twitter.com/anuragsingh4006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-sky-500 transition"
          >
            <Twitter className="w-10 h-10 mb-2" />
            <span className="font-medium">Twitter</span>
          </a>
          <a
            href="https://facebook.com/anuragsingh4006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition"
          >
            <Facebook className="w-10 h-10 mb-2" />
            <span className="font-medium">Facebook</span>
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Send us a Message
          </h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
