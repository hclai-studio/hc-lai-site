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

      {/* ── Right: body text (placeholder) ───────────────────────── */}
      <div className="about-body font-sans font-normal text-base leading-[1.65] text-ink max-w-[480px]">
        <p>
          <em>— placeholder.</em>{" "}
          这里以后放你的自我介绍。三五句话，第一句是钩子，后面铺一两件让人想认识你的事。不写履历，写气质。
        </p>
        <p>
          底下会接：精选作品（Notion 嵌入 / 自己排版都行）、思考随笔（可选）、和联系方式。
        </p>
        <p>
          整页节奏会是：宣言 → 自我 → 作品 → 触达。每一段之间都是一次呼吸。
        </p>
      </div>
    </section>
  );
}
