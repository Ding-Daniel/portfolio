import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sections from "./components/Sections";
import { Toaster } from "./components/ui/toaster";
import Lenis from "lenis";

function useLenisAndBob() {
  useEffect(() => {
    // Lenis smooth scroll
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

    // Anchor links interception
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

    // Scroll bob on wheel
    let ticking = false;
    let lastTime = 0;
    const onWheel = (e) => {
      const now = Date.now();
      if (ticking && now - lastTime < 100) return; // throttle
      lastTime = now;
      ticking = true;
      const cls = e.deltaY > 0 ? "bob-down" : "bob-up";
      const nodes = document.querySelectorAll("[data-bob]");
      nodes.forEach((n) => {
        n.classList.remove("bob-up", "bob-down");
        // Force reflow to restart animation
        // eslint-disable-next-line no-unused-expressions
        n.offsetHeight;
        n.classList.add(cls);
      });
      setTimeout(() => (ticking = false), 80);
    };
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onClick);
    };
  }, []);
}

function Home() {
  useLenisAndBob();
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