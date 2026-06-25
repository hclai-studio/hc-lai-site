interface JudgmentCardProps {
  title: string;
  verdict: "high" | "partial";
  coreReason: string;
  pros: string[];
  consNote?: string;
  cons: string[];
  reference: string;
}

export default function JudgmentCard({
  title,
  verdict,
  coreReason,
  pros,
  consNote,
  cons,
  reference,
}: JudgmentCardProps) {
  const isHigh = verdict === "high";

  return (
    <div className="my-2 max-w-[720px] mx-auto px-6 md:px-0">
      <div className="border border-line px-6 py-6 md:px-8 md:py-7">
        {/* Case label */}
        <p className="font-mono text-ink-muted text-[10px] tracking-[0.12em] uppercase mb-4">
          {title}
        </p>

        {/* Verdict badge */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className="inline-block w-[5px] h-[5px] rounded-full shrink-0"
            style={{ backgroundColor: isHigh ? "#3d7a52" : "var(--terracotta)" }}
          />
          <span className="font-sans font-medium text-ink text-[13px] tracking-[0.02em]">
            {isHigh ? "✅ 高度接近" : "⚠️ 部分接近"}
          </span>
        </div>

        {/* Core reason */}
        <div className="mb-5 border-t border-line pt-5">
          <p className="font-mono text-ink-muted text-[10px] tracking-[0.1em] uppercase mb-2">核心原因</p>
          <p className="font-serif-cn text-ink text-[15px] leading-[1.85]">{coreReason}</p>
        </div>

        {/* Pros */}
        <div className="mb-5 border-t border-line pt-5">
          <p className="font-mono text-ink-muted text-[10px] tracking-[0.1em] uppercase mb-3">符合点</p>
          <ol className="flex flex-col gap-2">
            {pros.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-ink-muted text-[15px] shrink-0 leading-[1.85] min-w-[18px]">
                  {i + 1}.
                </span>
                <span className="font-serif-cn text-ink text-[15px] leading-[1.85]">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Cons */}
        <div className="mb-5 border-t border-line pt-5">
          <p className="font-mono text-ink-muted text-[10px] tracking-[0.1em] uppercase mb-3">
            跑偏点 / 可优化点
          </p>
          {consNote && (
            <p className="font-serif-cn text-ink-muted text-[14px] leading-[1.7] mb-2">{consNote}</p>
          )}
          <ol className="flex flex-col gap-2">
            {cons.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-ink-muted text-[15px] shrink-0 leading-[1.85] min-w-[18px]">
                  {i + 1}.
                </span>
                <span className="font-serif-cn text-ink text-[15px] leading-[1.85]">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Reference */}
        <div className="border-t border-line pt-4">
          <p className="font-mono text-ink-muted text-[10px] tracking-[0.1em] uppercase mb-1">可参考方向</p>
          <p className="font-mono text-ink-muted text-[11px] leading-[1.7]">{reference}</p>
        </div>
      </div>
    </div>
  );
}
