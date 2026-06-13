"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function check() {
      setScrolled(window.scrollY > 60);
    }
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
      {/* BrandMark entrance: same timing as hero annotation (300ms) */}
      <div className="anim-annotation">
        <BrandMark />
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
