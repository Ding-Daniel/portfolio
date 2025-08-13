import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink } from "lucide-react";
import { hero, projects, skills, ACCENT, blogs } from "../mock";
import { useToast } from "../hooks/use-toast";
import Typewriter from "./Typewriter";
import axios from "axios";
import { API } from "../lib/api";

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.25 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateY(${px * 10}deg) rotateX(${py * -10}deg)`;
    };
    const reset = () => { el.style.transform = "rotateY(0deg) rotateX(0deg)"; };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", handle); el.removeEventListener("mouseleave", reset); };
  }, []);
  return ref;
}

function SectionLine() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) el.classList.add("in-view"); }); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="overflow-hidden mt-4" aria-hidden>
      <div ref={ref} className="section-line" />
    </div>
  );
}

export default function Sections() {
  useReveal();
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Brighter, multi-accent glow blend within discipline */}
        <div className="hero-glow" style={{ background: "radial-gradient(1000px 520px at 20% 20%, rgba(255,43,43,0.22), transparent 60%), radial-gradient(1100px 540px at 75% 25%, rgba(255,162,162,0.16), transparent 64%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent 40%)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-32">
        <div data-reveal className="reveal-up max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-white/70"><Typewriter triggerOnView text="Portfolio" duration={800} /></p>
          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold leading-[1.05] heading-font">{hero.name}</h1>
          <p className="mt-4 text-xl text-white/80"><Typewriter triggerOnView text={hero.tagline} /></p>
          <p className="mt-2 text-white/60 max-w-xl"><Typewriter triggerOnView text={hero.subtext} /></p>
          <div className="mt-8 flex gap-3">
            {hero.ctas.map((c) => (
              <a key={c.label} href={c.href}>
                <Button className={`h-11 px-6 ${c.type === "ghost" ? "bg-transparent border border-white/20 text-white" : "text-black"}`} style={c.type === "ghost" ? {} : { backgroundColor: ACCENT }}>
                  {c.label}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 group">
        <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
          <div className="h-4 w-[2px] bg-white/70 group-hover:translate-y-1 transition-transform duration-300" />
        </div>
      </a>
    </section>
  );
}