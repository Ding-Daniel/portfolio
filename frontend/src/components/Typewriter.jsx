import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Typewriter({ text = "", duration = 1200, startDelay = 120, className = "", triggerOnView = false }) {
  const [out, setOut] = useState("");
  const [ready, setReady] = useState(!triggerOnView);
  const chars = useMemo(() => Array.from(text), [text]);
  const rafRef = useRef(null);
  const hostRef = useRef(null);

  // Observe visibility to trigger animation on scroll
  useEffect(() => {
    if (!triggerOnView) return;
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setReady(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!ready) return;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts + startDelay;
      const t = Math.max(0, ts - start);
      const progress = Math.min(1, t / duration);
      const visible = Math.round(progress * chars.length);
      setOut(chars.slice(0, visible).join(""));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [chars, duration, startDelay, ready]);

  return <span ref={hostRef} className={className}>{out}</span>;
}