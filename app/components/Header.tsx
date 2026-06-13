"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function check() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-between",
        "px-6 md:px-12",
        "transition-[padding,background-color,border-color] duration-500",
        scrolled
          ? "py-3 bg-cream border-b border-line backdrop-blur-sm"
          : "py-4 bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      {/* Left group: fixed-width slot for BrandMark + annotation */}
      <div className="anim-annotation flex items-center gap-3 md:gap-4">
        {/*
          Slot width = SVG rendered width at height=34:
          viewBox 840/270 × 34 ≈ 106px.
          Fixed so annotation never shifts when logo morphs wide→narrow.
        */}
        <div style={{ width: "106px", flexShrink: 0 }}>
          <BrandMark />
        </div>

        {/* Annotation — hidden on mobile, visible md+ */}
        <p className="hidden md:flex items-center gap-0 leading-[1.5] tracking-[0.005em] text-[13px]">
          <span className="font-serif mr-1">—</span>
          <span className="font-serif italic text-ink-muted text-[15px]">{" "}Designer of</span>
          {" "}
          <span className="font-sans font-medium text-ink ml-1">spaces and systems.</span>
        </p>
      </div>

      <nav
        className="anim-nav flex gap-[18px] md:gap-7 font-sans lowercase"
        style={{ fontSize: "var(--nav-size)", fontWeight: "var(--nav-weight)", color: "var(--nav-color)" }}
      >
        <a href="#work"    className="nav-link">work</a>
        <a href="#about"   className="nav-link">about</a>
        <a href="#contact" className="nav-link">contact</a>
      </nav>
    </header>
  );
}
