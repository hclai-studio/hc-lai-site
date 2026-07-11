'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { renderCaption, stripCaptionCode } from './renderCaption';

interface WorkImageClientProps {
  src: string;
  caption?: string;
  width: number;
  height: number;
}

export default function WorkImageClient({ src, caption, width, height }: WorkImageClientProps) {
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

  const breakoutClass =
    "w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]";

  const lightboxWidth = 1760;
  const lightboxHeight = Math.round((lightboxWidth * height) / width);

  return (
    <>
      <figure className={breakoutClass}>
        <Image
          src={src}
          alt={caption ? stripCaptionCode(caption) : ''}
          width={width}
          height={height}
          sizes="(max-width: 920px) 100vw, 880px"
          quality={80}
          onClick={() => setOpen(true)}
          className="w-full h-auto rounded-xl cursor-zoom-in transition-opacity duration-300 hover:opacity-90"
        />
        {caption && (
          <figcaption className="font-sans text-ink-muted text-[14px] tracking-[0.01em] leading-[1.6] text-left mt-[var(--figure-gap-caption)] [text-wrap:balance]">
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
          <Image
            src={src}
            alt={caption ? stripCaptionCode(caption) : ''}
            width={lightboxWidth}
            height={lightboxHeight}
            quality={85}
            className={`max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain cursor-default
              transition-all duration-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
