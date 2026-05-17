interface WorkImageProps {
  src: string;
  caption?: string;
  placeholder?: boolean;
}

export default function WorkImage({ src, caption, placeholder = true }: WorkImageProps) {
  return (
    <figure className="my-10 max-w-[900px] mx-auto px-6 md:px-0">
      {placeholder ? (
        <div className="w-full h-[300px] md:h-[400px] bg-[rgba(28,27,23,0.05)] border border-line flex items-center justify-center">
          <span className="font-mono text-ink-muted text-[11px] tracking-[0.1em] uppercase">
            image to be uploaded
          </span>
        </div>
      ) : (
        <img src={src} alt={caption ?? ''} className="w-full" />
      )}
      {caption && (
        <figcaption className="font-mono text-ink-muted text-[11px] tracking-[0.08em] text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
