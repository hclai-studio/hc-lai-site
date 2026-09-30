import { Fragment } from 'react';
import FigureCaption from './FigureCaption';

// ai-workflow §06 "5 步上手": the five Quick Start steps as one flow.
// Built as an HTML component rather than an SVG so it can re-flow: a row of
// five nodes on desktop, a vertical stack on phones (an 880-wide SVG scaled
// to ~342px would put 16px node titles at ~6px, under the spec §3.2 floor).
// Node tiers follow spec §1.5: cream = the step where the LLM works,
// terracotta 10% + 1.5px terracotta border = the one human decision point.
// Every label is condensed from the step list directly above it in the MDX.

type Tier = 'plain' | 'llm' | 'judge';

interface Step {
  title: string;
  detail: string;
  tag: string;
  tier: Tier;
}

const STEPS: Step[] = [
  { title: '准备输入', detail: '甲方反馈 / 会议纪要 / 领导请求 / 内部聊天', tag: 'raw input', tier: 'plain' },
  { title: '固定 prompt', detail: '粘贴进标准模板', tag: 'standard prompt', tier: 'plain' },
  { title: 'AI 输出 A–E', detail: '五大块结构化初稿', tag: 'structured output', tier: 'llm' },
  { title: '人工审核', detail: '完整性 / 结构 / 原句 / 可执行 / 语气', tag: 'review', tier: 'judge' },
  { title: '进任务库', detail: 'Notion 任务数据库', tag: 'database', tier: 'plain' },
];

// Static literals so Tailwind's scanner sees every class (spec pitfall #13).
const TIER_CLASS: Record<Tier, string> = {
  plain: 'bg-white border border-ink/15',
  llm: 'bg-cream border border-transparent',
  judge: 'bg-terracotta/10 border-[1.5px] border-terracotta',
};

const CAPTION =
  '五步里只有第三步交给 AI：它生成结构化初稿，但任何内容进入任务库之前，都要先过人工审核——检查信息完整性、结构合规性、原句引用、任务可执行性与语气适配性。 / Only the third step is handed to AI. It drafts the structured output, but nothing reaches the task database without a human review of completeness, schema compliance, source quotes, task actionability, and tone.';

export default function QuickStartFlow() {
  return (
    <figure className="w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]">
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <div role="list" className="flex flex-col md:flex-row md:items-stretch">
          {STEPS.map((step, i) => (
            <Fragment key={step.tag}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center text-ink/30 font-sans text-[14px] leading-none h-7 md:h-auto md:w-7 md:shrink-0"
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
              <div role="listitem" className={`md:flex-1 md:min-w-0 rounded-[10px] px-4 py-3 md:px-3 md:py-4 ${TIER_CLASS[step.tier]}`}>
                <span className="block font-sans font-bold text-ink text-[16px] leading-[1.3]">{step.title}</span>
                <span className="block mt-1.5 font-sans text-ink-muted text-[12px] leading-[1.5]">{step.detail}</span>
                <span className="block mt-2 font-mono text-ink-muted text-[11px] leading-[1.4]">{step.tag}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <FigureCaption caption={CAPTION} />
    </figure>
  );
}
