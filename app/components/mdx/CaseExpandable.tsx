"use client";

import { useState } from "react";

interface CaseExpandableProps {
  title: string;
  scenario: string;
  whyItMatters: string;
  whatItProves: string[];
  defaultOpen?: boolean;
  expandHint?: string;
  children: React.ReactNode;
}

export default function CaseExpandable({
  title,
  scenario,
  whyItMatters,
  whatItProves,
  defaultOpen = false,
  expandHint,
  children,
}: CaseExpandableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-8 border-t border-line pt-6 pb-2">
      {/* Title row — click to toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-baseline justify-between text-left group/title outline-none"
      >
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted">
          {title}
        </span>
        <span className="flex flex-col items-end gap-0.5 ml-4 shrink-0">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted group-hover/title:text-terracotta transition-colors duration-300 select-none whitespace-nowrap">
            {isOpen ? "↑ COLLAPSE" : "↓ READ FULL CASE"}
          </span>
          {!isOpen && expandHint && (
            <span className="font-mono text-[9px] tracking-[0.06em] uppercase text-ink-muted select-none">
              {expandHint}
            </span>
          )}
        </span>
      </button>

      {/* Always visible: Scenario / Why it matters / Findings */}
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

      {/* Collapsible deep content */}
      {isOpen && (
        <div className="mt-6 border-l border-line pl-6">
          {children}
        </div>
      )}
    </div>
  );
}
