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
        className="mt-6 w-full flex items-center gap-2 py-3 text-left group/btn outline-none"
      >
        <span className="font-mono text-[15px] text-ink-muted group-hover/btn:text-terracotta transition-colors duration-300 select-none leading-none">
          {isOpen ? "▾" : "▸"}
        </span>
        <span className="font-mono text-[13px] tracking-[0.08em] uppercase text-ink-muted group-hover/btn:text-terracotta transition-colors duration-300 select-none">
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
