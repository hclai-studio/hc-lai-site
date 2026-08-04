interface ChecklistRow {
  item: string;
  status: 'Missing' | 'Partial' | 'Clear';
  notes: string;
  priority: string;
}

// Transcribed verbatim from content/works/ai-workflow.mdx, Mini Case 02 |
// Requirement Intake, Output B "Checklist" — first 6 of 13 total rows.
// That list is flat "Item(parenthetical) — Status,Priority" bullets, not a
// 4-column table: there's no separately-authored "Notes" field in the
// source. Where a bullet has a trailing "(...)" aside, it's extracted here
// as Notes; the 2 of these 6 rows without one show "—" rather than
// inventing content that isn't in the original text.
// TODO: swap to design-refs/ai-workflow-checklist.csv (real Notion export,
// 4 native columns) once the author drops it in — this parenthetical-split
// logic goes away at that point.
const ROWS: ChecklistRow[] = [
  { item: '交付页数与结构明确', status: 'Clear', notes: '1 页总结 + 2 页支撑', priority: 'P0' },
  { item: '评审时间的具体日期与截止时间', status: 'Missing', notes: '—', priority: 'P0' },
  { item: '1 页总结页的信息架构', status: 'Partial', notes: '结论先行', priority: 'P0' },
  { item: '三个方向的定义与命名', status: 'Missing', notes: '每个方向一句话定位', priority: 'P0' },
  { item: '三方向差异的对比维度与口径', status: 'Partial', notes: '—', priority: 'P0' },
  { item: '造价信息输入', status: 'Partial', notes: '预算红线、上限、计价范围 / 假设', priority: 'P0' },
];

// Same flattened ink/10%-on-white value as TaskTable.tsx — kept opaque so
// the divider doesn't shift color crossing the cream Notes column.
const DIVIDER_COLOR = '#E8E8E8';
// Literal static string, not built from DIVIDER_COLOR — see TaskTable.tsx
// for why a template-literal version silently loses its CSS.
const dividerMiddleShadow = 'shadow-[inset_0_1px_0_0_#E8E8E8]';

function dividerEdgeStyle(edge: 'first' | 'last') {
  const color = DIVIDER_COLOR;
  const gradient =
    edge === 'first'
      ? `linear-gradient(to right, transparent 10px, ${color} 10px)`
      : `linear-gradient(to right, ${color} calc(100% - 10px), transparent calc(100% - 10px))`;
  return {
    backgroundImage: gradient,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    backgroundPosition: 'top',
  };
}

// Flat ink-muted/400 hierarchy — only Status:Missing (the "gap" marker)
// jumps to ink/700, matching TaskTable's Owner:TBD treatment.
function StatusCell({ status }: { status: ChecklistRow['status'] }) {
  const cls = status === 'Missing' ? 'text-ink font-bold' : 'text-ink-muted font-normal';
  return <span className={`font-sans text-[13px] ${cls}`}>{status}</span>;
}

function PriorityCell({ priority }: { priority: string }) {
  return <span className="font-mono text-[13px] text-ink-muted font-normal">{priority}</span>;
}

export default function Checklist({
  label = '需求文档 · REQUIREMENTS DOC → CHECKLIST',
}: {
  label?: string;
}) {
  const lastIndex = ROWS.length - 1;

  return (
    <div>
      <div className="font-mono text-[12px] tracking-[0.1em] text-ink-muted mb-2">{label}</div>

      {/* Desktop / tablet: real table */}
      <div className="hidden sm:block rounded-xl border border-ink/10 bg-white overflow-hidden">
        <div className="p-5">
          <table className="checklist-table w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[330px]" />
              <col className="w-[100px]" />
              <col className="w-[350px]" />
              <col className="w-[60px]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Item</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Status</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em] bg-cream rounded-t-lg">Notes</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Priority</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const isLast = i === lastIndex;
                return (
                  <tr key={i}>
                    <td
                      className="min-h-[54px] py-3 px-3 align-middle text-left font-sans text-ink-muted text-[13px] leading-[1.6] [text-wrap:pretty]"
                      style={dividerEdgeStyle('first')}
                    >
                      {row.item}
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-center ${dividerMiddleShadow}`}>
                      <StatusCell status={row.status} />
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-left font-sans text-ink-muted text-[13px] leading-[1.6] [text-wrap:pretty] bg-cream ${dividerMiddleShadow} ${isLast ? 'rounded-b-lg' : ''}`}>
                      {row.notes}
                    </td>
                    <td
                      className="min-h-[54px] py-3 px-3 align-middle text-center"
                      style={dividerEdgeStyle('last')}
                    >
                      <PriorityCell priority={row.priority} />
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
        {ROWS.map((row, i) => (
          <div key={i} className="rounded-xl border border-ink/10 bg-white p-3">
            <div className="flex items-center gap-2">
              <PriorityCell priority={row.priority} />
              <span className="text-ink-muted text-[13px]">·</span>
              <StatusCell status={row.status} />
            </div>
            <p className="font-sans text-ink-muted text-[13px] leading-[1.6] mt-2 [text-wrap:pretty]">{row.item}</p>
            <p className="font-sans text-ink-muted text-[13px] leading-[1.6] mt-3 bg-cream rounded-lg p-3 [text-wrap:pretty]">
              {row.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
