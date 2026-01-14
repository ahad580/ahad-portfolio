"use client";

import { useEffect, useMemo, useState } from "react";

export default function PixelWindow() {
    const lines = useMemo(
        () => [
            "HEY! I'M AHAD 👋",
            "I BUILD SLICK WEB EXPERIENCES.",
            "CHECK OUT MY LABS + PROJECTS.",
            "HIT CONNECT IF YOU WANNA BUILD SOMETHING.",
        ],
        []
    );

    const [lineIndex, setLineIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const full = lines[lineIndex];
        const speed = isDeleting ? 18 : 30;

        const t = setTimeout(() => {
            setText((prev) => {
                if (!isDeleting) {
                    const next = full.slice(0, prev.length + 1);
                    if (next === full) setTimeout(() => setIsDeleting(true), 650);
                    return next;
                } else {
                    const next = full.slice(0, prev.length - 1);
                    if (next.length === 0) {
                        setIsDeleting(false);
                        setLineIndex((i) => (i + 1) % lines.length);
                    }
                    return next;
                }
            });
        }, speed);

        return () => clearTimeout(t);
    }, [text, isDeleting, lineIndex, lines]);

    return (
        <>
            <div className="pxWrap">
                <div className="pxWindow">
                    <div className="pxTitlebar">
                        <div className="pxTitle">AHAD.EXE</div>
                        <div className="pxBtns">
                            <span className="pxBtn" />
                            <span className="pxBtn" />
                            <span className="pxBtn pxBtnClose" />
                        </div>
                    </div>

                    <div className="pxMenu">
                        <span>FILE</span>
                        <span>VISIT</span>
                        <span>BUY</span>
                        <span>DOWNLOAD</span>
                    </div>

                    <div className="pxBody">
                        <div className="pxTyping">
                            <span className="pxText">{text}</span>
                            <span className="pxCaret" />
                        </div>

                        <div className="pxProgress">
                            <span className="pxDot" />
                            <div className="pxBar">
                                <div className="pxFill" />
                            </div>
                            <span className="pxSmall">A.DEV STUDIO 2025</span>
                        </div>
                    </div>
                </div>
            </div>

        </>);
}
