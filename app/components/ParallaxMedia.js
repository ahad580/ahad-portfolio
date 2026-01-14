"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxMedia({ src, alt = "", strength = 14 }) {
  const wrap = useRef(null);
  const img = useRef(null);

  useLayoutEffect(() => {
    if (!wrap.current || !img.current) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    gsap.to(img.current, {
      y: -strength,
      ease: "none",
      scrollTrigger: {
        trigger: wrap.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }, [strength]);

  return (
    <div ref={wrap} className="pmWrap">
      <img ref={img} src={src} alt={alt} className="pmImg" />
    </div>
  );
}
