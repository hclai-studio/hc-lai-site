type Verdict = "primary" | "stretch" | "skip";

interface DecisionRow {
  date: string;
  role: string;
  roleQualifier?: string;
  risk: string;
  verdict: Verdict;
  reason: string;
}

const rows: DecisionRow[] = [
  {
    date: "05-02",
    role: "AI 产品经理",
    roleQualifier: "建筑方向",
    risk: "模型训练与优化有技术门槛",
    verdict: "stretch",
    reason: "建筑背景是这岗少有的硬门槛，你天然过了，值得试一试。",
  },
  {
    date: "05-03",
    role: "AI 产品经理",
    risk: "Python / 系统对接有权重",
    verdict: "stretch",
    reason: "叫“产品经理”但做的是 workflow 落地，你的原型经验直接说得上话，值得试。",
  },
  {
    date: "05-03",
    role: "产品经理",
    roleQualifier: "全生命周期",
    risk: "明确招 2026 届应届生",
    verdict: "skip",
    reason: "专招应届生且偏工程背景，两道硬门槛同时卡住，这一轮先跳过。",
  },
  {
    date: "05-03",
    role: "女装 AI 产品专家",
    risk: "JSON 配置 / 系统集成有门槛",
    verdict: "stretch",
    reason: "流程梳理和协同落地是你的真实优势，但技术实施那半块是真门槛，冲了再说。",
  },
  {
    date: "05-03",
    role: "AI 产品策划",
    risk: "要求独立主导产品全流程",
    verdict: "skip",
    reason: "名字像，但这是要你独立做产品的 PM 岗，不是你的方向。",
  },
  {
    date: "05-04",
    role: "AI 产品经理",
    risk: "PM 角色要求完整产品能力",
    verdict: "stretch",
    reason: "门槛不高、方向对味，别把自己包装成纯 PM，突出“协同推进＋落地”更稳。",
  },
  {
    date: "05-04",
    role: "AI 产品经理",
    risk: "平台依赖性强，需快速学习平台专有体系",
    verdict: "primary",
    reason: "工作流设计＋需求拆解＋AI 落地，几乎全命中你的核心能力，冲它。",
  },
  {
    date: "05-04",
    role: "AI 产品运营",
    roleQualifier: "校招",
    risk: "实质是社媒内容＋增长",
    verdict: "skip",
    reason: "典型同名异向，核心工作是发内容和拉新留存，不是你想走的那条路。",
  },
  {
    date: "05-04",
    role: "大模型 AI 产品运营",
    risk: "实质是语料标注与算法支持",
    verdict: "skip",
    reason: "title 写的是产品运营，做的是算法语料标注，偏差太大，别被名字骗了。",
  },
  {
    date: "05-04",
    role: "AI 产品运营",
    risk: "实质是投放（SEM/KOL）运营",
    verdict: "skip",
    reason: "名字叫产品运营，做的是投广告写 brief，绕路了。",
  },
];

const verdictLabel: Record<Verdict, string> = {
  primary: "主投",
  stretch: "可冲",
  skip: "暂不主投",
};

// Terracotta is a scarce sitewide accent — the "primary" row/badge must stay
// unique to exactly one row in this table. If a future data edit produces
// more than one "primary" row, revert to a neutral (ink-based) treatment
// instead of letting terracotta repeat.
function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const base =
    "inline-flex items-center whitespace-nowrap font-sans text-[12px] tracking-[0.05em] px-2 py-0.5 rounded border";
  const style =
    verdict === "primary"
      ? "border-terracotta text-terracotta bg-white"
      : verdict === "stretch"
        ? "border-ink/40 text-ink"
        : "border-ink/15 text-ink-muted";

  return <span className={`${base} ${style}`}>{verdictLabel[verdict]}</span>;
}

function RoleCell({ role, roleQualifier }: { role: string; roleQualifier?: string }) {
  return (
    <>
      <div className="font-sans font-medium text-ink text-[13px]">{role}</div>
      {roleQualifier && (
        <div className="font-sans text-ink-muted text-[12px] mt-0.5">{roleQualifier}</div>
      )}
    </>
  );
}

