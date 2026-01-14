"use client";
import WalkieTalkieViewer from "./WalkieTalkieViewer";
import { useRef, useState, useEffect } from "react";

export default function LabsSection() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  const messagePlaceholders = [
    "What are we building?",
    "Need a website or web app?",
    "Let’s ship something fast.",
    "Share your timeline + budget.",
    "Tell me your idea in 1–2 lines.",
  ];
  const [phIndex, setPhIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPhIndex((p) => (p + 1) % messagePlaceholders.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    lines: [],
  });

  const showPixelToast = (type, lines) => {
    setToast({ show: true, type, lines });
  };

  const closeToast = () => {
    setToast((t) => ({ ...t, show: false }));
  };

  const [typed, setTyped] = useState([]);
  const [lineI, setLineI] = useState(0);
  const [charI, setCharI] = useState(0);

  useEffect(() => {
    if (!toast.show) {
      setTyped([]);
      setLineI(0);
      setCharI(0);
      return;
    }

    setTyped(new Array(toast.lines.length).fill(""));
    setLineI(0);
    setCharI(0);
  }, [toast.show, toast.lines.length]);

  useEffect(() => {
    if (!toast.show) return;
    const lines = toast.lines || [];
    if (!lines.length) return;

    if (lineI >= lines.length) return;

    const fullLine = lines[lineI] || "";

    if (charI > fullLine.length) {
      const t = setTimeout(() => {
        setLineI((v) => v + 1);
        setCharI(0);
      }, 200);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setTyped((prev) => {
        const copy = [...prev];
        copy[lineI] = fullLine.slice(0, charI);
        return copy;
      });
      setCharI((v) => v + 1);
    }, 22);

    return () => clearTimeout(t);
  }, [toast.show, toast.lines, lineI, charI]);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setSending(true);

      const fd = new FormData(formRef.current);
      const payload = {
        name: fd.get("user_name")?.toString().trim(),
        email: fd.get("user_email")?.toString().trim(),
        contact: fd.get("user_contact")?.toString().trim(),
        message: fd.get("message")?.toString().trim(),
      };

      if (!payload.name || !payload.email || !payload.message) {
        showPixelToast("error", [
          "ERROR: MISSING FIELDS",
          "FILL NAME + EMAIL + MESSAGE",
        ]);
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.log("Contact API error:", data);
        throw new Error(data?.error || "Failed");
      }

      showPixelToast("success", [
        "SENT ✅",
        "MESSAGE DELIVERED SUCCESSFULLY",
        "I'LL REPLY IN 24–48H",
      ]);

      formRef.current.reset();
    } catch (err) {
      console.log("Send failed:", err);
      showPixelToast("error", [
        "FAILED ❌",
        "SERVER DIDN'T RESPOND",
        "TRY AGAIN IN A BIT",
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="labsSection" id="labs">
      <div className="labsInner">
        <div className="labsCard">
          <div className="labsModelWrap">
            <WalkieTalkieViewer />
          </div>
        </div>
      </div>

      <div className="logoMarquee">
        <div className="logoTrack">
          <img alt="HTML" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
          <img alt="CSS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
          <img alt="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          <img alt="TypeScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
          <img alt="React" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
          <img alt="Next.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
          <img alt="Node.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
          <img alt="Express" className="githubWhite" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
          <img alt="Git" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
          <img alt="GitHub" className="githubWhite" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          <img alt="Docker" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
          <img alt="Python" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
          <img alt="Pandas" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" />
          <img alt="SQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />
          <img alt="PostgreSQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
          <img alt="MongoDB" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
          <img alt="Tailwind" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" />
          <img alt="Figma" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" />
          <img alt="VS Code" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
          <img alt="PyCharm" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" />
          <img alt="HTML" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
          <img alt="CSS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
          <img alt="JavaScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          <img alt="TypeScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
          <img alt="React" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
          <img alt="Next.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
          <img alt="Node.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
          <img alt="Express" className="githubWhite" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
          <img alt="Git" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
          <img alt="GitHub" className="githubWhite" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          <img alt="Docker" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
          <img alt="Python" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
          <img alt="Pandas" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" />
          <img alt="SQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />
          <img alt="PostgreSQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
          <img alt="MongoDB" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
          <img alt="Tailwind" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" />
          <img alt="Figma" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" />
          <img alt="VS Code" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
          <img alt="PyCharm" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" />
          <img alt="Ethereum" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg" />
        </div>
      </div>

      <section className="touchSection" id="contact">
        <div className="touchInner">
          <h2 className="touchTitle">
            Get in touch
            <span className="touchLine" />
          </h2>

          <div className="touchTopGrid">
            <div className="touchLeft">
              <div className="touchIntro">
                <div className="touchShout">
                  I’M NOTORIOUSLY
                  <br />
                  SLOW AT GETTING
                  <br />
                  BACK TO EMAILS
                </div>

                <p className="touchHint">
                  If it’s urgent, include your timeline and budget.
                  I’ll reply with the scope and the fastest path to ship.
                </p>

                <div className="touchMeta">
                  <span className="touchBadge">Available for freelance</span>
                  <span className="touchMetaDot">•</span>
                  <span className="touchMetaText">Typical reply: 24–48h</span>
                </div>
              </div>

              <div className="touchList">
                <a className="touchRow" href="mailto:ahad58040@gmail.com">
                  <span className="touchRowText">Email</span>
                  <span className="touchRowRight">
                    ahad58040@gmail.com <span className="touchRowArrow">↗</span>
                  </span>
                </a>

                <a className="touchRow" href="tel:+92152802043">
                  <span className="touchRowText">Contact</span>
                  <span className="touchRowRight">
                    +92 152802043 <span className="touchRowArrow">↗</span>
                  </span>
                </a>

                <a className="touchRow" href="#">
                  <span className="touchRowText">LinkedIn</span>
                  <span className="touchRowRight">
                    Coming soon
                    <span className="touchRowArrow">↗</span>
                  </span>
                </a>
              </div>
            </div>

            <form className="touchForm" ref={formRef} onSubmit={sendEmail}>
              <div className="touchFormTop">
                <div className="touchFormTitle">Send a message</div>
                <div className="touchFormNote">
                  Name, email, contact — and what you need built.
                </div>
              </div>

              <div className="touch2col">
                <div className="touchField">
                  <label className="touchLabel">Name</label>
                  <input
                    className="touchInput"
                    type="text"
                    name="user_name"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="touchField">
                  <label className="touchLabel">Email</label>
                  <input
                    className="touchInput"
                    type="email"
                    name="user_email"
                    placeholder="you@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="touchField">
                <label className="touchLabel">Contact</label>
                <input
                  className="touchInput"
                  type="text"
                  name="user_contact"
                  placeholder="your contact"
                />
              </div>

              <div className="touchField">
                <label className="touchLabel">Message</label>
                <textarea
                  className="touchInput touchArea"
                  name="message"
                  placeholder={messagePlaceholders[phIndex]}
                  required
                />
              </div>

              <button className="touchBtn" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send message"}{" "}
                <span className="touchBtnArrow">↗</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {toast.show && (
        <div className="pxToastOverlay" onMouseDown={closeToast}>
          <div
            className={`pxToast ${toast.type}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="pxToastTop">
              <div className="pxToastTitle">
                {toast.type === "success" ? "AHAD.EXE" : "ERROR.LOG"}
              </div>
              <div className="pxToastBtns">
                <span className="pxToastBtn" />
                <span className="pxToastBtn" />
                <span className="pxToastBtn pxToastBtnClose" onClick={closeToast} />
              </div>
            </div>

            <div className="pxToastMenu">
              <span>FILE</span>
              <span>VISIT</span>
              <span>BUY</span>
              <span>DOWNLOAD</span>
            </div>

            <div className="pxToastBody">
              <div className="pxToastLines">
                {(typed.length ? typed : toast.lines).map((l, idx) => {
                  const isLastTyping =
                    idx === lineI && lineI < (toast.lines?.length || 0);
                  return (
                    <div className="pxToastLine" key={idx}>
                      <span className="pxToastText">{l}</span>
                      {isLastTyping && <span className="pxCaret" />}
                    </div>
                  );
                })}
              </div>

              <div className="pxToastBottom">
                <div className="pxProgress">
                  <span className="pxDot" />
                  <div className="pxBar">
                    <div className="pxFill" />
                  </div>
                  <span className="pxSmall">A.DEV STUDIO 2026</span>
                </div>

                <button className="pxToastOk" type="button" onClick={closeToast}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
