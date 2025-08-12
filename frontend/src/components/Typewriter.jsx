import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Typewriter({ text = "", duration = 1200, startDelay = 120, className = "" }) {
  const [out, setOut] = useState("");
  const chars = useMemo(() => Array.from(text), [text]);
  const rafRef = useRef(null);

  useEffect(() => {
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
  }, [chars, duration, startDelay]);

  return <span className={className}>{out}</span>;
}