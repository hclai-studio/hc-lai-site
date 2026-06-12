// Open Face mark — [ ◼ ◼ ] — extracted from logo-wide-friend-motion-v11.html at p=1
// viewBox 228×140 matches the openFriend group's natural coordinate system
// Hover triggers a one-shot eye blink via .open-face-mark CSS class (see globals.css)

export default function OpenFaceMark({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  const width = Math.round(size * (228 / 140));

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 228 140"
      fill="currentColor"
      className={`open-face-mark ${className}`}
      aria-hidden="true"
    >
      {/* Left bracket [ */}
      <rect x="0"   y="0"   width="54" height="32" />
      <rect x="0"   y="32"  width="28" height="76" />
      <rect x="0"   y="108" width="54" height="32" />
      {/* Right bracket ] */}
      <rect x="174" y="0"   width="54" height="32" />
      <rect x="200" y="32"  width="28" height="76" />
      <rect x="174" y="108" width="54" height="32" />
      {/* Eyes — scaleY blink on hover */}
      <rect className="mark-eye" x="82"  y="56" width="22" height="28" />
      <rect className="mark-eye" x="124" y="56" width="22" height="28" />
    </svg>
  );
}
