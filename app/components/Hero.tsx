"use client";

import { useEffect, useRef } from "react";

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
    <main className="relative flex min-h-screen flex-col z-10 px-6 pb-7 pt-[72px] md:pt-[80px] md:px-12 md:pb-8">
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

      {/* ── Footer coordinate (circle removed; BrandMark in header) ── */}
      <div
        className="anim-footer-mark absolute bottom-8 right-6 md:right-12 font-mono text-ink-muted text-[10px] tracking-[0.12em]"
      >
        HCL · 2026
      </div>
    </main>
  );
}
