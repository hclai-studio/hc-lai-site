import FigureCaption from './FigureCaption';

// massing-facade-rebuild §03 "它怎么工作": the skill's stages, what each one
// does, and the gate it has to pass. Every cell is the repo README's own table
// (README.md for Chinese, README.en.md for English), word for word.
// Who does what, in the site's diagram colours (spec §1.5; the same split as
// mechanism-ai-workflow.svg, where the schema step is cream and the human
// review is the terracotta node):
//   · cream column = what the agent carries out itself (every stage's work)
//   · outlined gate = a gate where the designer is asked or confirms
//   · plain gate = a check the agent runs on its own (stages 0 and 4)
//   · terracotta gate = stage 4.5, the one emphasis (spec §1.2): both cases in
//     the repo went back and forth at that gate (see the caption)
// Alignment follows the site's other tables (DecisionTable, TaskTable,
// Checklist): every header centred, short columns (number, stage name)
// centred, long text left-aligned. The table's left edge is the title's.
// md+: four columns, one header each. Phones: the number keeps its own column
// and stage / work / gate stack beside it, the gate labelled since the
// headers are gone.

type Gate = 'agent' | 'human' | 'focus';

const STAGES: { no: string; cn: string; en: string; whatCn: string; whatEn: string; gateCn?: string; gateEn?: string; gate?: Gate }[] = [
  { no: '0', cn: '检查输入', en: 'Check inputs', whatCn: '清点文件，开始运行记录', whatEn: 'Inventory the files, start the run record', gateCn: '缺底模或效果图就停', gateEn: 'Stop if the massing or the rendering is missing', gate: 'agent' },
  { no: '1', cn: '锁定底模', en: 'Lock the massing', whatCn: '读出单位、层数、标高、立面朝向，生成几何事实卡', whatEn: 'Read units, floors, levels and facade orientation; write a geometry fact sheet', gateCn: '和 SU 截图对不上就问', gateEn: 'Ask if anything disagrees with the SketchUp screenshot', gate: 'human' },
  { no: '2', cn: '出图（可选）', en: 'Render (optional)', whatCn: '用内置提示词模板出效果图', whatEn: 'Generate the rendering with the built-in prompt template', gateCn: '设计者确认这就是方向', gateEn: 'Designer confirms this is the direction', gate: 'human' },
  { no: '3', cn: '比例关卡', en: 'Scale check', whatCn: '判定立面类型（不规则 / 母题重复），核对比例', whatEn: 'Classify the facade (irregular / repeating motif) and check proportions', gateCn: '设计者确认类型和推定', gateEn: 'Designer confirms the type and the inferences', gate: 'human' },
  { no: '4', cn: '判读', en: 'Read', whatCn: '逐单元或按母题记录，可见、推定、修正分开标注', whatEn: 'Record unit by unit, or by motif; tag what is visible, inferred or corrected', gateCn: '每个单元都有据可查', gateEn: 'Every unit traceable to a record', gate: 'agent' },
  { no: '4.5', cn: '样件', en: 'Samples', whatCn: '先建一小片，和效果图并排对照', whatEn: 'Build a small piece first, side by side with the rendering', gateCn: '设计者逐项确认后才铺满', gateEn: 'Designer confirms item by item before the full build', gate: 'focus' },
  { no: '5', cn: '建模', en: 'Build', whatCn: '在体块副本上建立面，原始网格不动；铺满前先列出所有收头', whatEn: 'Model the facade on a copy of the massing, original meshes untouched; list every edge condition before filling the facade' },
  { no: '6', cn: '检查与核验', en: 'Check & verify', whatCn: '固定视角出检查图，另出一张和效果图同视角的对照渲染；核验体块没被改动', whatEn: "Fixed-angle check views, plus one render matched to the rendering's view; verify the massing is unchanged", gateCn: '核验通过，设计者看过', gateEn: 'Verification passes and the designer has reviewed', gate: 'human' },
  { no: '7', cn: '交付归档', en: 'Deliver & archive', whatCn: '交付模型、记录和核验报告，只复制归档', whatEn: 'Hand over the model, records and verification report; archive by copying only' },
];

const CAPTION =
  '米色一列是 agent 自己执行的部分，带框的是要问设计者、由设计者确认的关卡。橘色标出的是 4.5 样件：两个案例都在这一步反复过——公寓的样件经过两次几何反馈才通过，塔楼的样件改了四轮。 / The cream column is what the agent carries out on its own; outlined gates are where the designer is asked or confirms. Stage 4.5 is marked in terracotta: both cases went back and forth here — the apartment samples passed after two rounds of geometry feedback, and the tower samples went through four rounds.';

