// Scans site content/components for every character actually in use, then subsets Chiron
// Sung HK (400) + Noto Sans SC (400, 700) + Noto Serif SC (700) down to just those
// characters. Replaces per-family unicode-range slice loading with one small woff2 per
// family/weight. Re-run after adding or editing any Chinese copy.
//
// Noto Serif SC 400 is deliberately NOT subsetted here — its self-hosted slices
// (app/fonts/google-fonts-local.css) stay as the on-demand fallback for any character
// outside these subsets, so an unrun script never produces missing glyphs, just a
// mixed-font render for the new character until the next subset run.
//
// Sources (all gitignored under fonts-src/, regenerate if missing):
//
//   fonts-src/chiron-sung-hk-static400.ttf
//     Not the raw variable font — harfbuzzjs's wasm heap can't load the ~82MB full VF
//     (hb_subset_input creation overflows its buffer). To regenerate:
//       1. npm pack @fontpkg/chiron-sung-hk-vf && tar -xzf fontpkg-chiron-sung-hk-vf-*.tgz
//       2. Pin the wght axis to 400 with fontTools (this is the only weight this site
//          uses; Chinese bold text renders via Noto Serif SC 700 instead):
//            python3 -c "
//            from fontTools.ttLib import TTFont
//            from fontTools.varLib.instancer import instantiateVariableFont
//            f = TTFont('package/ChironSungHKVF.ttf')
//            instantiateVariableFont(f, {'wght': 400}, inplace=True)
//            f.save('fonts-src/chiron-sung-hk-static400.ttf')
//            "
//
//   fonts-src/NotoSansSC-Regular.otf, NotoSansSC-Bold.otf, NotoSerifSC-Bold.otf
//     Official per-weight static builds (not variable, no pre-instancing needed) from
//     Google's notofonts/noto-cjk releases — small enough for harfbuzzjs directly:
//       https://github.com/notofonts/noto-cjk/releases (Sans2.004 -> 18_NotoSansSC.zip,
//       Serif2.003 -> 14_NotoSerifSC.zip), then take *-Regular.otf / *-Bold.otf.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import subsetFont from 'subset-font';

const ROOT = process.cwd();
const SCAN_DIRS = ['content', 'app'];
const SCAN_EXTENSIONS = new Set(['.mdx', '.tsx', '.ts']);

const SAFETY_BASELINE =
  // Printable ASCII
  Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)).join('') +
  // Common CJK punctuation/symbols (halfwidth + fullwidth variants)
  '，。、：；？！「」『』（）《》〈〉·—…～％' +
  '↓▸▾→✅⚠️';

function walk(dir, files) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
      files.push(full);
    }
  }
}

const files = [];
for (const dir of SCAN_DIRS) {
  walk(join(ROOT, dir), files);
}

const chars = new Set(SAFETY_BASELINE);
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const ch of text) chars.add(ch);
}

const charString = Array.from(chars).join('');
console.log(`[subset-fonts] scanned ${files.length} files, ${chars.size} unique characters`);

const TARGETS = [
  {
    src: 'fonts-src/chiron-sung-hk-static400.ttf',
    out: 'public/fonts/chiron-sung-subset/chiron-sung-hk-subset.woff2',
  },
  {
    src: 'fonts-src/NotoSansSC-Regular.otf',
    out: 'public/fonts/noto-sans-sc-subset/noto-sans-sc-400-subset.woff2',
  },
  {
    src: 'fonts-src/NotoSansSC-Bold.otf',
    out: 'public/fonts/noto-sans-sc-subset/noto-sans-sc-700-subset.woff2',
  },
  {
    src: 'fonts-src/NotoSerifSC-Bold.otf',
    out: 'public/fonts/noto-serif-sc-subset/noto-serif-sc-700-subset.woff2',
  },
];

let totalBytes = 0;
for (const { src, out } of TARGETS) {
  const fontBuffer = readFileSync(join(ROOT, src));
  const subsetBuffer = await subsetFont(fontBuffer, charString, { targetFormat: 'woff2' });

  const outPath = join(ROOT, out);
  mkdirSync(join(outPath, '..'), { recursive: true });
  writeFileSync(outPath, subsetBuffer);

  const sizeKB = (subsetBuffer.length / 1024).toFixed(1);
  totalBytes += subsetBuffer.length;
  console.log(`[subset-fonts] wrote ${out} (${sizeKB} KB)`);
  if (subsetBuffer.length > 1024 * 1024) {
    console.warn(
      `[subset-fonts] WARNING: ${out} exceeds 1MB — check SCAN_DIRS isn't sweeping in unintended content`
    );
  }
}

console.log(`[subset-fonts] total: ${(totalBytes / 1024).toFixed(1)} KB across ${TARGETS.length} files`);
