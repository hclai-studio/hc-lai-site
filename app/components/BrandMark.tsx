"use client";

// Smooth input (Mac trackpad / touch, deltaMode=0): original scroll-driven animation.
// Discrete input (Windows mouse wheel, deltaMode=1): 3-state threshold system.
//   T2−T1 = 72px < 80px (minimum common notch) → any notch that crosses T1 will
//   cross T2 on its very next scroll → guaranteed clean face→H.C.→H.C.Lai in 2 steps.

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

    const retract  = seg(p, 0,    0.22, "out");
    const contract = seg(p, 0.55, 0.70, "strong");
    const build    = seg(p, 0.32, 0.92, "strong");

    const WORD_Y_SHIFT = -35;

    const wLai = wordLaiRef.current;
    if (wLai) {
      wLai.setAttribute("opacity",   String(clamp(1 - retract)));
      wLai.setAttribute("transform", `translate(${mix(0, -40, retract)} ${WORD_Y_SHIFT})`);
    }

    const wHC = wordHCRef.current;
    if (wHC) {
      const s = mix(1, 0.94, contract);
      wHC.setAttribute("opacity",   String(clamp(1 - contract)));
      wHC.setAttribute("transform",
        `translate(0 ${WORD_Y_SHIFT}) translate(310 394) scale(${s} ${s}) translate(-310 -394)`);
    }

    const d1 = dotOneRef.current;
    if (d1) {
      const cx = mix(311,    487.45, build);
      const cy = mix(381 + WORD_Y_SHIFT, 285, build);
      const w  = mix(25,     34.1,   build);
      const h  = mix(25,     43.4,   build);
      const rx = mix(8,      0,      build);
      d1.setAttribute("x",      String(cx - w / 2));
      d1.setAttribute("y",      String(cy - h / 2));
      d1.setAttribute("width",  String(w));
      d1.setAttribute("height", String(h));
      d1.setAttribute("rx",     String(rx));
    }

    const d2 = dotTwoRef.current;
    if (d2) {
      const cx = mix(541,    552.55, build);
      const cy = mix(381 + WORD_Y_SHIFT, 285, build);
      const w  = mix(25,     34.1,   build);
      const h  = mix(25,     43.4,   build);
      const rx = mix(8,      0,      build);
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(0);
      return;
    }

    let raf: number | null = null;
    let isDiscrete = false;

    // Mac/touch: original scroll-driven (START/D/snap unchanged)
    function computePSmooth() {
      const START = window.innerHeight * 0.45;
      const D     = window.innerHeight * 0.40;
      const raw   = clamp((window.scrollY - START) / D);
      let p = 1 - raw;
      if (p > 0.97) p = 1;
      if (p < 0.03) p = 0;
      return p;
    }

    // Windows mouse wheel: 3-state threshold — T2−T1=72px ensures any notch ≥80px
    // that crosses T1 will always cross T2 on the very next scroll event.
    function computePDiscrete() {
      const T1 = window.innerHeight * 0.45;
      const T2 = T1 + 72;
      const y  = window.scrollY;
      if (y >= T2) return 0;    // H.C. Lai
      if (y >= T1) return 0.27; // H.C. (build=0, contract=0, retract=1 — clean state)
      return 1;                  // face
    }

    function update() {
      render(isDiscrete ? computePDiscrete() : computePSmooth());
    }

    function onWheel(e: WheelEvent) {
      const was = isDiscrete;
      // deltaMode=1  → definitive Windows line-scroll
      // deltaMode=0 + |deltaY|≥50 → Chrome on Windows (normalises to pixels but sends large steps)
      // Mac trackpad sends many events with |deltaY|<10; Windows mouse sends 1 event with |deltaY|≥100
      isDiscrete = e.deltaMode === 1 || (e.deltaMode === 0 && Math.abs(e.deltaY) >= 50);
      if (was !== isDiscrete) update();
    }

    function onScroll() {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => { raf = null; update(); });
    }

    window.addEventListener("wheel",  onWheel,  { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    const blink = setInterval(() => {
      if (pRef.current <= 0.9) return;
      [dotOneRef.current, dotTwoRef.current].forEach(el => {
        if (!el) return;
        el.classList.add("brand-blinking");
        el.addEventListener("animationend", () => el.classList.remove("brand-blinking"), { once: true });
      });
    }, 5000);

    return () => {
      window.removeEventListener("wheel",  onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf !== null) cancelAnimationFrame(raf);
      clearInterval(blink);
    };
  }, [render]);

  return (
    <svg
      viewBox="100 150 840 270"
      width={106}
      height={34}
      overflow="hidden"
      style={{ color: "var(--ink)", display: "block" }}
      fill="currentColor"
      className={className}
      aria-label="H.C. Lai"
    >
      <g ref={wordHCRef} opacity="0">
        <text className="brand-name" x="121" y="394">H</text>
        <text className="brand-name" x="359" y="394">C</text>
      </g>
      <g ref={wordLaiRef} opacity="0">
        <text className="brand-name" x="601" y="394">Lai</text>
      </g>
      <rect ref={dotOneRef} className="brand-eye"
        x="470.4" y="263.3" width="34.1" height="43.4" rx="0" />
      <rect ref={dotTwoRef} className="brand-eye"
        x="535.5" y="263.3" width="34.1" height="43.4" rx="0" />
      <g ref={openFriendRef} transform="translate(343.3 176.5) scale(1.55)" opacity="1">
        <polygon ref={leftBkRef}
          points="0,0 54,0 54,32 28,32 28,108 54,108 54,140 0,140" />
        <polygon ref={rightBkRef}
          points="228,0 174,0 174,32 200,32 200,108 174,108 174,140 228,140" />
      </g>
    </svg>
  );
}
