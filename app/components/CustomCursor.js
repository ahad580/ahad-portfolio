"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });      
  const target = useRef({ x: 0, y: 0 });   
  const rafRef = useRef(null);
  const hovering = useRef(false);
  const clicking = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    const setDot = (x, y) => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const setRing = (x, y) => {
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onDown = () => {
      clicking.current = true;
      document.documentElement.classList.add("cursor-click");
    };

    const onUp = () => {
      clicking.current = false;
      document.documentElement.classList.remove("cursor-click");
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const isInteractive = (el) => {
      if (!el) return false;
      return (
        el.closest(
          'a,button,input,textarea,select,[role="button"],[data-cursor="hover"]'
        ) != null
      );
    };

    const onOver = (e) => {
      if (isInteractive(e.target)) {
        hovering.current = true;
        document.documentElement.classList.add("cursor-hover");
      }
    };

    const onOut = (e) => {
     
      const to = e.relatedTarget;
      if (isInteractive(to)) return;

      hovering.current = false;
      document.documentElement.classList.remove("cursor-hover");
    };

    const loop = () => {
     
      const ease = hovering.current ? 0.22 : 0.18;

      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      setDot(pos.current.x - 4, pos.current.y - 4);

      setRing(pos.current.x - 18, pos.current.y - 18);

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    target.current.x = window.innerWidth / 2;
    target.current.y = window.innerHeight / 2;
    pos.current.x = target.current.x;
    pos.current.y = target.current.y;
    onEnter();

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("cursor-hover", "cursor-click");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursorDot" />
      <div ref={ringRef} className="cursorRing" />
    </>
  );
}
