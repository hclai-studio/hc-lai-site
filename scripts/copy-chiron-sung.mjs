import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src  = resolve(root, 'node_modules/chiron-sung-hk-webfont/woff2/vf/t0');
const dest = resolve(root, 'public/fonts/chiron-sung-hk/t0');

if (!existsSync(src)) {
  console.error('chiron-sung-hk-webfont not found — run npm install first');
  process.exit(1);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log('Chiron Sung HK t0 → public/fonts/chiron-sung-hk/t0/ (109 slices, VF weight 200-900)');
