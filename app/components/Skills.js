"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector(".skillsTitle");
      const subtitle = section.querySelector(".skillsSub");
      const pills = section.querySelectorAll(".skillPill");
      const cards = section.querySelectorAll(".skillCard");
      const lines = section.querySelectorAll(".skillsLine");

      gsap.set([title, subtitle], { opacity: 0, y: 18 });
      gsap.set(pills, { opacity: 0, y: 10 });
      gsap.set(cards, { opacity: 0, y: 26, rotateX: 10, transformPerspective: 900 });
      gsap.set(lines, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.08)
        .to(
          pills,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          0.18
        )
        .to(
          cards,
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.1 },
          0.28
        )
        .to(lines, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.42);

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.01, duration: 0.2, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.25, ease: "power2.out" });
        });
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skillsSection" id="skills">
      <div className="skillsInner">
        <div className="skillsTop">
          <h2 className="skillsTitle">Skills that scale.</h2>
          <p className="skillsSub">
           Turning complex ideas into fast, reliable, production grade systems.
          </p>

          <div className="skillsPills">
            <span className="skillPill">Performance-first</span>
            <span className="skillPill">Clean architecture</span>
            <span className="skillPill">DX & maintainability</span>
            <span className="skillPill">Production mindset</span>
          </div>
        </div>

        <div className="skillsGrid">
          <div className="skillCard">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">Blockchain & Web3</h3>
            </div>
            <p className="skillCardText">
              Decentralized apps, smart contracts, and trustless systems on modern chains.
            </p>
            <div className="skillTags">
              <span className="skillTag">Solidity</span>
              <span className="skillTag">EVM</span>
              <span className="skillTag">Web3.js</span>
              <span className="skillTag">Wallets</span>
            </div>
          </div>

          <div className="skillCard">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">AI & Automation</h3>
            </div>
            <p className="skillCardText">
              Intelligent systems using ML, LLMs, and workflow automation.
            </p>
            <div className="skillTags">
              <span className="skillTag">OpenAI</span>
              <span className="skillTag">LLMs</span>
              <span className="skillTag">Agents</span>
              <span className="skillTag">Automation</span>
            </div>
          </div>

          <div className="skillCard">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">3D & Interactive</h3>
            </div>
            <p className="skillCardText">
              Real-time 3D, animations, and interactive experiences on the web.
            </p>
            <div className="skillTags">
              <span className="skillTag">Three.js</span>
              <span className="skillTag">R3F</span>
              <span className="skillTag">GSAP</span>
              <span className="skillTag">WebGL</span>
            </div>
          </div>

          <div className="skillCard">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">Frontend Engineering</h3>
            </div>
            <p className="skillCardText">
              Fast, accessible interfaces with a strong UI system and smooth interactions.
            </p>
            <div className="skillTags">
              <span className="skillTag">React</span>
              <span className="skillTag">Next.js</span>
              <span className="skillTag">TypeScript</span>
              <span className="skillTag">Tailwind</span>
            </div>
          </div>

          <div className="skillCard">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">Backend & APIs</h3>
            </div>
            <p className="skillCardText">
              Secure APIs and services that stay predictable under real production load.
            </p>
            <div className="skillTags">
              <span className="skillTag">Node.js</span>
              <span className="skillTag">Express</span>
              <span className="skillTag">Auth</span>
              <span className="skillTag">REST</span>
            </div>
          </div>

          <div className="skillCard">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">Systems & Infrastructure</h3>
            </div>
            <p className="skillCardText">
              Shipping reliably with deployment, scaling, and monitoring in mind.
            </p>
            <div className="skillTags">
              <span className="skillTag">AWS</span>
              <span className="skillTag">Docker</span>
              <span className="skillTag">CI/CD</span>
              <span className="skillTag">Cloud</span>
            </div>
          </div>

          <div className="skillCard skillCardWide">
            <div className="skillCardTop">
              <span className="skillDot" />
              <h3 className="skillCardTitle">What I optimize for</h3>
            </div>

            <div className="skillsLines">
              <div className="skillsLine">
                <span className="skillsLineKey">Clarity</span>
                <span className="skillsLineVal">Readable code, predictable structure</span>
              </div>
              <div className="skillsLine">
                <span className="skillsLineKey">Speed</span>
                <span className="skillsLineVal">Fast UX, clean rendering, tight bundles</span>
              </div>
              <div className="skillsLine">
                <span className="skillsLineKey">Reliability</span>
                <span className="skillsLineVal">Edge cases handled, stable deployments</span>
              </div>
              <div className="skillsLine">
                <span className="skillsLineKey">Scale</span>
                <span className="skillsLineVal">Systems that grow without breaking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="skillsBottomCta">
          <p className="skillsBottomText">
            Want to see these in action?
          </p>
          <a href="#projects" className="btnGhost">Let's dive in together.</a>
        </div>
      </div>
    </section>
  );
}
