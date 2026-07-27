'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { renderCaption, stripCaptionCode } from './renderCaption';

interface WorkImageClientProps {
  src: string;
  caption?: string;
  alt?: string;
  width: number;
  height: number;
  wide?: boolean;
  isSvg?: boolean;
}

export default function WorkImageClient({
  src,
  caption,
  alt,
  width,
  height,
  wide = false,
  isSvg = false,
}: WorkImageClientProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setVisible(true));
    } else {
      document.body.style.overflow = '';
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open]);

  function close() {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  }

  const narrowBreakoutClass =
    "w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]";
  // Wide tier keeps the same 24px-per-side cream margin as the narrow tier
  // down to the point --figure-width-wide itself becomes the constraint, but
  // switches to a tighter 16px-per-side margin below 768px — at that width
  // node labels are already below the readable floor regardless of margin,
  // so the extra 16px per side is better spent on the diagram than on cream.
  const wideBreakoutClass =
    "w-[min(var(--figure-width-wide),calc(100vw-3rem))] mx-[calc((100%-min(var(--figure-width-wide),calc(100vw-3rem)))/2)] [@media(max-width:767px)]:w-[calc(100vw-2rem)] [@media(max-width:767px)]:mx-[calc((100%-(100vw-2rem))/2)]";
  const breakoutClass = wide ? wideBreakoutClass : narrowBreakoutClass;

  const resolvedAlt = alt ?? (caption ? stripCaptionCode(caption) : '');

  const lightboxWidth = 1760;
  const lightboxHeight = Math.round((lightboxWidth * height) / width);

  return (
    <>
      <figure className={breakoutClass}>
        {isSvg ? (
          <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- vector source: next/image's optimizer refuses SVGs without dangerouslyAllowSVG, and scaling loss doesn't apply here. */}
            <img
              src={src}
              alt={resolvedAlt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              onClick={() => setOpen(true)}
              className="block w-full h-auto cursor-zoom-in transition-opacity duration-300 hover:opacity-90"
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={resolvedAlt}
            width={width}
            height={height}
            sizes="(max-width: 920px) 100vw, 880px"
            quality={80}
            onClick={() => setOpen(true)}
            className="w-full h-auto rounded-xl cursor-zoom-in transition-opacity duration-300 hover:opacity-90"
          />
        )}
        {caption && (
          <figcaption className="font-sans text-ink-muted text-[14px] tracking-[0.01em] leading-[1.6] text-left mt-[var(--figure-gap-caption)] [text-wrap:pretty]">
            {renderCaption(caption)}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out
            bg-black/85 backdrop-blur-sm transition-opacity duration-200
            ${visible ? 'opacity-100' : 'opacity-0'}`}
          onClick={close}
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none transition-colors duration-150 select-none"
            onClick={close}
          >
            ×
          </button>
          {isSvg ? (
            // eslint-disable-next-line @next/next/no-img-element -- same vector-source reasoning as the inline figure above; also lets this reuse the one source file at full quality at any zoom.
            <img
              src={src}
              alt={resolvedAlt}
              className={`max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain cursor-default
                transition-all duration-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Image
              src={src}
              alt={resolvedAlt}
              width={lightboxWidth}
              height={lightboxHeight}
              quality={85}
              className={`max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain cursor-default
                transition-all duration-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
