"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Magnetic({ children, strength = 0.18, className = "", as = "div", ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.35, ease: "power3.out" });
    };

    const reset = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);

  const Comp = as;
  return (
    <Comp ref={ref} className={className} {...props}>
      {children}
    </Comp>
  );
}
