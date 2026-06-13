"use client";

// Animation math ported verbatim from logo-wide-friend-motion-v11.html (mode='full', eased).
// Direction reversed: p=1 = Open Face (scroll top), p=0 = H.C. Lai. (scrolled past hero).

import { useEffect, useRef, useCallback } from "react";

function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }
function easeInOutCubic(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }
function easeInOutQuint(t: number) { return t < 0.5 ? 16*Math.pow(t,5) : 1 - Math.pow(-2*t+2, 5)/2; }
function easeOutQuint(t: number)   { return 1 - Math.pow(1-t, 5); }
function curve(v: number, type: string) {
  const t = clamp(v);
  if (type === "out")    return easeOutQuint(t);
  if (type === "strong") return easeInOutQuint(t);
  return easeInOutCubic(t);
}
function seg(p: number, s: number, e: number, type = "standard") {
  return curve((p - s) / (e - s), type);
}
function mix(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function BrandMark({ className = "" }: { className?: string }) {
  const wordHCRef     = useRef<SVGGElement>(null);
  const wordLaiRef    = useRef<SVGGElement>(null);
  const dotOneRef     = useRef<SVGRectElement>(null);
  const dotTwoRef     = useRef<SVGRectElement>(null);
  const openFriendRef = useRef<SVGGElement>(null);
  const leftBkRef     = useRef<SVGPolygonElement>(null);
  const rightBkRef    = useRef<SVGPolygonElement>(null);
  const pRef          = useRef(1);

  const render = useCallback((rawP: number) => {
    const p      = clamp(rawP);
    pRef.current = p;

    // ── verbatim math from source (mode='full') ──────────────────────
    const retract  = seg(p, 0,    0.22, "out");
    const contract = seg(p, 0.22, 0.6,  "strong");
    const build    = seg(p, 0.32, 0.92, "strong");

    const wLai = wordLaiRef.current;
    if (wLai) {
      wLai.setAttribute("opacity",   String(clamp(1 - retract)));
      wLai.setAttribute("transform",
        `translate(${mix(0, -14, retract)} 0) translate(520 286) scale(1) translate(-520 -286)`);
    }

    const wHC = wordHCRef.current;
    if (wHC) {
      const s = mix(1, 0.94, contract);
      wHC.setAttribute("opacity",   String(clamp(1 - contract)));
      wHC.setAttribute("transform",
        `translate(435 286) scale(${s} ${s}) translate(-435 -286)`);
    }

    // punctuation dots morph into eye squares (and back)
    const d1 = dotOneRef.current;
    if (d1) {
      const cx = mix(431.5,  487.45, build);
      const cy = mix(303.5,  285,    build);
      const w  = mix(9,      34.1,   build);
      const h  = mix(9,      43.4,   build);
      const rx = mix(3,      0,      build);
      d1.setAttribute("x",      String(cx - w / 2));
      d1.setAttribute("y",      String(cy - h / 2));
      d1.setAttribute("width",  String(w));
      d1.setAttribute("height", String(h));
      d1.setAttribute("rx",     String(rx));
    }

    const d2 = dotTwoRef.current;
    if (d2) {
      const cx = mix(514.5,  552.55, build);
      const cy = mix(303.5,  285,    build);
      const w  = mix(9,      34.1,   build);
      const h  = mix(9,      43.4,   build);
      const rx = mix(3,      0,      build);
      d2.setAttribute("x",      String(cx - w / 2));
      d2.setAttribute("y",      String(cy - h / 2));
      d2.setAttribute("width",  String(w));
      d2.setAttribute("height", String(h));
      d2.setAttribute("rx",     String(rx));
    }

    const of_ = openFriendRef.current;
    if (of_) {
      of_.setAttribute("opacity",   String(clamp(build)));
      of_.setAttribute("transform",
        `translate(${mix(454, 343.3, build)} ${mix(230, 176.5, build)}) scale(${mix(0.58, 1.55, build)})`);
    }
    if (leftBkRef.current)  leftBkRef.current.setAttribute("opacity",  String(clamp(build)));
    if (rightBkRef.current) rightBkRef.current.setAttribute("opacity", String(clamp(build)));
  }, []);

  useEffect(() => {
    // static H.C. Lai. for reduced-motion users
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(0);
      return;
    }

    let raf: number | null = null;

    function computeP() {
      const D   = Math.min(window.innerHeight * 0.55, 380);
      const raw = clamp(window.scrollY / D);
      let p     = 1 - raw;
      if (p > 0.97) p = 1;
      if (p < 0.03) p = 0;
      return p;
    }

    function update() { render(computeP()); }

    function onScroll() {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => { raf = null; update(); });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    // eye blink: every 5s, only while face is showing (p > 0.9)
    const blink = setInterval(() => {
      if (pRef.current <= 0.9) return;
      [dotOneRef.current, dotTwoRef.current].forEach(el => {
        if (!el) return;
        el.classList.add("brand-blinking");
        el.addEventListener("animationend", () => el.classList.remove("brand-blinking"), { once: true });
      });
    }, 5000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf !== null) cancelAnimationFrame(raf);
      clearInterval(blink);
    };
  }, [render]);

  // JSX initial state = p=1 (open face): words hidden, brackets + eyes visible
  return (
    <svg
      viewBox="330 150 390 270"
      height={34}
      style={{ width: "auto", color: "var(--ink)", display: "block" }}
      fill="currentColor"
      className={className}
      aria-label="H.C. Lai"
    >
      {/* HC — hidden at p=1 */}
      <g ref={wordHCRef} opacity="0">
        <text className="brand-name" x="363" y="310">H</text>
        <text className="brand-name" x="449" y="310">C</text>
      </g>
      {/* Lai — hidden at p=1 */}
      <g ref={wordLaiRef} opacity="0">
        <text className="brand-name" x="536" y="310">Lai</text>
      </g>
      {/* dots: start at eye positions (p=1); morph to punctuation (p=0) */}
      <rect ref={dotOneRef} className="brand-eye"
        x="470.4" y="263.3" width="34.1" height="43.4" rx="0" />
      <rect ref={dotTwoRef} className="brand-eye"
        x="535.5" y="263.3" width="34.1" height="43.4" rx="0" />
      {/* open face brackets — original polygon, single shape, no seams */}
      <g ref={openFriendRef} transform="translate(343.3 176.5) scale(1.55)" opacity="1">
        <polygon ref={leftBkRef}
          points="0,0 54,0 54,32 28,32 28,108 54,108 54,140 0,140" />
        <polygon ref={rightBkRef}
          points="228,0 174,0 174,32 200,32 200,108 174,108 174,140 228,140" />
      </g>
    </svg>
  );
}
