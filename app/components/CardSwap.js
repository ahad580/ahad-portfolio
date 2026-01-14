"use client";
import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
} 
from "react";
import gsap from "gsap";
export const Card = forwardRef(({ customClass, ...rest }, ref) => (
    <div
        ref={ref}
        {...rest}
        className={`cardSwap-card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
        opacity: 1,
    });

export default function CardSwap({
    width = 520,
    height = 360,
    cardDistance = 62,
    verticalDistance = 34,
    delay = 2600,
    pauseOnHover = true,
    onCardClick,
    skewAmount = 6,
    easing = "elastic",
    children,
}) {
    const config =
        easing === "elastic"
            ? {
                ease: "power3.out",
                durFadeOut: 0.4,
                durMove: 0.65,
                durFadeIn: 0.55,
                promoteOverlap: 0.6,
                returnDelay: 0.1,
            }
            : {
                ease: "power3.out",
                durFadeOut: 0.35,
                durMove: 0.55,
                durFadeIn: 0.45,
                promoteOverlap: 0.55,
                returnDelay: 0.1,
            };
    const childArr = useMemo(() => Children.toArray(children), [children]);

    const refs = useMemo(
        () => childArr.map(() => React.createRef()),
        [childArr.length]
    );

    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
    const tlRef = useRef(null);
    const intervalRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!refs.length) return;

        const total = refs.length;
        refs.forEach((r, i) => {
            if (!r.current) return;
            placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
        });

        const swap = () => {
            if (order.current.length < 2) return;

            const [front, ...rest] = order.current;
            const elFront = refs[front]?.current;
            if (!elFront) return;

            const tl = gsap.timeline();
            tlRef.current = tl;

            tl.to(elFront, {
                opacity: 0,
                y: `+=18`,
                duration: config.durFadeOut,
                ease: "power2.out",
            });

            tl.addLabel("promote", `-=${config.durFadeOut * config.promoteOverlap}`);

            rest.forEach((idx, i) => {
                const el = refs[idx]?.current;
                if (!el) return;

                const slot = makeSlot(i, cardDistance, verticalDistance, total);

                tl.set(el, { zIndex: slot.zIndex }, "promote");
                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        duration: config.durMove,
                        ease: config.ease,
                    },
                    `promote+=${i * 0.12}`
                );
            });
            const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);

            tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

            tl.call(() => {
                gsap.set(elFront, {
                    x: backSlot.x,
                    y: backSlot.y + 24,
                    z: backSlot.z,
                    zIndex: backSlot.zIndex,
                    opacity: 0,
                });
            }, undefined, "return");

            tl.to(elFront,
                {
                    opacity: 1,
                    y: backSlot.y,
                    duration: config.durFadeIn,
                    ease: "power2.out",
                },
                "return"
            );

            tl.call(() => {
                order.current = [...rest, front];
            });
        };
        swap();
        intervalRef.current = window.setInterval(swap, delay);
        const node = containerRef.current;
        const pause = () => {
            tlRef.current?.pause();
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        };

        const resume = () => {
            tlRef.current?.play();
            if (!intervalRef.current) intervalRef.current = window.setInterval(swap, delay);
        };

        if (pauseOnHover && node) {
            node.addEventListener("mouseenter", pause);
            node.addEventListener("mouseleave", resume);
        }

        return () => {
            if (pauseOnHover && node) {
                node.removeEventListener("mouseenter", pause);
                node.removeEventListener("mouseleave", resume);
            }
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs]);

    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width, height, ...(child.props.style ?? {}) },
                onClick: (e) => {
                    child.props.onClick?.(e);
                    onCardClick?.(i);
                },
            })
            : child
    );
    return (
        <div ref={containerRef} className="cardSwap-container" style={{ width, height }}>
            {rendered}
        </div>
    );
}
