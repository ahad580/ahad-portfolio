// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function useReveal(ref, selectors, opts = {}) {
//   useLayoutEffect(() => {
//     const root = ref.current;
//     if (!root) return;

//     const reduce =
//       window.matchMedia &&
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     if (reduce) return;

//     const {
//       start = "top 85%",
//       y = 18,
//       duration = 0.75,
//       stagger = 0.08,
//       ease = "power3.out",
//     } = opts;

//     const ctx = gsap.context(() => {
//       const nodes = selectors.flatMap(sel =>
//         Array.from(root.querySelectorAll(sel))
//       );

//       gsap.set(nodes, { opacity: 0, y, filter: "blur(6px)" });

//       gsap.to(nodes, {
//         opacity: 1,
//         y: 0,
//         filter: "blur(0px)",
//         duration,
//         stagger,
//         ease,
//         scrollTrigger: {
//           trigger: root,
//           start,
//           toggleActions: "play none none reverse",
//         },
//       });
//     }, root);

//     return () => ctx.revert();
//   }, [ref, selectors, opts]);
// }
"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useReveal(ref, selectors, opts = {}) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const start = opts.start ?? "top 40%";
    const y = opts.y ?? 18;
    const duration = opts.duration ?? 0.75;
    const stagger = opts.stagger ?? 0.08;
    const ease = opts.ease ?? "power3.out";

    const ctx = gsap.context(() => {
      const nodes = selectors.flatMap((sel) =>
        Array.from(root.querySelectorAll(sel))
      );

      gsap.set(nodes, { opacity: 0, y, filter: "blur(6px)" });

      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ref, selectors.join("|")]);
}
