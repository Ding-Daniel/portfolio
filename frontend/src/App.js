import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sections from "./components/Sections";
import { Toaster } from "./components/ui/toaster";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Sections />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;