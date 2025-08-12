import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sections from "./components/Sections";
import { Toaster } from "./components/ui/toaster";
import Lenis from "lenis";

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (x) => 1 - Math.pow(1 - x, 3),
      smoothWheel: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (a && a.getAttribute('href').length > 1) {
        const target = a.getAttribute('href');
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -10 });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);
}

function Home() {
  useLenis();
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