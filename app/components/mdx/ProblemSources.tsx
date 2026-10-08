import FigureCaption from './FigureCaption';

// ai-workflow §02 "为什么做这个": one top-to-bottom chain — where the
// information lives → the five problems it causes → the section's closing
// line as the one emphasis. Same shape at every width; only the problems row
// re-flows (five columns on desktop, a list on phones).
// Each arrow runs from the centre of one box's bottom edge to the centre of
// the next box's top edge, so it can only point at that box.
// Type follows the site's SVG house style (mechanism-ai-workflow.svg): group
// titles 16 / 400 / ink with a 12 muted subtitle; everything listed under a
// group title is an item at 12 — sources and problems alike, since they sit
// at the same level. Only the conclusion goes 16 / 700 / terracotta. No cream:
// cream marks the LLM layer (spec §1.5) and this figure has none.
// Every label is taken from the §02 text directly above it in the MDX.

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

// Same open chevron as the arrowM5 marker in mechanism-ai-workflow.svg,
// rotated to point down; its tip touches the next box's top edge.
function DownArrow() {
  return (
    <div aria-hidden="true" className="relative h-8">
      <span className="absolute top-0 bottom-0 left-1/2 border-l border-ink/30" />
      <svg width="8" height="8" viewBox="0 0 8 8" className="absolute bottom-0 left-1/2 -translate-x-[3.5px] translate-y-[0.5px] rotate-90">
        <path d="M0,1 L6.5,4 L0,7" fill="none" stroke="#1C1B17" strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function GroupTitle({ cn, en }: { cn: string; en: string }) {
  return (
    <span className="block">
      <span className="block font-sans-cn text-[16px] leading-[1.3] text-ink">{cn}</span>
      <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-ink-muted">{en}</span>
    </span>
  );
}

function Item({ cn, en }: { cn: string; en: string }) {
  return (
    <>
      <span className="block font-sans-cn text-[12px] leading-[1.5] text-ink">{cn}</span>
      <span className="block font-sans text-[12px] leading-[1.5] text-ink-muted">{en}</span>
    </>
  );
}

export default function ProblemSources() {
  return (
    <figure className="w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]">
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <div className="rounded-[10px] border border-ink/15 bg-white p-4">
          <GroupTitle cn="信息散落在" en="Scattered across" />
          <div role="list" className="mt-3 grid grid-cols-3 border-t border-[#E8E8E8]">
            {SOURCES.map((s, i) => (
              <div role="listitem" key={s.en} className={`pt-3 pr-3 ${i > 0 ? 'border-l border-[#E8E8E8] pl-3' : ''}`}>
                <Item cn={s.cn} en={s.en} />
              </div>
            ))}
          </div>
        </div>

        <DownArrow />

        <div className="rounded-[10px] border border-ink/15 bg-white px-4 pt-4 pb-1 md:pb-4">
          <GroupTitle cn="反复出现的五个问题" en="Five recurring problems" />
          <div role="list" className="mt-3 border-t border-[#E8E8E8] md:grid md:grid-cols-5">
            {PROBLEMS.map((p, i) => (
              <div
                role="listitem"
                key={p.en}
                className={`py-2.5 md:pt-3 md:pb-0 md:pr-3 ${i > 0 ? 'border-t border-[#E8E8E8] md:border-t-0 md:border-l md:pl-3' : ''}`}
              >
                <Item cn={p.cn} en={p.en} />
              </div>
            ))}
          </div>
        </div>

        <DownArrow />

        <div className="rounded-[10px] border-[1.5px] border-terracotta bg-terracotta/10 px-4 py-3.5">
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
