export default function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-ink-muted text-[11px] tracking-[0.08em] text-center mt-3 mb-10">
      {children}
    </p>
  );
}
