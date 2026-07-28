import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import WorkImageClient from './WorkImageClient';
import { renderCaption } from './renderCaption';

interface WorkImageProps {
  src: string;
  caption?: string;
  alt?: string;
  placeholder?: boolean;
  wide?: boolean;
}

const breakoutClass =
  "w-[min(880px,calc(100vw-3rem))] mx-[calc((100%-min(880px,calc(100vw-3rem)))/2)]";

export default async function WorkImage({ src, caption, alt, placeholder = false, wide = false }: WorkImageProps) {
  if (placeholder) {
    return (
      <figure className={breakoutClass}>
        <div className="w-full h-[300px] md:h-[400px] bg-[rgba(28,27,23,0.05)] border border-line rounded-xl flex items-center justify-center">
          <span className="font-mono text-ink-muted text-[11px] tracking-[0.1em] uppercase">
            image to be uploaded
          </span>
        </div>
        {caption && (
          <figcaption className="font-sans text-ink-muted text-[14px] tracking-[0.01em] leading-[1.6] text-left mt-[var(--figure-gap-caption)] [text-wrap:pretty]">
            {renderCaption(caption)}
          </figcaption>
        )}
      </figure>
    );
  }

  const filePath = join(process.cwd(), 'public', src);
  const fileBuffer = readFileSync(filePath);
  const { width, height } = await sharp(fileBuffer).metadata();
  const isSvg = src.toLowerCase().endsWith('.svg');

  // Inlined (not <img src>) so it becomes part of the page DOM and can inherit
  // the site's self-hosted @font-face rules — an SVG loaded via <img> is a
  // separate document with no access to the host page's CSS at all, so any
  // font-family it declares (however it's spelled) falls back to whatever the
  // visitor's OS happens to have installed.
  const svgMarkup = isSvg ? fileBuffer.toString('utf-8') : undefined;

  return (
    <WorkImageClient
      src={src}
      caption={caption}
      alt={alt}
      width={width!}
      height={height!}
      wide={wide}
      isSvg={isSvg}
      svgMarkup={svgMarkup}
    />
  );
}