// Row-level highlight: primary gets a terracotta box (built from per-cell
// borders so the verdict cell can stay white while the border stays
// unbroken), stretch gets a continuous cream fill, skip is unstyled.
function rowClass(verdict: Verdict) {
  if (verdict === "primary") return "bg-[#B85C38]/[0.08]";
  if (verdict === "stretch") return "border-b border-ink/10 last:border-b-0 bg-cream";
  return "border-b border-ink/10 last:border-b-0";
}

function primaryCellBorder(edge: "first" | "middle" | "last") {
  const side = edge === "first" ? " border-l" : edge === "last" ? " border-r" : "";
  return `border-t border-b border-terracotta${side}`;
}

const breakoutClass =
  "w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]";

export default function DecisionTable() {
  return (
    <figure className={`my-10 ${breakoutClass}`}>
      {/* Desktop / tablet: real table, white card with an inset content region so
          separator lines never touch the card's outer edge. */}
      <div className="hidden sm:block rounded-xl border border-ink/10 bg-white overflow-hidden">
        <div className="p-5">
          <table className="decision-table w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[18%]" />
              <col className="w-[24%]" />
              <col className="w-[11%]" />
              <col className="w-[37%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-ink/20">
                <th className="py-3 px-3 align-middle text-center font-sans font-normal text-ink-muted text-[12px] tracking-[0.08em]">
                  日期
                </th>
                <th className="py-3 px-3 align-middle text-center font-sans font-normal text-ink-muted text-[12px] tracking-[0.08em]">
                  岗位
                </th>
                <th className="py-3 px-3 align-middle text-left font-sans font-normal text-ink-muted text-[12px] tracking-[0.08em]">
                  风险点
                </th>
                <th className="py-3 px-3 align-middle text-center font-sans font-normal text-ink-muted text-[12px] tracking-[0.08em]">
                  结论
                </th>
                <th className="py-3 px-3 align-middle text-left font-sans font-normal text-ink-muted text-[12px] tracking-[0.08em]">
                  投递理由
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isPrimary = row.verdict === "primary";
                return (
                  <tr key={i} className={rowClass(row.verdict)}>
                    <td
                      className={`py-3 px-3 align-middle text-center font-mono text-ink-muted text-[12px] tracking-[0.05em] ${isPrimary ? primaryCellBorder("first") : ""}`}
                    >
                      {row.date}
                    </td>
                    <td className={`py-3 px-3 align-middle text-center ${isPrimary ? primaryCellBorder("middle") : ""}`}>
                      <RoleCell role={row.role} roleQualifier={row.roleQualifier} />
                    </td>
                    <td
                      className={`py-3 px-3 align-middle text-left font-serif-cn text-ink-muted text-[13px] [text-wrap:pretty] ${isPrimary ? primaryCellBorder("middle") : ""}`}
                    >
                      {row.risk}
                    </td>
                    <td
                      className={`py-3 px-3 align-middle text-center ${isPrimary ? `${primaryCellBorder("middle")} bg-white` : ""}`}
                    >
                      <VerdictBadge verdict={row.verdict} />
                    </td>
                    <td
                      className={`py-3 px-3 align-middle text-left font-serif-cn text-ink text-[13px] leading-[1.7] [text-wrap:pretty] ${isPrimary ? primaryCellBorder("last") : ""}`}
                    >
                      {row.reason}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {rows.map((row, i) => {
          const cardClass =
            row.verdict === "primary"
              ? "border border-terracotta bg-[#B85C38]/[0.08]"
              : row.verdict === "stretch"
                ? "border border-ink/10 bg-cream"
                : "border border-ink/10 bg-white";
          return (
            <div key={i} className={`rounded-xl p-3 ${cardClass}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <RoleCell role={row.role} roleQualifier={row.roleQualifier} />
                </div>
                <VerdictBadge verdict={row.verdict} />
              </div>
              <p className="font-mono text-ink-muted text-[12px] tracking-[0.05em] mt-1">
                {row.date}
              </p>
              <p className="font-serif-cn text-ink-muted text-[13px] mt-2">{row.risk}</p>
              <p className="font-serif-cn text-ink text-[13px] leading-[1.7] mt-2">{row.reason}</p>
            </div>
          );
        })}
      </div>

      <figcaption className="font-mono text-ink-muted text-[13px] tracking-[0.05em] leading-[1.6] text-left mt-4">
        节选 10 条 · 完整台账 decisions_log.csv 共 108 条记录 / Excerpt of 10 — full log: 108 entries in decisions_log.csv
      </figcaption>
    </figure>
  );
}
