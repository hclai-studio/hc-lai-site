import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ChecklistRow {
  item: string;
  status: 'Missing' | 'Partial' | 'Clear';
  notes: string;
  priority: string;
}

// Real Notion export (converted from the author's .xlsx-as-.csv — see the
// migration note in design-refs/ for that detail). Column order in the file
// is Item/Status/Notes/Priority; this component reorders for display only,
// the source data and design-refs/ai-workflow-checklist.csv itself are
// untouched.
function loadRows(limit: number): ChecklistRow[] {
  const filePath = join(process.cwd(), 'design-refs', 'ai-workflow-checklist.csv');
  const text = readFileSync(filePath, 'utf-8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const lines = text.trim().split('\n');
  const header = lines[0].split(',');
  const col = (name: string) => header.indexOf(name);
  const iI = col('Item'), sI = col('Status'), nI = col('Notes'), pI = col('Priority');

  return lines
    .slice(1, 1 + limit)
    .map((line) => line.split(','))
    .map((cols) => ({
      item: cols[iI],
      status: cols[sI] as ChecklistRow['status'],
      notes: cols[nI],
      priority: cols[pI],
    }));
}

// Same flattened ink/10%-on-white value as TaskTable.tsx — kept opaque so
// the divider doesn't shift color crossing the cream Notes column.
// Literal static string, not built from a variable — see TaskTable.tsx for
// why a template-literal version silently loses its CSS.
const dividerMiddleShadow = 'shadow-[inset_0_1px_0_0_#E8E8E8]';

function dividerEdgeStyle(edge: 'first' | 'last') {
  const color = '#E8E8E8';
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
  limit = 6,
}: {
  label?: string;
  limit?: number;
}) {
  const rows = loadRows(limit);
  const lastIndex = rows.length - 1;

  return (
    <div>
      <div className="font-mono text-[12px] tracking-[0.1em] text-ink-muted mb-2">{label}</div>

      {/* Desktop / tablet: real table. Column order — Priority / Item /
          Status / Notes — mirrors TaskTable: shared Priority column leftmost,
          cream column rightmost and same 350px width. */}
      <div className="hidden sm:block rounded-xl border border-ink/10 bg-white overflow-hidden">
        <div className="p-5">
          <table className="checklist-table w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[60px]" />
              <col className="w-[330px]" />
              <col className="w-[100px]" />
              <col className="w-[350px]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Priority</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Item</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Status</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em] bg-cream rounded-t-lg">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isLast = i === lastIndex;
                return (
                  <tr key={i}>
                    <td
                      className="min-h-[54px] py-3 px-3 align-middle text-center"
                      style={dividerEdgeStyle('first')}
                    >
                      <PriorityCell priority={row.priority} />
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-left font-sans text-ink-muted text-[13px] leading-[1.6] [text-wrap:pretty] ${dividerMiddleShadow}`}>
                      {row.item}
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-center ${dividerMiddleShadow}`}>
                      <StatusCell status={row.status} />
                    </td>
                    <td
                      className={`min-h-[54px] py-3 px-3 align-middle text-left font-sans text-ink-muted text-[13px] leading-[1.6] [text-wrap:pretty] bg-cream ${isLast ? 'rounded-b-lg' : ''}`}
                      style={dividerEdgeStyle('last')}
                    >
                      {row.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: stacked cards — top row stays Priority · Status regardless
          of the desktop column order above. */}
      <div className="sm:hidden flex flex-col gap-3">
        {rows.map((row, i) => (
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
