import FigureCaption from './FigureCaption';

// ai-workflow §02 "为什么做这个": where the information lives → the five
// problems it causes → the section's closing line as the one emphasis.
// HTML rather than SVG so it re-flows: sources stacked on the left with a ⊐
// bracket into the problem list on desktop; sources in a row with a ⊔
// bracket down into the list on phones.
// Type follows the site's SVG house style (mechanism-ai-workflow.svg):
// titles 16 / 400 / ink, subtitles and list items 12, the judgment-style
// conclusion alone 16 / 700 / terracotta. No cream here — cream marks the LLM
// layer (spec §1.5) and this figure has none. Every label is taken from the
// §02 text directly above it in the MDX.

const SOURCES = [
  { cn: '聊天', en: 'Conversations' },
  { cn: '反馈', en: 'Feedback' },
  { cn: '零碎记录', en: 'Informal notes' },
];

const PROBLEMS = [
  { cn: '任务遗漏', en: 'Key tasks easily missed' },
  { cn: '风险暴露滞后', en: 'Risks surface too late' },
  { cn: '未知信息被掩盖', en: 'Unknowns hidden instead of made explicit' },
  { cn: '输出不一致难复用', en: 'Outputs inconsistent and hard to reuse' },
  { cn: '汇报内容反复重写', en: 'Leadership communication rebuilt from scratch every time' },
];

const CAPTION =
  '三个来源，带出同一组问题：问题不在某一个渠道，而在关键信息本身是分散的。 / Three sources, one set of problems: the trouble is not any single channel but that the key information is scattered in the first place.';

// Same open chevron as the arrowM5 marker in mechanism-ai-workflow.svg.
function Chevron({ dir }: { dir: 'right' | 'down' }) {
  return (
    <svg
      aria-hidden="true"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      className={`absolute ${dir === 'right' ? 'right-0 top-1/2 -translate-y-1/2' : 'bottom-0 left-1/2 -translate-x-1/2 rotate-90'}`}
    >
      <path d="M0,1 L6.5,4 L0,7" fill="none" stroke="#1C1B17" strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GroupLabel({ cn, en }: { cn: string; en: string }) {
  return (
    <span className="block mb-3">
      <span className="block font-sans-cn text-[16px] leading-[1.3] text-ink">{cn}</span>
      <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-ink-muted">{en}</span>
    </span>
  );
}

export default function ProblemSources() {
  return (
    <figure className="w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]">
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,30%)_56px_minmax(0,1fr)] md:grid-rows-[auto_1fr]">
          <div className="md:col-start-1 md:row-start-1">
            <GroupLabel cn="信息散落在" en="Scattered across" />
          </div>

          <div role="list" className="grid grid-cols-3 gap-2 md:col-start-1 md:row-start-2 md:grid-cols-1 md:grid-rows-3">
            {SOURCES.map((s) => (
              <div role="listitem" key={s.en} className="flex flex-col justify-center rounded-[10px] border border-ink/15 bg-white px-3 py-3 md:px-4">
                <span className="block font-sans-cn text-[16px] leading-[1.3] text-ink">{s.cn}</span>
                <span className="block mt-1 font-sans text-[12px] leading-[1.4] text-ink-muted">{s.en}</span>
              </div>
            ))}
          </div>

          {/* Connector. The bracket's ends sit on the outer boxes' centres:
              with three equal cells and an 8px gap, those are at
              (100% − 16px) / 6 from either end. */}
          <div aria-hidden="true" className="relative h-14 md:hidden">
            <span className="absolute top-0 h-4 left-[calc((100%-16px)/6)] right-[calc((100%-16px)/6)] border-x border-b border-ink/30 rounded-b-lg" />
            <span className="absolute top-0 left-1/2 h-4 border-l border-ink/30" />
            <span className="absolute top-4 bottom-1 left-1/2 border-l border-ink/30" />
            <Chevron dir="down" />
          </div>
          <div aria-hidden="true" className="relative hidden md:block md:col-start-2 md:row-start-2">
            <span className="absolute left-0 w-5 top-[calc((100%-16px)/6)] bottom-[calc((100%-16px)/6)] border-y border-r border-ink/30 rounded-r-lg" />
            <span className="absolute left-0 w-5 top-1/2 border-t border-ink/30" />
            <span className="absolute left-5 right-1 top-1/2 border-t border-ink/30" />
            <Chevron dir="right" />
          </div>

          <div className="md:col-start-3 md:row-start-1">
            <GroupLabel cn="反复出现的五个问题" en="Five recurring problems" />
          </div>
          <div role="list" className="flex flex-col rounded-[10px] border border-ink/15 bg-white px-4 py-1 md:col-start-3 md:row-start-2">
            {PROBLEMS.map((p, i) => (
              <div role="listitem" key={p.en} className={`py-2.5 ${i > 0 ? 'border-t border-[#E8E8E8]' : ''}`}>
                <span className="block font-sans-cn text-[12px] leading-[1.5] text-ink">{p.cn}</span>
                <span className="block font-sans text-[12px] leading-[1.5] text-ink-muted">{p.en}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[10px] border-[1.5px] border-terracotta bg-terracotta/10 px-4 py-3.5">
          <span className="block font-sans-cn text-[16px] leading-[1.4] font-bold text-terracotta">
            不是“用上 AI 工具”就能解决的问题——需要设计一套结构化的工作流
          </span>
          <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-terracotta/85">
            Not problems “using an AI tool” can fix — they need a structured workflow.
          </span>
        </div>
      </div>
      <FigureCaption caption={CAPTION} />
    </figure>
  );
}
