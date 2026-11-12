import type { ReactNode } from 'react';

// Wraps each number that has punctuation inside it (8,300 · 5.3.1 · 05-02) in
// <span className="num">, so that punctuation stays on the Geist Mono digit
// face while a comma, period, hyphen or slash in a sentence falls through to
// Georgia (see NumDigitsText in app/globals.css). The component-side twin of
// lib/rehype-num-runs.mjs, for prose text that arrives as props rather than as
// MDX; keep the two patterns the same. Use it only where the text sits in the
// prose font (a <p>, <li> or <strong> inside .prose-works): in a sans or mono
// context the span would switch its digits to the prose digit face.
const NUMBER = /(\d+(?:[.,/-]\d+)+)/;

export default function withNums(text: string): ReactNode {
  // With a capturing pattern, split() keeps the matches: they land on the odd
  // indices, the text around them on the even ones.
  const parts = text.split(NUMBER);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 ? (
      <span key={i} className="num">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
