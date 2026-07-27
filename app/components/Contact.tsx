"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // Content is visible by default (see .contact-inner in globals.css). Only opt into
    // the hidden-then-fade-in state if JS is here AND the section isn't already on
    // screen — otherwise a late-loading bundle would hide content the user already sees.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (prefersReducedMotion || alreadyVisible) return;

    inner.classList.add("will-animate");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative z-10 border-t border-line px-6 pt-[80px] pb-[100px] md:px-12 md:pt-[140px] md:pb-[160px]"
    >
      {/* Grid lives on the inner div so section's layout bottom edge is always correct */}
      <div ref={innerRef} className="contact-inner grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-[80px]">
        {/* ── Left: label + heading ───────────────────────────────── */}
        <div>
          <p className="font-mono uppercase text-ink-muted text-[11px] tracking-[0.18em] mb-7">
            003 — Contact
          </p>
          <h2
            className="font-serif font-normal text-ink leading-[0.98] tracking-[-0.025em] [font-size:clamp(44px,5.6vw,84px)]"
          >
            Let&apos;s talk<span className="text-terracotta">.</span>
          </h2>
        </div>

        {/* ── Right: email block ───────────────────────────────────── */}
        <div className="font-sans font-normal text-base leading-[1.65] text-ink">
          <p
            className="mb-6 leading-[1.5] tracking-[0.005em] text-[15px] md:text-[15px]"
          >
            <span className="font-serif italic text-ink-muted text-[17px]">— </span>
            Email is the best way to reach me.
          </p>

          <a
            href="mailto:hello@hclai.studio"
            className="contact-email mb-5 block font-sans font-medium text-[20px] md:text-[24px]"
          >
            hello@hclai.studio
          </a>

          <p className="font-sans text-ink-muted text-[14px] tracking-[0.01em] leading-[1.6]">
            Cold emails welcome. Replies guaranteed if I can.
          </p>
        </div>
      </div>
    </section>
  );
}
