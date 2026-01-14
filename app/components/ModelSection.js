"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ChairScene from "./ChairScene";

gsap.registerPlugin(ScrollTrigger);

export default function ModelSection() {
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
            gsap.fromTo(
                section.querySelector(".modelInner"),
                { opacity: 0, y: 28 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="modelSection" id="model">
            <div className="modelInner">
                <div className="modelStageOuter">
                    <div className="modelStageGrid">

                        <div className="modelCopy">
                            <h3 className="modelHintTitle">Take a seat — there’s more below.</h3>
                            <p className="modelHintSub">
                                Scroll to explore how I design systems that last.
                            </p>
                        </div>
                        <div className="modelStage">
                            <ChairScene />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
