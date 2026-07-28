import { Fragment } from 'react';

interface Stat {
  value: string;
  label: string;
  accent?: boolean;
}

interface StatRowProps {
  stats: [Stat, Stat, Stat];
}

// Desktop vertical dividers sit at the two column boundaries of an 880-wide
// card with 20px side padding and three equal 280px columns (20+280=300,
// 300+280=580) — pinned to those literal coordinates rather than derived
// from a computed percentage so they can't drift out of sync with the
// column grid if it's ever retuned.
const DIVIDER_LEFT = ['300px', '580px'] as const;

export default function StatRow({ stats }: StatRowProps) {
  return (
    <div className="relative w-full rounded-xl border border-ink/10 bg-white px-5 flex flex-col md:flex-row md:h-[142px]">
      {stats.map((stat, i) => (
        // Each stat is its own single-pair <dl> (rather than one shared <dl>
        // with divider elements as siblings) so the divider — a plain <div>,
        // not a dt/dd — never has to live inside a <dl>, which HTML doesn't
        // allow mixing.
        <Fragment key={i}>
          <dl className="m-0 flex-1 flex flex-col-reverse items-center justify-center gap-4 py-6 md:py-0">
            {/* DOM order is label-then-value (a <dl> reads term-then-
                description) even though flex-col-reverse visually shows the
                number on top — screen readers follow DOM order, not the
                flex visual order, so this keeps "label: value" reading
                correct without fighting the visual layout. */}
            <dt className="font-sans text-[12px] tracking-[0.02em] text-ink-muted">{stat.label}</dt>
            <dd
              className={`m-0 font-mono text-[32px] md:text-[38px] font-medium ${
                stat.accent ? 'text-terracotta' : 'text-ink'
              }`}
            >
              {stat.value}
            </dd>
          </dl>
          {i < stats.length - 1 && (
            <div aria-hidden className="md:hidden mx-[10px] border-t border-ink/10" />
          )}
        </Fragment>
      ))}
      {DIVIDER_LEFT.map((left) => (
        <span
          key={left}
          aria-hidden
          className="hidden md:block absolute top-1/2 -translate-y-1/2 w-px h-[81px] bg-ink/10"
          style={{ left }}
        />
      ))}
    </div>
  );
}
