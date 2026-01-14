"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const animateNavClick = (el) => {
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 1, filter: "brightness(1)" },
      { scale: 0.96, duration: 0.08, ease: "power2.out" }
    );

    gsap.to(el, {
      scale: 1,
      duration: 0.22,
      ease: "power2.out",
      delay: 0.08,
    });

    gsap.fromTo(
      el,
      { boxShadow: "0 0 0 rgba(168,85,247,0)" },
      {
        boxShadow: "0 0 22px rgba(168,85,247,0.28)",
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  };

  const scrollToId = (id, clickedEl) => {
    animateNavClick(clickedEl);

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 450);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="topbar">
        <nav className="navPill">
          <button
            className="navMobileMenuBtn"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Menu
          </button>

          <div className="navLogo">
            ahad
            <span className="dot">.</span>
            io
          </div>

          <ul className="navMenu">
            <li className="navItem">
              <button
                className="navLink"
                type="button"
                onClick={(e) => scrollToId("top", e.currentTarget)}
              >
                Home <span className="chev"></span>
              </button>
            </li>

            <li className="navItem">
              <button
                className="navLink"
                type="button"
                onClick={(e) => scrollToId("skills", e.currentTarget)}
              >
                Skills <span className="chev"></span>
              </button>
            </li>

            <li className="navItem">
              <button
                className="navLink"
                type="button"
                onClick={(e) => scrollToId("labs", e.currentTarget)}
              >
                Labs. <span className="chev"></span>
              </button>
            </li>

            <li className="navItem">
              <button
                className="navLink"
                type="button"
                onClick={(e) => scrollToId("projects", e.currentTarget)}
              >
                Case Studies <span className="chev"></span>
              </button>
            </li>

            <li className="navItem">
              <button
                className="navLink"
                type="button"
                onClick={(e) => scrollToId("websites", e.currentTarget)}
              >
                Websites <span className="chev"></span>
              </button>
            </li>
          </ul>

          <button
            className="navCta"
            type="button"
            onClick={(e) => scrollToId("contact", e.currentTarget)}
          >
            Connect
          </button>
        </nav>
      </header>

      <div
        className={`navOverlay ${open ? "isOpen" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className={`navDrawer ${open ? "isOpen" : ""}`}>
          <div className="drawerTop">
            <div className="drawerMenuLabel">Menu</div>

            <button
              className="drawerCloseBtn"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <span className="drawerCloseText">Close</span>
              <span className="drawerCloseX">×</span>
            </button>
          </div>

          <div className="drawerLinks">
            <a
              className="drawerLink"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId("top", e.currentTarget);
              }}
            >
              Home
            </a>

            <a
              className="drawerLink"
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId("skills", e.currentTarget);
              }}
            >
              Skills
            </a>

            <a
              className="drawerLink"
              href="#labs"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId("labs", e.currentTarget);
              }}
            >
              Labs.
            </a>

            <a
              className="drawerLink"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId("projects", e.currentTarget);
              }}
            >
              Case Studies
            </a>

            <a
              className="drawerLink"
              href="#websites"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId("websites", e.currentTarget);
              }}
            >
              Websites
            </a>

            <a
              className="drawerLink"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId("contact", e.currentTarget);
              }}
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
