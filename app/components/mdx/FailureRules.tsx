import FigureCaption from './FigureCaption';

// ai-workflow §05 "5 种常见失败模式": each failure mode beside the rule that
// fixes it, resting on the section's one claim — the fix is a rule written
// into the prompt and review, not another try with a different prompt.
// House style follows ProblemSources (§02): white card, a group box with a
// 16 / 400 title and 12 muted subtitle, 12px items, #E8E8E8 dividers, and the
// conclusion as the single terracotta emphasis. It sits at the bottom so the
// figure's weight sits low: an earlier two-column table draft for this spot
// read top-heavy and had no focal point.
// Failures are loose text and rules are boxed chips: what drifts vs what is
// fixed. One list of 5 × (failure, arrow, rule) cells: phones flow it as five
// rows of failure → rule; md+ flows the same cells down three rows and across
// five columns (grid-auto-flow: column), so every rule chip shares one top edge
// and one height.
// Every label is condensed from the failure-mode list directly above it in the
// MDX; the rule wording leans on §03's 字段规范细则 where the list is terse.

const PAIRS = [
  { failCn: '语言混用', failEn: 'Mixed languages', ruleCn: '显式定义输出语言', ruleEn: 'Output language defined explicitly' },
  { failCn: '字段漂移', failEn: 'Schema drift', ruleCn: '锁定 schema 允许值', ruleEn: 'Only allowed schema values' },
  { failCn: '任务太空', failEn: 'Tasks too abstract', ruleCn: '任务用动作动词', ruleEn: 'Every task starts with a verb' },
  { failCn: '未知信息被编造', failEn: 'Unknowns fabricated', ruleCn: '缺失信息列为待确认', ruleEn: 'Missing info logged, never invented' },
  { failCn: '原句引用过度改写', failEn: 'Quotes too loose', ruleCn: '保留原始措辞', ruleEn: 'Quotes kept verbatim' },
];

const CAPTION =
  '五种常见失败各配一条规则。规则写进 prompt 和 review 之后，同样的错就不必再靠“换个 prompt 重试”去碰运气。 / Each of the five common failures gets its own rule. Once the rule is written into the prompt and review, the same mistake no longer depends on retrying with a different prompt.';

// Static literals so Tailwind's scanner sees every class (spec pitfall #13).
// Phones: rows split by horizontal dividers. md+: columns split by vertical
// ones; every column gets the same 12px side padding (the grid sits in a
// -12px gutter so the first and last columns still line up with the title),
// which keeps all five rule chips the same width.
const PAIR_REST = 'border-t border-[#E8E8E8] md:border-t-0 md:border-l';
// Phones: the failure's first line starts level with the rule chip's first line
// (row padding 10px + the chip's 1px border and 8px inner padding = 19px).
const FAIL_PAD = 'pt-[19px] pb-2.5 pr-2 md:pt-3 md:pb-2 md:px-3';
const ARROW_PAD = 'py-2.5 md:py-0 md:px-3';
const RULE_PAD = 'py-2.5 md:py-0 md:px-3';
// Short labels: balance the lines so no single character is left on its own.
const LABEL_CN = 'block font-sans-cn text-[12px] leading-[1.5] text-ink [text-wrap:balance]';
const LABEL_EN = 'block font-sans text-[12px] leading-[1.5] text-ink-muted [text-wrap:balance]';

// Same open chevron as the arrowM5 marker in mechanism-ai-workflow.svg.
function Chevron({ className }: { className: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className}>
      <path d="M0,1 L6.5,4 L0,7" fill="none" stroke="#1C1B17" strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// From a failure to its rule chip. Phones: a short stem pointing right, tip on
// the middle of the chip's left edge (the chip fills the row's height). md+: a
// stem pointing down, tip on the middle of the chip's top edge.
function PairArrow() {
  return (
    <span aria-hidden="true" className="relative block h-full min-h-[20px]">
      <span className="md:hidden absolute top-1/2 left-0.5 right-0 border-t border-ink/30" />
      <Chevron className="md:hidden absolute top-1/2 right-0 -translate-y-1/2 translate-x-[1px]" />
      <span className="hidden md:block absolute top-0 bottom-0 left-1/2 border-l border-ink/30" />
      <Chevron className="hidden md:block absolute bottom-0 left-1/2 -translate-x-[3.5px] translate-y-[0.5px] rotate-90" />
    </span>
  );
}

// From the group box's bottom edge to the conclusion's top edge (as in §02).
function DownArrow() {
  return (
    <div aria-hidden="true" className="relative h-8">
      <span className="absolute top-0 bottom-0 left-1/2 border-l border-ink/30" />
      <Chevron className="absolute bottom-0 left-1/2 -translate-x-[3.5px] translate-y-[0.5px] rotate-90" />
    </div>
  );
}

export default function FailureRules() {
  return (
    <figure className="w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]">
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <div className="rounded-[10px] border border-ink/15 bg-white px-4 pt-4 pb-1.5 md:pb-4">
          <span className="block font-sans-cn text-[16px] leading-[1.3] text-ink">五种失败，各配一条规则</span>
          <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-ink-muted">Five failure modes, one rule each</span>
          <div className="mt-3 border-t border-[#E8E8E8]">
            <div
              role="list"
              className="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1.3fr)] md:-mx-3 md:grid-cols-5 md:grid-rows-[auto_20px_auto] md:grid-flow-col"
            >
              {PAIRS.map((p, i) => (
                <div role="listitem" key={p.failEn} className="contents">
                  <div className={`${i > 0 ? PAIR_REST : ''} ${FAIL_PAD}`}>
                    <span className={LABEL_CN}>{p.failCn}</span>
                    <span className={LABEL_EN}>{p.failEn}</span>
                  </div>
                  <div className={`${i > 0 ? PAIR_REST : ''} ${ARROW_PAD}`}>
                    <PairArrow />
                  </div>
                  <div className={`${i > 0 ? PAIR_REST : ''} ${RULE_PAD}`}>
                    <span className="block h-full rounded-[8px] border border-ink/15 px-2.5 py-2">
                      <span className={LABEL_CN}>{p.ruleCn}</span>
                      <span className={LABEL_EN}>{p.ruleEn}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DownArrow />

        <div className="rounded-[10px] border-[1.5px] border-terracotta bg-terracotta/10 px-4 py-3.5">
          <span className="block font-sans-cn text-[16px] leading-[1.4] font-bold text-terracotta">
            不是“再试试 prompt”——而是在 prompt 和 review 中把规则写死
          </span>
          <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-terracotta/85">
            Not “try a different prompt” — the rule is written into the prompt and review.
          </span>
        </div>
      </div>
      <FigureCaption caption={CAPTION} />
    </figure>
  );
}
