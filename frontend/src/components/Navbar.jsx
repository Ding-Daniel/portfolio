import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";
import { ACCENT } from "../mock";
import gsap from "gsap";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#blogs", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "power3.out" });
    } else {
      gsap.to(el, { y: -16, opacity: 0, duration: 0.26, ease: "power2.in" });
    }
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-3">
        <nav className={`h-14 flex items-center justify-between px-4 border ${scrolled ? "glass-nav border-white/10" : "bg-transparent border-transparent"} rounded-full`}>
          <a href="#home" className="font-extrabold tracking-tight text-white text-base heading-font">
            Daniel Ding<span style={{ color: ACCENT }}>•</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 rounded px-1">
                {l.label}
              </a>
            ))}
            <a href="#projects">
              <Button className="text-black" style={{ backgroundColor: ACCENT }}>Explore</Button>
            </a>
          </div>

          <button className="md:hidden inline-flex items-center justify-center p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 menu-overlay" onClick={() => setOpen(false)}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-3" onClick={(e) => e.stopPropagation()}>
            <div ref={panelRef} className="glass-nav rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-white heading-font">Menu</span>
                <button className="p-2" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <X className="text-white" />
                </button>
              </div>
              <div className="mt-3 grid gap-2">
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-white/90 hover:text-white">
                    {l.label}
                  </a>
                ))}
                <a href="#projects" onClick={() => setOpen(false)}>
                  <Button className="text-black w-full" style={{ backgroundColor: ACCENT }}>Explore</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}