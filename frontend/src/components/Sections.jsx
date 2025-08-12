import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink } from "lucide-react";
import { hero, projects, skills, socials, ACCENT, blogs } from "../mock";
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
    const reset = () => {
      el.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);
  return ref;
}

function SectionLine() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) el.classList.add("in-view"); });
    }, { threshold: 0.2 });
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
        <div
          className="hero-glow"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% 20%, rgba(255,43,43,0.22), transparent 60%)",
          }}
        />
        <div className="hero-glow"
          style={{
            background:
              "radial-gradient(900px 400px at 80% 30%, rgba(255,43,43,0.16), transparent 60%)",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(transparent 60%, rgba(255,255,255,0.04))" }} />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-32">
        <div data-reveal className="reveal-up max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-white/70">Portfolio</p>
          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold leading-[1.05]">Daniel Ding</h1>
          <p className="mt-4 text-xl text-white/80">High school student crafting bold, interactive web experiences.</p>
          <p className="mt-2 text-white/60 max-w-xl">I love turning ideas into dramatic, high-performance interfaces with delightful motion.</p>
          <div className="mt-8 flex gap-3">
            <a href="#projects">
              <Button className="h-11 px-6 text-black" style={{ backgroundColor: ACCENT }}>
                View Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button className="h-11 px-6 bg-transparent border border-white/20 text-white">
                Contact Me
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
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

function About() {
  return (
    <section id="about" className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-36">
        <div className="flex items-end justify-between gap-6" data-reveal>
          <h2 className="text-3xl font-bold">About</h2>
        </div>
        <SectionLine />
        <div className="mt-12 grid md:grid-cols-3 gap-12 items-start">
          <div data-reveal className="reveal-up md:col-span-2">
            <p className="text-white/80 leading-relaxed">
              <Typewriter triggerOnView text="I’m Daniel, a high school student fascinated by interactive design and motion. I enjoy building sites with strong personalities: bold type, dramatic reveals, and glassy layers—while keeping performance and accessibility in check." />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Motion-first mindset", "Clean, readable code", "Accessibility-aware", "High performance"].map((chip) => (
                <Badge key={chip} className="bg-white/10 text-white border border-white/10">{chip}</Badge>
              ))}
            </div>
          </div>

          <div data-reveal className="reveal-up md:col-span-1">
            <Card className="bg-white/5 border-white/10 card-accent">
              <CardHeader>
                <CardTitle style={{ color: ACCENT }}>At a glance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Stat label="Based in" value="" detail="" custom="Earth" />
                <Stat label="Focus" value="" detail="" custom="Web &amp; Motion" />
                <Stat label="Currently" value="" detail="" custom="High School" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, detail, custom }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60 text-sm">{label}</span>
      <span className="font-semibold" style={{ color: ACCENT }}>{custom || value}</span>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-36">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold">Projects</h2>
          <a href="#contact" className="text-sm text-white/70 hover:text-white">Let’s collaborate</a>
        </div>
        <SectionLine />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (<ProjectCard key={p.id} project={p} index={i} />))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const tiltRef = useTilt();
  return (
    <div data-reveal className="reveal-up">
      <Card ref={tiltRef} className="bg-white/5 border-white/10 group will-change-transform transition-transform duration-300 card-accent" style={{ transformStyle: "preserve-3d" }}>
        <div className="relative overflow-hidden rounded-t-md">
          <img src={project.image} alt={project.title} className="h-48 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {project.tags.map((t) => (<Badge key={t} className="bg-black/70 text-white border border-white/10">{t}</Badge>))}
          </div>
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg" style={{ color: ACCENT }}>{project.title}</CardTitle>
            <a href={project.link} aria-label="Open project">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="text-white/80 hover:text-white"><ExternalLink className="h-4 w-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Open</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 text-sm leading-relaxed"><Typewriter triggerOnView text={project.description} duration={900} /></p>
        </CardContent>
      </Card>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-36">
        <h2 className="text-3xl font-bold" data-reveal>Skills</h2>
        <SectionLine />
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {skills.map((bucket) => (
            <Card key={bucket.group} className="bg-white/5 border-white/10 reveal-up card-accent" data-reveal>
              <CardHeader>
                <CardTitle style={{ color: ACCENT }}>{bucket.group}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {bucket.items.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">{s.name}</span>
                      <span className="text-sm" style={{ color: ACCENT }}>{s.level}%</span>
                    </div>
                    <Progress value={s.level} className="h-2 bg-white/10" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  return (
    <section id="blogs" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-36">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold">Blog &amp; Research</h2>
          <a href="#" className="text-sm text-white/70 hover:text-white">All posts</a>
        </div>
        <SectionLine />
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <Card key={b.id} className="bg-white/5 border-white/10 reveal-up card-accent" data-reveal>
              <div className="relative overflow-hidden rounded-t-md">
                <img src={b.image} alt={b.title} className="h-40 w-full object-cover opacity-90" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle style={{ color: ACCENT }}>{b.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm leading-relaxed"><Typewriter triggerOnView text={b.excerpt} duration={900} /></p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {b.tags.map((t) => (<Badge key={t} className="bg-black/70 text-white border border-white/10">{t}</Badge>))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/contacts`, form, { headers: { 'Content-Type': 'application/json' } });
      toast({ title: "Message sent", description: `Thank you ${res.data.name}!` });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Something went wrong';
      toast({ title: "Failed to send", description: msg });
    }
  };

  return (
    <section id="contact" className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-36">
        <h2 className="text-3xl font-bold" data-reveal>Contact</h2>
        <SectionLine />
        <div className="mt-12">
          <Card className="bg-white/5 border-white/10 reveal-up card-accent max-w-4xl mx-auto" data-reveal>
            <CardHeader>
              <CardTitle style={{ color: ACCENT }}>Let’s build something bold</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <Input placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-black/40 border-white/15 text-white placeholder:text-white/40" />
                <Input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-black/40 border-white/15 text-white placeholder:text-white/40" />
                <Textarea placeholder="Tell me about your idea..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-black/40 border-white/15 text-white placeholder:text-white/40 min-h-[140px]" />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/60">Data will be saved securely in the backend.</div>
                  <Button type="submit" className="text-black" style={{ backgroundColor: ACCENT }}>Send</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
            <a href="#" className="inline-flex items-center gap-2 hover:text-white"><Github className="h-5 w-5" /> GitHub</a>
            <a href="#" className="inline-flex items-center gap-2 hover:text-white"><Linkedin className="h-5 w-5" /> LinkedIn</a>
            <a href="mailto:danielding.work@gmail.com" className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-5 w-5" /> danielding.work@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-white/60 text-sm">© {year} Daniel Ding</div>
        <div className="flex items-center gap-4">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
          <span className="text-white/60 text-sm">Built with care and motion</span>
        </div>
      </div>
    </footer>
  );
}