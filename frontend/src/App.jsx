import { useState } from "react";
import Navbar from "./components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import About from "./pages/About";

function App() {

  return (
    <div className=" bg-richblack-900 min-h-screen text-white overflow-x-hidden">
      <Navbar></Navbar>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
