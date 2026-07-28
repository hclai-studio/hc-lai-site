import { renderCaption } from './renderCaption';

interface FigureCaptionProps {
  caption: string;
}

// The shared figure-caption look (WorkImage, DecisionTable) has always lived
// as a literal Tailwind class string duplicated inline in each of those
// components — there's no global selector to hit. Pulled out here so a new
// figure can reuse it via a real component instead of copy-pasting the
// string a fourth time.
//
// Taking `caption` as a string prop (not JSX children) is deliberate, not
// just a style choice: when caption text is written directly as MDX content
// between JSX tags, remark's markdown pass wraps it in its own <p>, and
// `.prose-works p`'s serif/17px body-text rule then wins over this
// component's classes for the actual text node. A string prop never enters
// that markdown pipeline, which is exactly why WorkImage/DecisionTable's
// captions never had this problem.
export default function FigureCaption({ caption }: FigureCaptionProps) {
  return (
    <figcaption className="font-sans text-ink-muted text-[14px] tracking-[0.01em] leading-[1.6] text-left mt-[var(--figure-gap-caption)] [text-wrap:pretty]">
      {renderCaption(caption)}
    </figcaption>
  );
}
