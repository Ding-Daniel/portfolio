export const ACCENT = "#ff2b2b";

export const hero = {
  name: "Daniel Ding",
  tagline: "High school student crafting bold, interactive web experiences.",
  subtext:
    "I love turning ideas into dramatic, high-performance interfaces with delightful motion.",
  ctas: [
    { label: "View Projects", href: "#projects", type: "primary" },
    { label: "Contact Me", href: "#contact", type: "ghost" },
  ],
};

export const projects = [
  {
    id: "p1",
    title: "Interactive Geometry Visualizer",
    description:
      "A playful geometry playground with real-time transformations and smooth motion.",
    image:
      "https://images.unsplash.com/photo-1646651024829-454814d2fb62",
    tags: ["React", "Canvas", "Motion"],
    link: "#",
  },
  {
    id: "p2",
    title: "Minimal Tech Patterns Pack",
    description:
      "A curated set of clean, high-contrast patterns optimized for dark UIs.",
    image:
      "https://images.unsplash.com/photo-1714899984906-a3e8f43025a0",
    tags: ["Design", "Accessibility", "Performance"],
    link: "#",
  },
  {
    id: "p3",
    title: "Ribbon Dynamics",
    description:
      "Dramatic curved ribbons with GPU-accelerated shaders and parallax.",
    image:
      "https://images.unsplash.com/photo-1652120268427-9ba66e870467",
    tags: ["WebGL", "Shaders", "UX"],
    link: "#",
  },
  {
    id: "p4",
    title: "Curve Synth Explorer",
    description:
      "Parametric curves, editable in-browser with buttery scroll interactions.",
    image:
      "https://images.unsplash.com/photo-1651467987631-1bcd570b9f7f",
    tags: ["Math", "Visualization", "React"],
    link: "#",
  },
  {
    id: "p5",
    title: "Dark Grid Toolkit",
    description:
      "Responsive grid experiments for dramatic yet readable layouts.",
    image: "https://images.pexels.com/photos/5691695/pexels-photo-5691695.jpeg",
    tags: ["Layout", "Design Systems", "Tailwind"],
    link: "#",
  },
];

export const blogs = [
  {
    id: "b1",
    title: "Choreographing Scroll: From Physics to Feeling",
    excerpt:
      "A deep dive into making scroll feel intentional using virtual scroll and velocity-based easing.",
    date: "2025-07-10",
    tags: ["Lenis", "UX", "Motion"],
    image: "https://images.unsplash.com/photo-1652120268427-9ba66e870467",
    link: "#",
  },
  {
    id: "b2",
    title: "Contrast, Clarity, Character",
    excerpt:
      "Why high-contrast dark UIs can be both accessible and dramatic when done right.",
    date: "2025-06-20",
    tags: ["Design", "Accessibility"],
    image: "https://images.unsplash.com/photo-1714899984906-a3e8f43025a0",
    link: "#",
  },
  {
    id: "b3",
    title: "GPU-accelerated Ribbons in the Browser",
    excerpt:
      "Exploring shader-based curves and how to keep them smooth at 60fps.",
    date: "2025-05-12",
    tags: ["WebGL", "Performance"],
    image: "https://images.unsplash.com/photo-1651467987631-1bcd570b9f7f",
    link: "#",
  },
];

export const skills = [
  {
    group: "Frontend",
    items: [
      { name: "React", level: 80 },
      { name: "TailwindCSS", level: 85 },
      { name: "Accessibility", level: 75 },
      { name: "Animations/Motion", level: 82 },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node/Express", level: 55 },
      { name: "FastAPI", level: 45 },
      { name: "MongoDB", level: 50 },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", level: 70 },
      { name: "Figma", level: 65 },
      { name: "Vite/CRA", level: 70 },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "#", icon: "github" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Email", href: "#contact", icon: "mail" },
];