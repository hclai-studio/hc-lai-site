// Backtick spans in caption text (e.g. `jd`, `decisions_log.csv`) render as
// inline <code> — mono font, no pill background (see .prose-works figcaption code).
export function renderCaption(text: string): React.ReactNode {
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

export function stripCaptionCode(text: string): string {
  return text.replace(/`/g, '');
}
