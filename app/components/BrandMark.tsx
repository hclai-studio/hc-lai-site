"use client";

// Smooth input (Mac trackpad / touch): original scroll-driven animation, unchanged.
// Discrete input (Windows mouse wheel, |deltaY|≥50 or deltaMode=1):
//   3-state machine (0=face, 1=H.C., 2=H.C.Lai). Both transitions driven from the
//   wheel event (not scroll) so latency is symmetric. T1 crossing uses estimated
//   future scrollY (current + notch pixels) to avoid waiting for Chrome scroll anim.

import { useEffect, useRef, useCallback } from "react";

function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }
function easeInOutCubic(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }
function easeInOutQuint(t: number) { return t < 0.5 ? 16*Math.pow(t,5) : 1 - Math.pow(-2*t+2, 5)/2; }
function easeOutQuint(t: number)   { return 1 - Math.pow(1-t, 5); }
function curve(v: number, type: string) {
  const t = clamp(v);
  if (type === "out")    return easeOutQuint(t);
  if (type === "strong") return easeInOutQuint(t);
  if (type === "linear") return t;
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

  // discrete=true: skip the seg-level easing (p already eased by tween) so the
  // first rendered frame shows immediate visible progress instead of a flat start.
  const render = useCallback((rawP: number, discrete = false) => {
    const p      = clamp(rawP);
    pRef.current = p;

    const retract  = seg(p, 0,    0.22, "out");
    // Wider range + linear for discrete → H.C. text appears by frame 3 (~50ms).
    const contract = discrete ? seg(p, 0.55, 0.90, "linear") : seg(p, 0.55, 0.70, "strong");
    const build    = seg(p, 0.32, 0.92, discrete ? "linear" : "strong");

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

    let scrollRaf: number | null = null;
    let tweenRaf:  number | null = null;
    let isDiscrete      = false;
    let discreteState   = 0;   // 0=face  1=H.C.  2=H.C.Lai
    let discreteTarget  = 1;
    let downCount       = 0;   // cumulative downward notch count while in state 0
    const HC_NOTCH      = 7;   // 7th downward notch triggers face→H.C.

    const P_FACE = 1;
    const P_HC   = 0.27; // build=0, contract=0, retract=1 → clean H.C.
    const P_LAI  = 0;

    function startTween(to: number) {
      if (to === discreteTarget) return;
      discreteTarget = to;
      const fromP = pRef.current;
      const pDist = Math.abs(to - fromP);
      // face↔H.C. spans ~0.73 of p and changes many elements → give it more time
      const ms    = pDist > 0.50 ? 520 : 380;
      const t0    = performance.now();
      if (tweenRaf !== null) cancelAnimationFrame(tweenRaf);
      function tick(now: number) {
        const t = clamp((now - t0) / ms);
        render(fromP + (discreteTarget - fromP) * easeOutQuint(t), true);
        tweenRaf = t < 1 ? requestAnimationFrame(tick) : null;
      }
      tweenRaf = requestAnimationFrame(tick);
    }

    // Mac / touch: original scroll-driven (START / D / snap unchanged)
    function computePSmooth() {
      const START = window.innerHeight * 0.45;
      const D     = window.innerHeight * 0.40;
      const raw   = clamp((window.scrollY - START) / D);
      let p = 1 - raw;
      if (p > 0.97) p = 1;
      if (p < 0.03) p = 0;
      return p;
    }

    // Windows: both transitions fire on the wheel event itself — zero scroll-event lag.
    // State 0→1 uses a notch counter (not scrollY) so Chrome smooth-scroll delay
    // never affects timing. State 1→2 fires unconditionally on the next notch.
    function handleDiscreteWheel(e: WheelEvent) {
      const down = e.deltaY > 0;

      if (down) {
        if (discreteState === 0) {
          downCount++;
          if (downCount >= HC_NOTCH) {
            discreteState = 1;
            startTween(P_HC);
          }
        } else if (discreteState === 1) {
          discreteState = 2;
          startTween(P_LAI);
        }
      } else {
        if (discreteState === 2) {
          discreteState = 1;
          startTween(P_HC);
        } else if (discreteState === 1) {
          // One upward notch from H.C. → back to face
          discreteState = 0;
          downCount = HC_NOTCH - 1; // next down immediately re-triggers
          startTween(P_FACE);
        } else {
          downCount = Math.max(0, downCount - 1);
        }
      }
    }

    // Fallback: reset to face if user scrolls back to very top via keyboard/scrollbar
    function syncDiscreteFromScroll() {
      if (window.scrollY < 80 && discreteState !== 0) {
        discreteState = 0;
        downCount = 0;
        startTween(P_FACE);
      }
    }

    function onWheel(e: WheelEvent) {
      const was = isDiscrete;
      isDiscrete = e.deltaMode === 1 || (e.deltaMode === 0 && Math.abs(e.deltaY) >= 50);
      if (isDiscrete) {
        handleDiscreteWheel(e);
      } else if (was) {
        // Switched back to smooth — cancel tween and sync
        if (tweenRaf !== null) { cancelAnimationFrame(tweenRaf); tweenRaf = null; }
        render(computePSmooth());
      }
    }

    function onScroll() {
      if (isDiscrete) {
        syncDiscreteFromScroll(); // fallback only; primary transitions in onWheel
      } else {
        if (scrollRaf !== null) return;
        scrollRaf = requestAnimationFrame(() => { scrollRaf = null; render(computePSmooth()); });
      }
    }

    function onResize() { if (!isDiscrete) render(computePSmooth()); }

    window.addEventListener("wheel",  onWheel,  { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    render(computePSmooth());

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
      window.removeEventListener("resize", onResize);
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
      if (tweenRaf  !== null) cancelAnimationFrame(tweenRaf);
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
