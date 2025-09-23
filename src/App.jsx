// src/App.jsx

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Todo from "./components/Todo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import EditItask from "./pages/EditItask";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./pages/Profile";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto ">
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={<Navigate to="/todo" />}
          />

          {/* Auth routes */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/todo" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/todo" />}
          />
          <Route
            path="/verify-otp"
            element={!user ? <VerifyOtp /> : <Navigate to="/todo" />}
          />

          {/* Todo - Accessible for both Guest & Logged in users */}
          <Route path="/todo" element={<Todo />} />

          {/* Public routes */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Catch all - 404 */}
          <Route
            path="*"
            element={<h2 className="text-center">Page Not Found</h2>}
          />
          {/* Protected routes - Only for logged in users */}
          <Route path="/services/edit-itask" element={<EditItask />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
