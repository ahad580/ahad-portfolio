
"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ChairScene from "./ChairScene";

gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseProjects() {
  const wrapRef = useRef(null);
  const chairWrapRef = useRef(null);
  
useLayoutEffect(() => {
  const wrap = wrapRef.current;
  const chair = chairWrapRef.current;
  if (!wrap || !chair) return;

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const ctx = gsap.context(() => {
    const getTargetY = () => {
      const target = document.querySelector(".afterchairRow"); 
      if (!target) return 0;

      const chairRect = chair.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const targetCenter = targetRect.top + targetRect.height * 0.5;
      const chairCenter = chairRect.top + chairRect.height * 0.5;

      return targetCenter - chairCenter;
    };

    gsap.set(chair, { x: 0, y: 0 });

    gsap.to(chair, {
      y: () => getTargetY(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        endTrigger: ".afterchairRow",
        end: "top center",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.refresh();
  }, wrap);

  return () => ctx.revert();
}, []);

  return (
    <section ref={wrapRef} className="showcaseWrap" id="showcase">
      <div ref={chairWrapRef} className="floatingChair" aria-hidden="true">
        <div className="modelStageOuter">
          <div className="modelStage">
            <ChairScene />
          </div>
        </div>
      </div>

      <div className="showcaseInner">
        <div className="showcaseCopy">
          <h3 className="modelHintTitle">Take a seat, There’s more below.</h3>
          <p className="modelHintSub">
            Scroll to explore how I design systems that last.
          </p>
        </div>
      </div>
    </section>
  );
}
