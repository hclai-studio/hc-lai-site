'use client';

import { useState, useEffect } from 'react';

interface WorkImageProps {
  src: string;
  caption?: string;
  placeholder?: boolean;
}

export default function WorkImage({ src, caption, placeholder = false }: WorkImageProps) {
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

  if (placeholder) {
    return (
      <figure className="my-10 max-w-[900px] mx-auto px-6 md:px-0">
        <div className="w-full h-[300px] md:h-[400px] bg-[rgba(28,27,23,0.05)] border border-line flex items-center justify-center">
          <span className="font-mono text-ink-muted text-[11px] tracking-[0.1em] uppercase">
            image to be uploaded
          </span>
        </div>
        {caption && (
          <figcaption className="font-mono text-ink-muted text-[11px] tracking-[0.08em] text-center mt-3">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <>
      <figure className="my-10 max-w-[900px] mx-auto px-6 md:px-0">
        <img
          src={src}
          alt={caption ?? ''}
          onClick={() => setOpen(true)}
          className="w-full cursor-zoom-in transition-opacity duration-300 hover:opacity-90"
        />
        {caption && (
          <figcaption className="font-mono text-ink-muted text-[11px] tracking-[0.08em] text-center mt-3">
            {caption}
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
          <img
            src={src}
            alt={caption ?? ''}
            className={`max-w-[95vw] max-h-[90vh] object-contain cursor-default
              transition-all duration-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
