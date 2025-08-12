import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";
import { ACCENT } from "../mock";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-3">
        <nav
          className={`h-14 flex items-center justify-between px-4 border ${
            scrolled ? "glass-nav border-white/10" : "bg-transparent border-transparent"
          } rounded-full`}
        >
          <a href="#home" className="font-extrabold tracking-tight text-white text-base">
            Daniel Ding<span style={{ color: ACCENT }}>•</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 rounded px-1"
              >
                {l.label}
              </a>
            ))}
            <a href="#projects">
              <Button className="text-black" style={{ backgroundColor: ACCENT }}>
                Explore
              </Button>
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-white/90"
              >
                {l.label}
              </a>
            ))}
            <a href="#projects" onClick={() => setOpen(false)}>
              <Button className="text-black w-full" style={{ backgroundColor: ACCENT }}>
                Explore
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}