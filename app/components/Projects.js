"use client";
import WalkieTalkieModel from "./WalkieTalkieModel";
import { useRef } from "react";
import useReveal from "./useReveal";
import Magnetic from "./Magnetic";

const PROJECTS = [
  {
    title: "Realtime Live Store (WebRTC)",
    desc: "One-way customer camera, agent video live. Socket.IO + WebRTC signaling with low-latency UX.",
    stack: ["Next.js", "WebRTC", "Socket.IO", "Node"],
    link: "#",
    problem: "Customers had to wait too long to reach an agent, and chat wasn’t enough for product demos.",
    goal: "Enable instant, real-time video help inside the store without heavy UX or delays.",
    solution: "Built a one-way live video flow using WebRTC + Socket.IO signaling with stable reconnect + low-latency UX.",
    result: "Faster support sessions, smoother handoff, and noticeably higher engagement during assisted browsing.",
  },
  {
    title: "E-Commerce Platform",
    desc: "Custom store experience with scalable backend and performance-focused frontend.",
    stack: ["Next.js", "Express", "SQL", "Stripe"],
    link: "#",
    problem: "Slow pages and a backend that couldn’t scale well during traffic spikes.",
    goal: "Build a fast storefront with a clean checkout flow and scalable backend.",
    solution: "Implemented Next.js frontend + Express APIs, optimized queries, and integrated Stripe with clean order flows.",
    result: "Improved load times, more reliable checkout, and smoother admin operations.",
  },
  {
    title: "AI Utilities Suite",
    desc: "Tooling that turns inputs into usable outputs with clean UI and predictable workflows.",
    stack: ["React", "APIs", "UX", "Optimization"],
    link: "#",
    problem: "Users needed multiple tools but workflows were messy and inconsistent across pages.",
    goal: "Make utility tools feel cohesive, fast, and simple to use.",
    solution: "Built reusable UI patterns, consistent API wrappers, and predictable flows with performance optimizations.",
    result: "Cleaner UX, faster task completion, and better retention across repeated usage.",
  },
];

const WEBSITES = [
  {
    name: "Canoo",
    url: "https://canoo.ca/",
    type: "Brand / Product Site",
    desc: "High-polish product storytelling with strong scroll rhythm and interactive motion.",
    tags: ["Smooth Scroll", "ScrollTrigger", "Transitions"],
    images: ["/canooss1.png", "/canooss2.png", "/canooss3.png", "/canooss4.png"],
    mediaClass: "mediaCanoo",
    imgClass: "imgCanoo",
  },
  {
    name: "Cowboy",
    url: "https://cowboy.com/",
    type: "E-commerce / Product",
    desc: "Clean product layout with premium motion and conversion-friendly structure.",
    tags: ["Ecom UX", "Parallax", "Microinteractions"],
    images: ["/c1.png", "/c2.png", "/c3.png", "/c4.png"],
    mediaClass: "mediaCowboy",
    imgClass: "imgCowboy",
  },
  {
    name: "Resn",
    url: "https://resn.co.nz/",
    type: "Agency / Interactive",
    desc: "Heavy interaction design, cinematic sections, and bold motion hierarchy.",
    tags: ["Creative Dev", "Animation", "GSAP-style"],
    images: ["/rss1.png", "/rss2.png", "/rss3.png", "/rss4.png"],
    mediaClass: "mediaResn",
    imgClass: "imgResn",
  },
  {
    name: "Toyfight",
    url: "https://toyfight.co/connect",
    type: "Agency / Contact",
    desc: "Playful interaction patterns with magnetic hover and bold typography rhythm.",
    tags: ["Magnetic", "Hover", "Type"],
    images: ["/toyss1.png", "/toyss2.png", "/toyss3.png", "/toyss4.png"],
    mediaClass: "mediaToyfight",
    imgClass: "imgToyfight",
  },
];

