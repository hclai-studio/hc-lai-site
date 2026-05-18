import { notFound } from 'next/navigation';

type WorkModule = { default: React.ComponentType };

const works: Record<string, () => Promise<WorkModule>> = {
  nanobanana:    () => import('@/content/works/nanobanana.mdx'),
  'job-decision': () => import('@/content/works/job-decision.mdx'),
};

export function generateStaticParams() {
  return Object.keys(works).map((slug) => ({ slug }));
}

const moreWork = [
  { number: '01', titleEn: 'AI Workflow & Enablement Portfolio',              href: '/works/ai-workflow' },
  { number: '02', titleEn: 'Semi-agentic Architectural Image Iteration',      href: '/works/nanobanana' },
  { number: '03', titleEn: 'Semi-automated Job Decision Workflow',            href: '/works/job-decision' },
];

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const loader = works[params.slug];
  if (!loader) notFound();
  const { default: Content } = await loader();

  const otherWork = moreWork.filter((w) => !w.href.includes(params.slug));

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* ── Top nav ── */}
      <nav className="px-6 pt-9 md:px-12">
        <a
          href="/#work"
          className="font-mono text-ink-muted text-[11px] tracking-[0.08em] hover:text-ink transition-colors duration-300"
        >
          ← Back to work
        </a>
      </nav>

      {/* ── MDX content ── */}
      <article className="prose-works">
        <Content />
      </article>

      {/* ── More work ── */}
      <footer className="border-t border-line mx-6 md:mx-12 mt-[80px] pt-[60px] pb-[120px]">
        <p
          className="font-normal text-ink [font-size:clamp(28px,3vw,36px)] leading-[1.1] tracking-[-0.015em] mb-10"
          style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif", WebkitFontSmoothing: "auto" }}
        >
          More work →
        </p>
        <div className="flex flex-col gap-4">
          {otherWork.map((w) => (
            <a
              key={w.number}
              href={w.href}
              className="flex items-baseline gap-6 group hover:opacity-60 transition-opacity duration-300"
            >
              <span className="font-mono text-ink-muted text-[11px] tracking-[0.1em] shrink-0">{w.number}</span>
              <span
                className="font-normal text-ink text-[18px] leading-[1.2] tracking-[-0.01em]"
                style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif", WebkitFontSmoothing: "auto" }}
              >
                {w.titleEn}
              </span>
            </a>
          ))}
        </div>

        <div className="border-t border-line mt-[60px] pt-[48px] flex flex-col gap-2">
          <a
            href="mailto:hello@hclai.studio"
            className="font-sans text-ink text-[15px] hover:text-terracotta transition-colors duration-300"
          >
            hello@hclai.studio
          </a>
          <p className="font-mono text-ink-muted text-[10px] tracking-[0.12em]">HCL · 2026</p>
        </div>
      </footer>
    </div>
  );
}
