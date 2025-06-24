import { useState } from "react";
import Navbar from "./components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className=" bg-richblack-900 min-h-screen text-white overflow-x-hidden">
      <Navbar></Navbar>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
