import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import Image from 'next/image';

interface HeroProps {
  src: string;
  alt: string;
}

export default async function Hero({ src, alt }: HeroProps) {
  const filePath = join(process.cwd(), 'public', src);
  const { width, height } = await sharp(readFileSync(filePath)).metadata();

  return (
    <>
      {/* Zero-height marker owning the named view-timeline .case-hero
          consumes below — see globals.css for why this can't just live on
          the image itself. */}
      <div className="case-hero-track" aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        width={width!}
        height={height!}
        priority
        sizes="(max-width: 767px) 100vw, min(1440px, 100vw)"
        className="case-hero"
      />
      {/* Sets --hero-start-scale = (column width) / (full-bleed target width).
          Resize-only — never runs on scroll, the animation itself is 100% CSS. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            function setHeroScale(){
              var start = Math.min(880, window.innerWidth - 48);
              var target = Math.min(1440, window.innerWidth);
              document.documentElement.style.setProperty('--hero-start-scale', String(start / target));
            }
            setHeroScale();
            if (!window.__heroScaleResizeBound) {
              window.__heroScaleResizeBound = true;
              window.addEventListener('resize', setHeroScale);
            }
          })();`,
        }}
      />
    </>
  );
}
