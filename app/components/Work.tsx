const works = [
  {
    number: "01",
    titleEn: "AI Workflow & Enablement Portfolio",
    titleCn: "AI 工作流与运营支持原型",
    description:
      "一个工作流组合，展示如何将零散的项目输入转化为结构化、可追溯且可重复使用的输出。",
    tags: ["AI Workflow", "Structured"],
    year: "2026",
    href: "/works/ai-workflow",
  },
  {
    number: "02",
    titleEn: "Semi-agentic Architectural Image Iteration",
    titleCn: "Nanobanana 半自动建筑工作流",
    description:
      "围绕建筑效果图多轮生成场景搭建的半自动工作流原型，用于串联白模输入、prompt 装配、图像生成与 round/state 状态管理。",
    tags: ["AIGC", "Architecture"],
    year: "2026",
    href: "/works/nanobanana",
  },
  {
    number: "03",
    titleEn: "Semi-automated Job Decision Workflow",
    titleCn: "AI 求职决策助手",
    description:
      "基于真实 job search 痛点搭建的半自动决策工作流，用 Claude API 解析 JD、把岗位信息差异化呈现为结构化的「投递决策卡」。",
    tags: ["AI Workflow", "Ops Tooling"],
    year: "2026",
    href: "/works/job-decision",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="relative z-10 border-t border-line px-6 pt-[80px] pb-[100px] md:px-12 md:pt-[140px] md:pb-[160px]"
    >
      {/* Section label */}
      <p className="font-mono uppercase text-ink-muted text-[11px] tracking-[0.18em] mb-[60px]">
        002 — Work
      </p>

      {/* Work rows */}
      <div>
        {works.map((work, i) => (
          <a
            key={work.number}
            href={work.href}
            className={`work-row${i === works.length - 1 ? " work-row-last" : ""}`}
          >
            {/* Number — matches HTML: 12px, tracking 0.1em, pt 8px */}
            <span className="font-mono text-ink-muted text-[12px] tracking-[0.1em] pt-[8px]">
              {work.number}
            </span>

            {/* Main content — flex-col gap-3 matching HTML work-body gap: 12px */}
            <div className="flex flex-col gap-3">
              <div>
                <h3
                  className="work-title font-normal text-ink [font-size:clamp(28px,3.4vw,38px)] leading-[1.1] tracking-[-0.015em]"
                  style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif", WebkitFontSmoothing: "auto" }}
                >
                  {work.titleEn}
                </h3>
                {/* Chinese subtitle — Noto Sans SC, 16px, tracking 0.02em, mt 8px */}
                <p className="font-sans-cn font-normal text-ink-muted text-[16px] leading-[1.5] tracking-[0.02em] mt-2">
                  {work.titleCn}
                </p>
              </div>
              {/* Description — Noto Serif SC (not Sans SC), 15px, tracking 0.02em */}
              <p className="work-desc font-serif-cn font-normal text-ink-muted text-[15px] leading-[1.65] tracking-[0.02em]">
                {work.description}
              </p>
            </div>

            {/* Meta tags — 10px, tracking 0.1em, pt 12px, gap 4px */}
            <div className="work-meta flex flex-col gap-1 pt-[12px]">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono uppercase text-ink-muted text-[10px] tracking-[0.1em]"
                >
                  {tag}
                </span>
              ))}
              <span className="font-mono text-ink-muted text-[10px] tracking-[0.1em] mt-1">
                {work.year}
              </span>
            </div>

            {/* Arrow — serif, 24px, pt 6px, text-right */}
            <div className="work-arrow font-serif text-ink-muted text-[24px] pt-[6px] text-right">
              →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
