import React, { useEffect, useRef } from "react";

// Interactive custom cursor for desktop pointers
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isInteractive = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor");

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const selectors = "a, button, [role=button], input, textarea, select, .card-accent";
    const onOver = (e) => {
      const match = e.target.closest(selectors);
      if (match) {
        isInteractive.current = true;
        ring.classList.add("cursor-active");
        dot.classList.add("cursor-active");
      }
    };
    const onOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest(selectors)) {
        isInteractive.current = false;
        ring.classList.remove("cursor-active");
        dot.classList.remove("cursor-active");
      }
    };

    const animate = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      pos.current.x += dx * 0.18; // easing
      pos.current.y += dy * 0.18;
      ring.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      requestAnimationFrame(animate);
    };
    const cleanup = () => document.body.classList.remove("custom-cursor");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    requestAnimationFrame(animate);

    return () => {
      cleanup();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}