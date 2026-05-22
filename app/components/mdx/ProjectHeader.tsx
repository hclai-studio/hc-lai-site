interface ProjectHeaderProps {
  category: string;
  titleEn: string;
  titleCn: string;
  year: string;
}

export default function ProjectHeader({ category, titleEn, titleCn, year }: ProjectHeaderProps) {
  return (
    <header className="text-center px-6 pt-[80px] pb-[80px] md:pt-[120px] md:px-12">
      {/* Category tag — Geist Mono, uppercase, ink-muted */}
      <p className="font-mono uppercase text-ink-muted text-[11px] tracking-[0.18em] mb-10">
        {category}
      </p>

      {/* English title — Instrument Serif, brand voice consistent with Hero */}
      <h1
        className="font-normal text-ink [font-size:clamp(48px,6vw,80px)] leading-[1.05] tracking-[-0.025em] max-w-[800px] mx-auto mb-5"
        style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif", WebkitFontSmoothing: "subpixel-antialiased" }}
      >
        {titleEn}
      </h1>

      {/* Chinese subtitle — Noto Sans SC, ink-muted */}
      <p className="font-sans-cn font-normal text-ink-muted text-[18px] leading-[1.5] mb-5">
        {titleCn}
      </p>

      {/* Year — Geist Mono */}
      <p className="font-mono text-ink-muted text-[12px] tracking-[0.08em]">
        {year}
      </p>

      <div className="mt-[80px] border-t border-line" />
    </header>
  );
}
