import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface TaskRow {
  priority: string;
  task: string;
  owner: string;
  due: string;
  sourceQuote: string;
}

const MONTH: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

// CSV stores "DD-Mon-YY" (e.g. "08-Mar-26"); DecisionTable-style display is MM-DD.
function formatDue(due: string): string {
  const m = due.match(/^(\d{2})-([A-Za-z]{3})-\d{2}$/);
  if (!m) return due || '—';
  const [, day, mon] = m;
  return `${MONTH[mon] ?? mon}-${day}`;
}

function loadRows(project: string): TaskRow[] {
  const filePath = join(process.cwd(), 'design-refs', 'ai-workflow-tasks.csv');
  const text = readFileSync(filePath, 'utf-8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const lines = text.trim().split('\n');
  const header = lines[0].split(',');
  const col = (name: string) => header.indexOf(name);
  const pI = col('Priority'), tI = col('Task'), oI = col('Owner'), dI = col('Due'), pjI = col('Project'), sqI = col('Source Quote');

  return lines
    .slice(1)
    .map((line) => line.split(','))
    .filter((cols) => cols[pjI] === project)
    .map((cols) => ({
      priority: cols[pI],
      task: cols[tI],
      owner: cols[oI],
      due: cols[dI],
      sourceQuote: cols[sqI],
    }));
}

const dividerMiddleShadow = 'shadow-[inset_0_1px_0_0_rgba(28,27,23,0.1)]';

function dividerEdgeStyle(edge: 'first' | 'last') {
  const color = 'rgba(28,27,23,0.1)';
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

function PriorityCell({ priority }: { priority: string }) {
  const isP0 = priority === 'P0';
  return (
    <span className={`font-mono text-[13px] ${isP0 ? 'text-ink font-bold' : 'text-ink-muted font-normal'}`}>
      {priority}
    </span>
  );
}

function OwnerCell({ owner }: { owner: string }) {
  return (
    <span className={`font-mono text-[13px] ${owner === 'Me' ? 'text-ink' : 'text-ink-muted'}`}>
      {owner}
    </span>
  );
}

export default function TaskTable({
  project = 'Ex01_ClientChange',
  label = 'CASE 01 · 甲方变更 → TASK TABLE',
}: {
  project?: string;
  label?: string;
}) {
  const rows = loadRows(project);

  return (
    <div>
      <div className="font-mono text-[12px] tracking-[0.1em] text-ink-muted mb-2">{label}</div>

      {/* Desktop / tablet: real table */}
      <div className="hidden sm:block rounded-xl border border-ink/10 bg-white overflow-hidden">
        <div className="p-5">
          <table className="task-table w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[60px]" />
              <col className="w-[280px]" />
              <col className="w-[60px]" />
              <col className="w-[90px]" />
              <col className="w-[350px]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Priority</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Task</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Owner</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em]">Due</th>
                <th scope="col" className="min-h-[54px] py-3 px-1 align-middle text-center font-sans font-normal text-ink-muted text-[11px] tracking-[0.02em] bg-cream">Source Quote</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const showDivider = true;
                return (
                  <tr key={i}>
                    <td
                      className={`min-h-[54px] py-3 px-3 align-middle text-center ${showDivider ? dividerMiddleShadow : ''}`}
                      style={showDivider ? dividerEdgeStyle('first') : undefined}
                    >
                      <PriorityCell priority={row.priority} />
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-left font-sans text-ink text-[13px] leading-[1.6] [text-wrap:pretty] ${showDivider ? dividerMiddleShadow : ''}`}>
                      {row.task}
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-center ${showDivider ? dividerMiddleShadow : ''}`}>
                      <OwnerCell owner={row.owner} />
                    </td>
                    <td className={`min-h-[54px] py-3 px-3 align-middle text-center font-mono text-[13px] text-ink-muted ${showDivider ? dividerMiddleShadow : ''}`}>
                      {formatDue(row.due)}
                    </td>
                    <td
                      className={`min-h-[54px] py-3 px-3 align-middle text-left font-sans text-ink-muted text-[13px] leading-[1.6] [text-wrap:pretty] bg-cream ${showDivider ? dividerMiddleShadow : ''}`}
                      style={showDivider ? dividerEdgeStyle('last') : undefined}
                    >
                      {row.sourceQuote}
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
        {rows.map((row, i) => (
          <div key={i} className="rounded-xl border border-ink/10 bg-white p-3">
            <div className="flex items-center gap-2">
              <PriorityCell priority={row.priority} />
              <span className="text-ink-muted text-[13px]">·</span>
              <OwnerCell owner={row.owner} />
              <span className="text-ink-muted text-[13px]">·</span>
              <span className="font-mono text-[13px] text-ink-muted">{formatDue(row.due)}</span>
            </div>
            <p className="font-sans text-ink text-[13px] leading-[1.6] mt-2 [text-wrap:pretty]">{row.task}</p>
            <p className="font-sans text-ink-muted text-[13px] leading-[1.6] mt-3 bg-cream rounded-lg p-3 [text-wrap:pretty]">
              {row.sourceQuote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { loadRows as loadTaskRows };
