import { useState } from "react";
import Navbar from "./components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {

  return (
    <div className=" bg-richblack-900 min-h-screen text-white overflow-x-hidden">
      <Navbar></Navbar>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
