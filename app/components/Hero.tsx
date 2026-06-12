"use client";

import { useEffect, useRef } from "react";
import OpenFaceMark from "./OpenFaceMark";

export default function Hero() {
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ready = false;
    const timer = setTimeout(() => {
      ready = true;
    }, 2400);

    const handleMouseMove = (e: MouseEvent) => {
      if (!ready || !wordmarkWrapRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      wordmarkWrapRef.current.style.transition =
        "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
      wordmarkWrapRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col z-10 p-6 pb-7 md:pt-9 md:px-12 md:pb-8">
      {/* ── Top row: annotation + nav ─────────────────────────────── */}
      <header className="flex items-start justify-between gap-10">
        {/* Annotation — serif italic + sans medium mashup */}
        <p
          className="anim-annotation max-w-[240px] md:max-w-[360px] leading-[1.5] tracking-[0.005em] text-[13px] md:text-[15px]"
        >
          <span className="font-serif mr-1">—</span>
          <span className="font-serif italic text-ink-muted text-[15px] md:text-[17px]">
            {" "}Designer of
          </span>{" "}
          <span className="font-sans font-medium text-ink">
            spaces and systems.
          </span>
        </p>

        {/* Nav */}
        <nav
          className="anim-nav flex gap-[18px] md:gap-7 font-sans lowercase tracking-[0]"
          style={{ fontSize: 'var(--nav-size)', fontWeight: 'var(--nav-weight)', color: 'var(--nav-color)' }}
        >
          <a href="#work" className="nav-link">work</a>
          <a href="#about" className="nav-link">about</a>
          <a href="#contact" className="nav-link">contact</a>
        </nav>
      </header>

      {/* ── Wordmark ──────────────────────────────────────────────── */}
      <div
        ref={wordmarkWrapRef}
        className="flex flex-1 items-end justify-start will-change-transform"
        style={{ paddingBottom: "6vh" }}
      >
        <h1
          className="anim-wordmark font-serif font-normal text-ink leading-[0.86] tracking-[-0.04em] [font-size:clamp(64px,17vw,200px)] md:[font-size:clamp(96px,22vw,380px)]"
        >
          H.C. Lai
          <span className="text-terracotta">.</span>
        </h1>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────── */}
      <div
        className="anim-scroll-cue absolute font-mono uppercase text-ink-muted text-[10px] tracking-[0.2em]"
        style={{ bottom: "38px", left: "50%" }}
      >
        scroll ↓
      </div>

      {/* ── Footer mark (HCL · 2026 + monogram circle) ───────────── */}
      <div
        className="anim-footer-mark absolute bottom-8 right-6 md:right-12 flex items-center gap-3 font-mono text-ink-muted text-[10px] tracking-[0.12em]"
      >
        <span>HCL · 2026</span>
        <OpenFaceMark size={28} className="text-ink" />
      </div>
    </main>
  );
}
