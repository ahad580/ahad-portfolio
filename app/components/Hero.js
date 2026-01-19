"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const rightRef = useRef(null);

  const workRef = useRef(null);
  const wsHeadingRef = useRef(null);
  const wsCardsRef = useRef(null);

  const words = [
    "Clear Communication",
    "Reliable Delivery",
    "Honest Feedback",
    "Long-Term Support",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const i = setInterval(() => {
      setWordIndex((v) => (v + 1) % words.length);
    }, 2200);

    return () => clearInterval(i);
  }, []);

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

    const ctx2 = gsap.context(() => {
      const wrap = workRef.current;
      if (!wrap) return;

      const cards = wsCardsRef.current
        ? Array.from(wsCardsRef.current.children)
        : [];

      const targets = [wsHeadingRef.current, ...cards].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 40, filter: "blur(10px)" });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ctx2.revert();
    };
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

      <div ref={workRef} className="workSection">
        <div className="noiseLayer" />
        <h2 ref={wsHeadingRef} className="workHeading">
          How I Work:{" "}
          <span key={wordIndex} className="loopWord">
            {words[wordIndex]}
          </span>
        </h2>

        <div ref={wsCardsRef} className="workGrid">
          <div className="workCard">
            <h4>Clear Communication</h4>
            <p>You always know what’s happening and what’s next.</p>
          </div>

          <div className="workCard">
            <h4>Reliable Delivery</h4>
            <p>If I commit, it gets done on time.</p>
          </div>

          <div className="workCard">
            <h4>Honest Feedback</h4>
            <p>I say what helps your product.</p>
          </div>

          <div className="workCard">
            <h4>After-Launch Support</h4>
            <p>I don’t disappear after delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
