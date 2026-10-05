"use client";

import { useState } from "react";

interface CaseExpandableProps {
  title: string;
  scenario: string;
  whyItMatters: string;
  whatItProves: string[];
  defaultOpen?: boolean;
  alwaysOpen?: boolean;
  children: React.ReactNode;
}

export default function CaseExpandable({
  title,
  scenario,
  whyItMatters,
  whatItProves,
  defaultOpen = false,
  alwaysOpen = false,
  children,
}: CaseExpandableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const preview = (
    <>
      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted mb-1 mt-4">Scenario</p>
      <p>{scenario}</p>

      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted mb-1 mt-4">Why it matters</p>
      <p>{whyItMatters}</p>

      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted mb-1 mt-4">Findings</p>
      <ul>
        {whatItProves.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );

  // Always-open: no toggle, all content inline
  if (alwaysOpen) {
    return (
      <div className="my-8 border-t border-line pt-6 pb-2">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted mb-3">
          {title}
        </div>
        {preview}
        <div className="mt-6">
          {children}
        </div>
      </div>
    );
  }

  // Default: plain title + bottom button toggle + inline expansion
  return (
    <div className="my-8 border-t border-line pt-6 pb-2">
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted mb-3">
        {title}
      </div>

      {preview}

      {/* Bottom toggle button — no border, larger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="mt-6 w-full flex items-center gap-2.5 py-3 text-left group/btn outline-none"
      >
        {/* Closed: terracotta at rest so first-time visitors (and phones,
            which have no hover) can see this is an entry point; hover nudges
            the arrow and underlines the label. Open: back to muted, terracotta
            on hover — the colour marks what hasn't been opened yet. */}
        {/* An SVG triangle rather than the ▸/▾ glyphs: the glyphs sit on the
            font's baseline and read a little low next to the caps label, an
            8px box centred by flex lines up with the cap height instead. */}
        <svg
          aria-hidden="true"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          className={`shrink-0 transition-transform duration-300 ${
            isOpen
              ? "rotate-90 text-ink-muted group-hover/btn:text-terracotta"
              : "text-terracotta group-hover/btn:translate-x-1"
          }`}
        >
          <path d="M1.5,0.5 L7,4 L1.5,7.5 Z" fill="currentColor" />
        </svg>
        <span
          className={`font-mono text-[13px] tracking-[0.08em] uppercase select-none underline-offset-[6px] decoration-1 transition-colors duration-300 ${
            isOpen
              ? "text-ink-muted group-hover/btn:text-terracotta"
              : "text-terracotta decoration-transparent underline group-hover/btn:decoration-terracotta/50"
          }`}
        >
          {isOpen ? "COLLAPSE" : "READ FULL CASE"}
        </span>
      </button>

      {/* Expands right below the button */}
      {isOpen && (
        <div className="mt-0 pt-6 border-l border-line pl-6">
          {children}
        </div>
      )}
    </div>
  );
}