function ProjectCard({ p }) {
  return (
    <a href={p.link} className="projectCard">
      <div className="projectTop">
        <span className="projectDot" />
        <h3 className="projectName">{p.title}</h3>
      </div>

      <p className="projectDesc">{p.desc}</p>

      <div className="caseStoryGrid">
        <div className="caseItem">
          <div className="caseLabel">
            <span className="caseIcon">●</span> Problem
          </div>
          <div className="caseText">{p.problem}</div>
        </div>

        <div className="caseItem">
          <div className="caseLabel">
            <span className="caseIcon">●</span> Goal
          </div>
          <div className="caseText">{p.goal}</div>
        </div>

        <div className="caseItem">
          <div className="caseLabel">
            <span className="caseIcon">●</span> Solution
          </div>
          <div className="caseText">{p.solution}</div>
        </div>

        <div className="caseItem caseResult">
          <div className="caseLabel">
            <span className="caseIcon">●</span> Result
          </div>
          <div className="caseText">{p.result}</div>
        </div>
      </div>

      <div className="projectTags">
        {p.stack.map((t) => (
          <span className="projectTag" key={t}>
            {t}
          </span>
        ))}
      </div>

      <div className="projectCtaRow">
        <span className="projectCta">View case study</span>
        <span className="projectArrow">↗</span>
      </div>
    </a>
  );
}

function WebsiteCard({ s }) {
  return (
    <a className="siteCard2" href={s.url} target="_blank" rel="noreferrer">
      <div className={`siteMedia2 ${s.mediaClass || ""}`}>
        <div className="siteQuad">
          {s.images.slice(0, 4).map((src, i) => (
            <div className="siteQuadCell" key={i}>
              <img
                src={src}
                alt={`${s.name} ${i + 1}`}
                className={`siteQuadImg ${s.imgClass || ""}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="siteBody2">
        <div className="siteTop2">
          <div className="siteDot2" />
          <div className="siteMeta2">
            <div className="siteName2">{s.name}</div>
            <div className="siteType2">{s.type}</div>
          </div>
          <div className="siteArrow2">↗</div>
        </div>

        <p className="siteDesc2">{s.desc}</p>

        <div className="siteTags2">
          {s.tags.map((t) => (
            <span className="siteTag2" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const ref = useRef(null);

  useReveal(ref, [".projectsHeader", ".projectCard", ".projectsBottom", ".afterchairRow"], {
    start: "top 85%",
    y: 18,
    duration: 0.75,
    stagger: 0.08,
    ease: "power3.out",
  });

  useReveal(ref, [".sitesHeader2", ".siteCard2"], {
    start: "top 88%",
    y: 18,
    duration: 0.75,
    stagger: 0.09,
    ease: "power3.out",
  });

  return (
    <section ref={ref} className="projectsSection" id="projects">
      <div className="projectsInner">
        <div className="projectsHeader">
          <h2 className="projectsTitle">Projects worth shipping.</h2>
          <p className="projectsSub">Real builds. Clean architecture. Performance that holds.</p>
        </div>

        <div className="projectsGrid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>

        <div className="projectsBottom">
          <p className="projectsBottomText">Want the full list?</p>
          <Magnetic as="a" href="#contact" className="btnGhost" strength={0.18}>
            Let’s talk
          </Magnetic>
        </div>

        <div className="afterchairRow">
          <div className="afterchaircont">
            <h2 className="afterchair-head">Like what you see?</h2>
            <p className="afterchair-sub">
              I take your idea, shape it into a clean system, and ship it with performance that holds.
            </p>
            <div className="afterchair-actions">
              <Magnetic as="a" href="#contact" className="btnGhost" strength={0.18}>
                See more
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="sitesSection2" id="websites">
          <div className="sitesHeader2">
            <h3 className="sitesTitle2">Websites I’ve built</h3>
            <p className="sitesSub2">
              Selected builds with production polish, motion discipline, and a clean system underneath.
            </p>
          </div>

          <div className="sitesGrid2">
            {WEBSITES.map((s) => (
              <WebsiteCard key={s.name} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
