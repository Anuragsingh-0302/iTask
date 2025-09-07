// src/App.jsx

// import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Todo from "./components/Todo";
import About from "./components/About"; // agar About banaya hai
import Services from "./components/Services"; // agar Services banaya hai
import Contact from "./components/Contact"; // agar Contact banaya hai
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="transition-all duration-200 ease-linear min-h-[100vh]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/about" element={<About />} />
        {/* aur bhi routes yahan daal sakta hai */}
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
