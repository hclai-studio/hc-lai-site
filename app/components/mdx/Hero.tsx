import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import HeroClient from './HeroClient';

interface HeroProps {
  src: string;
  alt: string;
}

export default async function Hero({ src, alt }: HeroProps) {
  const filePath = join(process.cwd(), 'public', src);
  const { width, height } = await sharp(readFileSync(filePath)).metadata();

  return <HeroClient src={src} alt={alt} width={width!} height={height!} />;
}
