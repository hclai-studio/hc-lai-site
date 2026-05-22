interface CaseExpandableProps {
  title: string;
  scenario: string;
  whyItMatters: string;
  whatItProves: string[];
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function CaseExpandable({
  title,
  scenario,
  whyItMatters,
  whatItProves,
  defaultOpen = false,
  children,
}: CaseExpandableProps) {
  return (
    <div className="my-8 border-t border-line pt-6 pb-2">
      {/* Mono uppercase case label */}
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted mb-3">
        {title}
      </div>

      {/* Scenario — italic, prose-works p styles apply */}
      <p style={{ fontStyle: 'italic' }}>{scenario}</p>

      {/* Why it matters — prose-works p styles apply */}
      <p>{whyItMatters}</p>

      {/* What it proves — prose-works ul styles apply */}
      <ul>
        {whatItProves.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Native details/summary — SSR-safe, keyboard accessible */}
      <details {...(defaultOpen ? { open: true } : {})} className="group">
        <summary className="case-summary list-none cursor-pointer outline-none mt-4">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted hover:text-terracotta transition-colors duration-300 select-none">
            <span className="group-open:hidden">↓ READ FULL CASE</span>
            <span className="hidden group-open:inline">↑ COLLAPSE</span>
          </span>
        </summary>
        <div className="mt-6 border-l border-line pl-6">
          {children}
        </div>
      </details>
    </div>
  );
}
