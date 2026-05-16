"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
      className="contact-section relative z-10 grid grid-cols-1 items-start border-t border-line gap-10 px-6 pt-[80px] pb-[100px] md:grid-cols-[1fr_1.1fr] md:gap-[80px] md:px-12 md:pt-[140px] md:pb-[160px]"
    >
      {/* ── Left: label + heading ─────────────────────────────────── */}
      <div>
        <p className="font-mono uppercase text-ink-muted text-[10px] tracking-[0.18em] mb-7">
          003 — Contact
        </p>
        <h2
          className="font-serif font-normal text-ink leading-[0.98] tracking-[-0.025em] [font-size:clamp(44px,5.6vw,84px)]"
        >
          Let&apos;s talk<span className="text-terracotta">.</span>
        </h2>
      </div>

      {/* ── Right: email block ────────────────────────────────────── */}
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

        <p className="font-mono text-ink-muted text-[10px] tracking-[0.12em]">
          Cold emails welcome. Replies guaranteed if I can.
        </p>
      </div>
    </section>
  );
}
