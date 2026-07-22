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
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      priority
      sizes="(max-width: 767px) 100vw, min(1440px, 100vw)"
      className="case-hero"
    />
  );
}
