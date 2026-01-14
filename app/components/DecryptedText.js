"use client";
"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "AB!@#$%^&*()",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const len = text.length;
      if (revealDirection === "end") return len - 1 - revealedSet.size;
      return revealedSet.size;
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("");

    const shuffleText = (original, revealed) =>
      original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (revealed.has(i)) return original[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prev) => {
          if (sequential && prev.size < text.length) {
            const next = getNextIndex(prev);
            const nextSet = new Set(prev);
            nextSet.add(next);
            setDisplayText(shuffleText(text, nextSet));
            return nextSet;
          } else {
            currentIteration++;
            setDisplayText(shuffleText(text, prev));
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prev;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => interval && clearInterval(interval);
  }, [isHovering]);

  useEffect(() => {
    if (animateOn === "view" || animateOn === "both") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsHovering(true);
            setHasAnimated(true);
          }
        },
        { threshold: 0.2 }
      );
      containerRef.current && observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated]);

  const hoverProps =
    animateOn === "hover" || animateOn === "both"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      style={styles.wrapper}
      {...hoverProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>
      <span aria-hidden>
        {displayText.split("").map((char, i) => (
          <span key={i} className={className}>
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
