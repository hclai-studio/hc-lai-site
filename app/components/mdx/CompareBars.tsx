interface CompareBarSpec {
  label: string;
  value: string;
}

interface CompareBarsProps {
  before: CompareBarSpec;
  after: CompareBarSpec;
  /** The "after" bar renders at 100/ratio % of the "before" bar's width — a
   *  prop rather than a hardcoded percentage so the 10:1 relationship stays
   *  algebraically exact (can't drift out of sync the way two independently
   *  hand-tuned widths could). */
  ratio: number;
}

export default function CompareBars({ before, after, ratio }: CompareBarsProps) {
  const afterWidthPercent = 100 / ratio;

  return (
    <div className="w-full rounded-xl border border-ink/10 bg-white pl-[34px] pr-5 py-6 md:pl-[34px] md:pr-0 md:pt-[44px] md:pb-0 md:h-[149px] flex flex-col gap-5 md:gap-[17px]">
      {/* md:h-[149px] (border-box, set globally) rather than a hand-summed
          bottom padding — the 18px gap after row 2 falls out for free as
          leftover flex space instead of needing its own arithmetic that has
          to stay in sync with the border width. */}
      {/* Row 1 — "before": full-width track, value inset inside it. */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-[6px]">
        <span className="font-sans text-[13px] text-ink-muted md:w-[95px] md:shrink-0">{before.label}</span>
        <div className="relative w-full md:w-[704px] h-[34px] rounded-[6px] bg-cream">
          {/* The bar's fill is the div's own background — nothing decorative
              to hide here, so aria-hidden isn't needed; the value span below
              is the only accessible content in this container. */}
          <span className="absolute inset-y-0 right-[34px] flex items-center font-mono text-[13px] text-ink-muted whitespace-nowrap">
            {before.value}
          </span>
        </div>
      </div>

      {/* Row 2 — "after": short bar sized as an exact fraction of the same
          reference width, value trailing outside it to the right. */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-[6px]">
        <span className="font-sans text-[13px] font-bold text-ink md:w-[95px] md:shrink-0">{after.label}</span>
        <div className="flex items-center gap-[18px] w-full md:w-[704px]">
          <div
            aria-hidden
            className="h-[34px] rounded-[6px] bg-terracotta/[0.15] border-[1.5px] border-terracotta shrink-0"
            style={{ width: `${afterWidthPercent}%` }}
          />
          <span className="font-mono text-[13px] font-bold text-terracotta whitespace-nowrap">{after.value}</span>
        </div>
      </div>
    </div>
  );
}

export type { CompareBarsProps };
