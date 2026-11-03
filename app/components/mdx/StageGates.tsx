import FigureCaption from './FigureCaption';

// massing-facade-rebuild §03 "它怎么工作": the skill's stages, what each one
// does, and the gate it has to pass. Every cell is the repo README's own table
// (README.md for Chinese, README.en.md for English), word for word.
// House style follows ProblemSources / FailureRules: white card, a 16 / 400
// title with a 12 muted subtitle, 12px items, #E8E8E8 dividers, one
// terracotta emphasis. The emphasis is stage 4.5: both cases in the repo went
// back and forth at that gate (see the caption), so it is the row to read.
// md+: a four-column table (number · stage · what · gate). Phones: the number
// keeps its own column and the other three stack beside it, with the gate
// labelled since the column headers are gone.

const STAGES = [
  { no: '0', cn: '检查输入', en: 'Check inputs', whatCn: '清点文件，开始运行记录', whatEn: 'Inventory the files, start the run record', gateCn: '缺底模或效果图就停', gateEn: 'Stop if the massing or the rendering is missing' },
  { no: '1', cn: '锁定底模', en: 'Lock the massing', whatCn: '读出单位、层数、标高、立面朝向，生成几何事实卡', whatEn: 'Read units, floors, levels and facade orientation; write a geometry fact sheet', gateCn: '和 SU 截图对不上就问', gateEn: 'Ask if anything disagrees with the SketchUp screenshot' },
  { no: '2', cn: '出图（可选）', en: 'Render (optional)', whatCn: '用内置提示词模板出效果图', whatEn: 'Generate the rendering with the built-in prompt template', gateCn: '设计者确认这就是方向', gateEn: 'Designer confirms this is the direction' },
  { no: '3', cn: '比例关卡', en: 'Scale check', whatCn: '判定立面类型（不规则 / 母题重复），核对比例', whatEn: 'Classify the facade (irregular / repeating motif) and check proportions', gateCn: '设计者确认类型和推定', gateEn: 'Designer confirms the type and the inferences' },
  { no: '4', cn: '判读', en: 'Read', whatCn: '逐单元或按母题记录，可见、推定、修正分开标注', whatEn: 'Record unit by unit, or by motif; tag what is visible, inferred or corrected', gateCn: '每个单元都有据可查', gateEn: 'Every unit traceable to a record' },
  { no: '4.5', cn: '样件', en: 'Samples', whatCn: '先建一小片，和效果图并排对照', whatEn: 'Build a small piece first, side by side with the rendering', gateCn: '设计者逐项确认后才铺满', gateEn: 'Designer confirms item by item before the full build', focus: true },
  { no: '5', cn: '建模', en: 'Build', whatCn: '在体块副本上建立面，原始网格不动；铺满前先列出所有收头', whatEn: 'Model the facade on a copy of the massing, original meshes untouched; list every edge condition before filling the facade' },
  { no: '6', cn: '检查与核验', en: 'Check & verify', whatCn: '固定视角出检查图，另出一张和效果图同视角的对照渲染；核验体块没被改动', whatEn: "Fixed-angle check views, plus one render matched to the rendering's view; verify the massing is unchanged", gateCn: '核验通过，设计者看过', gateEn: 'Verification passes and the designer has reviewed' },
  { no: '7', cn: '交付归档', en: 'Deliver & archive', whatCn: '交付模型、记录和核验报告，只复制归档', whatEn: 'Hand over the model, records and verification report; archive by copying only' },
];

const CAPTION =
  '高亮的是 4.5 样件：先建一小片，和效果图并排对照，设计者逐项确认后才铺满。两个案例都在这一步反复过——公寓的样件经过两次几何反馈才通过，塔楼的样件改了四轮。 / Stage 4.5 is highlighted: build a small piece first, compare it side by side with the rendering, and fill the facade only after the designer confirms it item by item. Both cases went back and forth here — the apartment samples passed after two rounds of geometry feedback, and the tower samples went through four rounds.';

// Static literals so Tailwind's scanner sees every class (spec pitfall #13).
// Phones: number column + one stacked column. md+: four columns.
const COLS =
  'grid-cols-[36px_minmax(0,1fr)] gap-x-2 md:grid-cols-[40px_128px_minmax(0,1fr)_minmax(0,0.8fr)] md:gap-x-4 px-3';
// The highlight is drawn with an inset shadow rather than a border so the
// focus row's text stays on the same columns as every other row.
const FOCUS_ROW = 'rounded-[10px] bg-terracotta/10 shadow-[inset_0_0_0_1.5px_#B85C38]';
const DIVIDER = 'border-t border-[#E8E8E8]';
const CN = 'block font-sans-cn text-[12px] leading-[1.5] text-ink';
const EN = 'block font-sans text-[12px] leading-[1.5] text-ink-muted';
const HEAD = 'font-sans text-[12px] leading-[1.5] text-ink-muted';

export default function StageGates() {
  return (
    <figure className="w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]">
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <span className="block font-sans-cn text-[16px] leading-[1.3] text-ink">阶段与关卡：关键决定停下来问设计者</span>
        <span className="block mt-1 font-sans text-[12px] leading-[1.5] text-ink-muted">Stages and gates: key decisions go back to the designer</span>

        <div aria-hidden="true" className={`hidden md:grid mt-3 pb-2 ${COLS}`}>
          <span className={`${HEAD} col-span-2`}>阶段 Stage</span>
          <span className={HEAD}>做什么 What happens</span>
          <span className={HEAD}>关卡 Gate</span>
        </div>

        <div role="list" className={`mt-3 md:mt-0 ${DIVIDER}`}>
          {STAGES.map((s, i) => {
            const prevFocus = i > 0 && STAGES[i - 1].focus;
            const divider = i > 0 && !s.focus && !prevFocus ? DIVIDER : '';
            return (
              <div role="listitem" key={s.no} className={`grid py-2.5 ${COLS} ${s.focus ? FOCUS_ROW : divider}`}>
                <span
                  className={`row-span-3 md:row-span-1 font-mono text-[12px] leading-[1.5] ${s.focus ? 'text-terracotta' : 'text-ink-muted'}`}
                >
                  {s.no}
                </span>
                <span className="block">
                  <span className={s.focus ? 'block font-sans-cn text-[12px] leading-[1.5] font-bold text-terracotta' : CN}>{s.cn}</span>
                  <span className={EN}>{s.en}</span>
                </span>
                <span className="block mt-1.5 md:mt-0">
                  <span className={CN}>{s.whatCn}</span>
                  <span className={EN}>{s.whatEn}</span>
                </span>
                {s.gateCn ? (
                  <span className="block mt-1.5 md:mt-0">
                    <span className={CN}>
                      <span className="md:hidden text-ink-muted">关卡 · </span>
                      {s.gateCn}
                    </span>
                    <span className={EN}>
                      <span className="md:hidden">Gate · </span>
                      {s.gateEn}
                    </span>
                  </span>
                ) : (
                  <span className="hidden md:block font-sans text-[12px] leading-[1.5] text-ink-muted">—</span>
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