// Static literals so Tailwind's scanner sees every class (spec pitfall #13).
const COLS_MD = 'md:grid-cols-[64px_128px_minmax(0,1fr)_minmax(0,0.85fr)]';
// Phones: the row carries the divider. md+: each cell carries its own, so the
// line can switch to the cream-ground colour inside the cream column (§1.6).
const ROW = `grid grid-cols-[36px_minmax(0,1fr)] gap-x-2 py-3 border-t border-[#E8E8E8] md:py-0 md:gap-x-0 md:border-t-0 ${COLS_MD}`;
const CELL_MD = 'md:px-3 md:pt-4 md:pb-4 md:border-t md:border-[#E8E8E8]';
const NUM = `row-span-3 text-center font-mono text-[12px] leading-[1.5] text-ink-muted md:row-span-1 ${CELL_MD}`;
const NAME = `md:text-center ${CELL_MD}`;
// The work cell: a cream block on phones, the cream column on md+.
const WHAT = 'mt-2 rounded-[8px] bg-cream px-2.5 py-1.5 md:mt-0 md:rounded-none md:px-3 md:pt-4 md:pb-4 md:border-t md:border-[#DDDAD4]';
// The gate cell's own padding plus the chip's (10 + 6px) puts its first line
// level with the 16px of the other cells.
const GATE = 'mt-2 md:mt-0 md:px-3 md:pt-2.5 md:pb-2.5 md:border-t md:border-[#E8E8E8]';
// Borders are inset shadows so a chip's border never moves its text.
const CHIP: Record<Gate, string> = {
  agent: 'block py-1.5 md:px-2.5',
  human: 'block rounded-[8px] px-2.5 py-1.5 shadow-[inset_0_0_0_1px_rgba(28,27,23,0.25)]',
  focus: 'block rounded-[8px] px-2.5 py-1.5 bg-terracotta/10 shadow-[inset_0_0_0_1.5px_#B85C38]',
};
const CN = 'block font-sans-cn text-[12px] leading-[1.5] text-ink';
const EN = 'block font-sans text-[12px] leading-[1.5] text-ink-muted';
// Narrow side padding (as in TaskTable's headers) so "编号 No." stays on one
// line in the 64px number column.
const HEAD = 'px-1 py-2.5 text-center font-sans text-[12px] leading-[1.5] text-ink-muted whitespace-nowrap';

export default function StageGates() {
  return (
    <figure className="w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]">
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <span className="block font-sans-cn text-[16px] leading-[1.3] text-ink">阶段与关卡：关键决定停下来问设计者</span>
        <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-ink-muted">Stages and gates: key decisions go back to the designer</span>

        <div aria-hidden="true" className={`hidden md:grid mt-3 ${COLS_MD}`}>
          <span className={HEAD}>编号 No.</span>
          <span className={HEAD}>阶段 Stage</span>
          <span className={`${HEAD} bg-cream rounded-t-[10px]`}>做什么 What happens</span>
          <span className={HEAD}>关卡 Gate</span>
        </div>

        <div role="list" className="mt-3 md:mt-0">
          {STAGES.map((s, i) => {
            const last = i === STAGES.length - 1;
            const focus = s.gate === 'focus';
            return (
              <div role="listitem" key={s.no} className={ROW}>
                <span className={NUM}>{s.no}</span>
                <span className={`block ${NAME}`}>
                  <span className={CN}>{s.cn}</span>
                  <span className={EN}>{s.en}</span>
                </span>
                <span className={`block ${WHAT}${last ? ' md:rounded-b-[10px]' : ''}`}>
                  <span className={CN}>{s.whatCn}</span>
                  <span className={EN}>{s.whatEn}</span>
                </span>
                {s.gate ? (
                  <span className={`block ${GATE}`}>
                    <span className={CHIP[s.gate]}>
                      <span className={focus ? 'block font-sans-cn text-[12px] leading-[1.5] font-bold text-terracotta' : CN}>
                        <span className={`md:hidden ${focus ? '' : 'text-ink-muted'}`}>关卡 · </span>
                        {s.gateCn}
                      </span>
                      <span className={focus ? 'block font-sans text-[12px] leading-[1.5] text-terracotta/85' : EN}>
                        <span className="md:hidden">Gate · </span>
                        {s.gateEn}
                      </span>
                    </span>
                  </span>
                ) : (
                  <span className={`hidden md:block ${GATE}`}>
                    <span className="block px-2.5 py-1.5 font-sans text-[12px] leading-[1.5] text-ink-muted">—</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <FigureCaption caption={CAPTION} />
    </figure>
  );
}
