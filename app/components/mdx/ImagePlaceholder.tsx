import { FIGURE_CAPTION_CLASS } from './FigureCaption';

interface ImagePlaceholderProps {
  caption?: string;
}

export default function ImagePlaceholder({ caption }: ImagePlaceholderProps) {
  return (
    <figure className="max-w-[900px] mx-auto px-6 md:px-0">
      <div className="w-full h-[300px] md:h-[400px] bg-[rgba(28,27,23,0.05)] border border-line flex items-center justify-center">
        <span className="font-mono text-ink-muted text-[11px] tracking-[0.1em] uppercase">
          image to be uploaded
        </span>
      </div>
      {caption && (
        <figcaption className={FIGURE_CAPTION_CLASS}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
