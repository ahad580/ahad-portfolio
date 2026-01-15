"use client";

import { useRef, useLayoutEffect } from "react";
import DecryptedText from "./DecryptedText";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const rightRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const targets = [innerRef.current, rightRef.current].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 40 });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      <div className="heroGrid">
        <div ref={innerRef} className="heroInner">
          <h1 className="heroTitle">
            <span className="heroHelloWrap">
              <DecryptedText
                text="Hello there,"
                animateOn="both"
                sequential
                speed={40}
                useOriginalCharsOnly
                className="heroHello"
              />
            </span>
            <span className="heroRest">I'm Ahad</span>
          </h1>

          <p className="heroSub">
            Full Stack Engineer. Blockchain Developer. AI Engineer.
          </p>

          <p className="heroDesc2">
            Building solutions for the decentralized web ecosystem.
          </p>

          <div className="heroBtns">
            <a className="btnGhost">Explore Work</a>
            <a className="btnGhost">Let’s Talk</a>
          </div>
        </div>

        <div ref={rightRef} className="heroRight">
          <img src="/1.png" alt="Tech stack" className="heroImage" />
        </div>
      </div>
    </section>
  );
}
