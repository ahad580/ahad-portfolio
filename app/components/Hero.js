"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";
import CardSwap, { Card } from "./CardSwap";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function getCardConfig(w) {
  if (w >= 1200) return { width: 450, height: 220, cardDistance: 55, verticalDistance: 45, skewAmount: 6 };
  if (w >= 992)  return { width: 480, height: 210, cardDistance: 50, verticalDistance: 40, skewAmount: 5 };
  if (w >= 768)  return { width: 520, height: 320, cardDistance: 55, verticalDistance: 45, skewAmount: 6 };
  if (w >= 480)  return { width: 360, height: 230, cardDistance: 42, verticalDistance: 32, skewAmount: 4 };
  return { width: 310, height: 210, cardDistance: 38, verticalDistance: 28, skewAmount: 3 };
}


export default function Hero() {
    const sectionRef = useRef(null); 
    const innerRef = useRef(null);
    const rightRef = useRef(null);
    const cardsRef = useRef(null);

    const [cardCfg, setCardCfg] = useState(() =>
        typeof window !== "undefined" ? getCardConfig(window.innerWidth) : getCardConfig(1200)
    );

    useEffect(() => {
        const onResize = () => setCardCfg(getCardConfig(window.innerWidth));
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const targets = [innerRef.current, rightRef.current, cardsRef.current].filter(Boolean);

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
                        <a  className="btnGhost">Explore Work </a>
                        <a  className="btnGhost"> Let’s Talk</a>
                    </div>
                </div>

                <div ref={rightRef} className="heroRight">
                    <img src="/1.png" alt="Tech stack" className="heroImage" />
                </div>

                <div className="afterApart">
                    <h2 className="apartHeading">What Sets Me Apart..</h2>
                    <p className="apartSub">Principles I bring to every build.</p>
                </div>

                <div ref={cardsRef} className="cardSwapWrap">
                    <CardSwap
                        width={cardCfg.width}
                        height={cardCfg.height}
                        cardDistance={cardCfg.cardDistance}
                        verticalDistance={cardCfg.verticalDistance}
                        delay={2000}
                        pauseOnHover={false}
                        skewAmount={cardCfg.skewAmount}
                        easing="linear"
                    >
                        <Card>
                            <div className="cardSwapTopbar">
                                <span className="cardSwapDot" /> Reliable Delivery
                            </div>
                            <div className="cardSwapBody">
                                <div className="cardSwapWave" />
                                <div className="cardSwapsub">Precision.</div>
                            </div>
                        </Card>

                        <Card>
                            <div className="cardSwapTopbar">
                                <span className="cardSwapDot" /> Clean Architecture
                            </div>
                            <div className="cardSwapBody">
                                <div className="cardSwapWave" />
                                <div className="cardSwapsub">Performance.</div>
                            </div>
                        </Card>

                        <Card>
                            <div className="cardSwapTopbar">
                                <span className="cardSwapDot" /> Performance First
                            </div>
                            <div className="cardSwapBody">
                                <div className="cardSwapWave" />
                                <div className="cardSwapsub">Clarity.</div>
                            </div>
                        </Card>

                        <Card>
                            <div className="cardSwapTopbar">
                                <span className="cardSwapDot" /> Smooth Workflow
                            </div>
                            <div className="cardSwapBody">
                                <div className="cardSwapWave" />
                                <div className="cardSwapsub">Reliability.</div>
                            </div>
                        </Card>

                        <Card>
                            <div className="cardSwapTopbar">
                                <span className="cardSwapDot" /> Clear Communication
                            </div>
                            <div className="cardSwapBody">
                                <div className="cardSwapWave" />
                                <div className="cardSwapsub">Consistency.</div>
                            </div>
                        </Card>
                    </CardSwap>
                </div>
            </div>
        </section>
    );
}
