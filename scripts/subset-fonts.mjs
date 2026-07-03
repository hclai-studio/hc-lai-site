// Scans site content/components for every character actually in use, then subsets Chiron
// Sung HK down to just those characters, replacing the 109-slice unicode-range setup with
// a single small woff2. Re-run after adding or editing any Chinese copy.
//
// Source font: fonts-src/chiron-sung-hk-static400.ttf (gitignored). This is NOT the raw
// variable font — harfbuzzjs's wasm heap can't load the ~82MB full VF (hb_subset_input
// creation overflows its buffer). To regenerate this file if it's missing:
//   1. npm pack @fontpkg/chiron-sung-hk-vf && tar -xzf fontpkg-chiron-sung-hk-vf-*.tgz
//   2. Use fontTools to pin the wght axis to 400 (this is the only weight this site uses;
//      bold Chinese text renders via Noto Serif SC 700 instead):
//        python3 -c "
//        from fontTools.ttLib import TTFont
//        from fontTools.varLib.instancer import instantiateVariableFont
//        f = TTFont('package/ChironSungHKVF.ttf')
//        instantiateVariableFont(f, {'wght': 400}, inplace=True)
//        f.save('fonts-src/chiron-sung-hk-static400.ttf')
//        "
// The per-run subsetting below (driven by subset-font/harfbuzz) only needs to redo the
// character-set trim, which is why it's fast enough to run after every content edit.
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

const srcPath = join(ROOT, 'fonts-src', 'chiron-sung-hk-static400.ttf');
const fontBuffer = readFileSync(srcPath);

// Source is already pinned to wght=400 (see header comment) — no variationAxes needed here.
const subsetBuffer = await subsetFont(fontBuffer, charString, {
  targetFormat: 'woff2',
});

const outDir = join(ROOT, 'public', 'fonts', 'chiron-sung-subset');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'chiron-sung-hk-subset.woff2');
writeFileSync(outPath, subsetBuffer);

const sizeKB = (statSync(outPath).size / 1024).toFixed(1);
console.log(`[subset-fonts] scanned ${files.length} files, ${chars.size} unique characters`);
console.log(`[subset-fonts] wrote ${outPath} (${sizeKB} KB)`);
if (subsetBuffer.length > 1024 * 1024) {
  console.warn(
    `[subset-fonts] WARNING: output exceeds 1MB — check SCAN_DIRS isn't sweeping in unintended content`
  );
}
