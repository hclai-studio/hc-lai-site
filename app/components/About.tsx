export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 grid grid-cols-1 items-start border-t border-line gap-10 px-6 pt-[80px] pb-[100px] md:grid-cols-[1fr_1.1fr] md:gap-[80px] md:px-12 md:pt-[140px] md:pb-[160px]"
    >
      {/* ── Left: label + heading ─────────────────────────────────── */}
      <div>
        <p className="font-mono uppercase text-ink-muted text-[10px] tracking-[0.18em] mb-7">
          001 — About
        </p>
        <h2
          className="font-serif font-normal text-ink leading-[0.98] tracking-[-0.025em] [font-size:clamp(44px,5.6vw,84px)]"
        >
          Trained in{" "}
          <em className="font-serif italic text-ink-muted">architecture</em>.
          <br />
          Curious about{" "}
          <em className="font-serif italic text-ink-muted">everything else</em>.
        </h2>
      </div>

      {/* ── Right: body text ─────────────────────────────────────── */}
      <div className="about-body font-serif-cn font-normal text-[17px] leading-[1.75] tracking-[0.02em] text-ink max-w-[480px]">
        <p>
          <span className="font-serif italic text-ink-muted text-[19px]">— </span>
          我是赖兴菁（<span className="font-serif not-italic">H.C. Lai</span>）。
        </p>
        <p>
          关注空间、系统与人的关系。
        </p>
        <p>
          在寻找更自然的人机协作方式。
        </p>
      </div>
    </section>
  );
}
