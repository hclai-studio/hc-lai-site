'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroClientProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const BASE_RADIUS = 12; // must match .case-hero's border-radius in globals.css
const HERO_WIDTH_START = 1280; // must match --hero-width-start in globals.css
const HERO_BAND = 71; // target single-side cream band (px) at full growth — the
// author-approved look at 1920×953; --hero-aspect is now solved backward from
// this instead of being a fixed ratio, so the band stays ~71px regardless of
// window shape (previously it drifted: (vh - vw/2.35)/2 shrank toward ~30px
// on shorter/wider windows like ~1568×728). Clamped to [2.0, 3.0] since the
// source is 3:1 with plain cream on both sides — beyond 3.0 there's no more
// cream left to trim, only actual subject content, so the band can fall
// below 71px on very short/wide viewports; that's a real material limit, not
// a bug.
const SMOOTHING = 0.08; // ≈ GSAP ScrollTrigger scrub: 0.8
const END_VIEWPORT_FRACTION = 0.5; // hero center at 50% (vertically centered) of viewport height —
// with the 3:1 source images this leaves a scroll window where the
// fully-grown hero sits fully on-screen with symmetric cream above/below
const SPAN_VH_FRACTION = 0.3; // scroll span = 30% of viewport height, anchored off the end trigger
const CONVERGED_THRESHOLD = 0.001;
const SNAP_IDLE_MS = 150; // no wheel/touch/keydown for this long = "input stopped"
const SNAP_DURATION_MS = 350; // 300–400ms, ease-out to match hero's own power2.out

export default function HeroClient({ src, alt, width, height }: HeroClientProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let startScrollY = 0;
    let endScrollY = 0;
    let startWidth = 880;
    let endWidth = 880;
    let startMarginTop = 0;
    let startMarginBottom = 0;
    let containingBlockWidth = 0;
    let cur = 0;
    let rafId = 0;

    // Snap-to-center state (v3.10). Real scroll input lands in ~100px
    // quantized notches, and endScrollY differs page to page (ProjectHeader
    // height varies with title length) — so the true symmetric point almost
    // never coincides with where a notch happens to land, by an amount that
    // looks page-specific but is really just "how far this notch missed".
    // Rather than chase that with faster convergence or predictive LOGO
    // timing, snap scrollY itself to endScrollY once input stops inside the
    // fully-visible window — hero/LOGO's own scroll listeners then land
    // exactly where they're designed to, unmodified.
    let snapRafId = 0;
    let snapIdleTimer: ReturnType<typeof setTimeout> | null = null;
    let hasSnappedThisVisit = false;

    // Trigger positions and start/end sizes are computed once here (and again
    // on resize) — never re-derived from the element's own current rect mid-
    // animation, which would be the same self-tracking trap the previous
    // view()-based version was built to avoid.
    function computeTriggers() {
      const el2 = imgRef.current;
      if (!el2) return;

      // Reset to the resting CSS state before measuring, in case this runs
      // (on resize) while a previous animation frame left inline styles set.
      el2.style.width = '';
      el2.style.marginTop = '';
      el2.style.marginBottom = '';
      el2.style.marginLeft = '';
      el2.style.marginRight = '';
      el2.style.borderRadius = '';

      const computed = getComputedStyle(el2);
      const vh = window.innerHeight;

      startWidth = Math.min(HERO_WIDTH_START, window.innerWidth - 48);
      endWidth = document.documentElement.clientWidth; // not 100vw — excludes the scrollbar
      startMarginTop = parseFloat(computed.marginTop) || 0;
      startMarginBottom = parseFloat(computed.marginBottom) || 0;

      // Solve --hero-aspect backward from the target cream band instead of
      // using a fixed ratio: aspect = endWidth / (vh - 2*HERO_BAND) gives
      // whatever ratio makes the fully-grown hero's height leave exactly
      // HERO_BAND px above and below at the current window's shape. Written
      // onto the element itself (not :root) so it only affects this hero
      // instance; the mobile media query overrides with a literal 16/9
      // regardless, so this has no effect there. Must happen before the
      // end-state measurement below, since that measurement's height comes
      // from whatever aspect-ratio is in effect at the time.
      const solvedAspect = Math.min(3.0, Math.max(2.0, endWidth / (vh - 2 * HERO_BAND)));
      el2.style.setProperty('--hero-aspect', String(solvedAspect));

      // endScrollY must be anchored to the hero's END-STATE geometric center,
      // not its resting-state one. By the time growth finishes, height has
      // grown from startWidth/aspectRatio to endWidth/aspectRatio (a couple
      // hundred px at typical desktop widths) and margin-top has collapsed
      // to 0 — both shift the true center further down the document than a
      // resting-state measurement would suggest. An earlier version measured
      // the resting rect and used that as the center, which made endScrollY
      // too small: growth finished a scroll notch before the hero's real
      // center reached 50%, leaving it briefly parked around 62% (cream on
      // top, clipped on the bottom) until more scrolling caught it up.
      // Measuring the end-state center directly — by momentarily applying
      // the end-state width/margin-top and reading the resulting rect —
      // rather than computing it from a hardcoded aspect ratio keeps this
      // correct even if --hero-aspect is retuned later. Synchronous with no
      // yield in between, so it never paints.
      el2.style.width = `${endWidth}px`;
      el2.style.marginTop = '0px';
      const endRect = el2.getBoundingClientRect();
      const endCenterDocY = endRect.top + window.scrollY + endRect.height / 2;
      el2.style.width = '';
      el2.style.marginTop = '';

      // Only the end trigger is anchored to the hero's own (end-state)
      // position; the start trigger is derived by subtracting a fixed
      // viewport-height fraction from it, rather than being independently
      // anchored to its own "X% of viewport height" — that let the actual
      // span balloon past its intended size whenever the hero's height
      // changed the position of its own center, diluting power2.out's
      // front-loaded feel over a much longer scroll distance than intended.
      endScrollY = endCenterDocY - vh * END_VIEWPORT_FRACTION;
      startScrollY = endScrollY - vh * SPAN_VH_FRACTION;

      // The margin math below centers the image against its *containing
      // block* (.prose-works's content box, capped at 720px minus its own
      // padding — e.g. 672px, not the full viewport) — the same box a plain
      // CSS `calc((100% - width) / 2)` margin would resolve against. Using
      // document.documentElement.clientWidth here instead was a real bug:
      // it centered against the viewport, which only coincides with the
      // containing block below .prose-works's own max-width cap. Above it
      // (any viewport ≥ ~768px), that mismatch shifted the whole box left
      // and let it overflow off the right edge — caught on the first live
      // scroll test after deploying.
      const parent = el2.parentElement;
      if (parent) {
        const parentStyle = getComputedStyle(parent);
        containingBlockWidth =
          parent.clientWidth - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight);
      }
    }

    function applyStatic() {
      const el2 = imgRef.current;
      if (!el2) return;
      el2.style.width = '';
      el2.style.marginTop = '';
      el2.style.marginBottom = '';
      el2.style.marginLeft = '';
      el2.style.marginRight = '';
      el2.style.borderRadius = '';
    }

    function tick() {
      rafId = 0;
      const el2 = imgRef.current;
      if (!el2) return;

      if (mqMobile.matches || mqReduced.matches) {
        applyStatic();
        return;
      }

      const span = endScrollY - startScrollY;
      let p = span > 0 ? (window.scrollY - startScrollY) / span : 1;
      p = Math.min(1, Math.max(0, p));
      const eased = 1 - Math.pow(1 - p, 2); // power2.out

      cur += (eased - cur) * SMOOTHING;

      const w = startWidth + (endWidth - startWidth) * cur;
      const mt = startMarginTop * (1 - cur);
      const mb = startMarginBottom * (1 - cur);
      const br = BASE_RADIUS * (1 - cur);
      const sideMargin = (containingBlockWidth - w) / 2;

      el2.style.width = `${w}px`;
      el2.style.marginLeft = `${sideMargin}px`;
      el2.style.marginRight = `${sideMargin}px`;
      el2.style.marginTop = `${mt}px`;
      el2.style.marginBottom = `${mb}px`;
      el2.style.borderRadius = `${br}px`;

      if (Math.abs(eased - cur) > CONVERGED_THRESHOLD) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function requestTick() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function handleResize() {
      cancelSnap();
      hasSnappedThisVisit = false; // endScrollY (and the window around it) may have moved
      computeTriggers();
      requestTick();
    }

    function handleMediaChange() {
      if (mqMobile.matches || mqReduced.matches) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        cancelSnap();
        applyStatic();
      } else {
        computeTriggers();
        requestTick();
      }
    }

    function isSnapEligible() {
      return !mqMobile.matches && !mqReduced.matches;
    }

    function withinSnapWindow(y: number) {
      return Math.abs(y - endScrollY) <= HERO_BAND;
    }

    function cancelSnap() {
      if (snapRafId) {
        cancelAnimationFrame(snapRafId);
        snapRafId = 0;
      }
    }

    // Tweens window.scrollY itself to endScrollY, ease-out, over
    // SNAP_DURATION_MS — hero's own 'scroll' listener (tick/requestTick) and
    // BrandMark's LOGO listeners react to the resulting scroll events
    // exactly as they already do for real user scrolling, so they land
    // precisely where they're each designed to without any changes of their
    // own. window.scrollTo (not a CSS scroll-behavior) so this stays
    // frame-by-frame cancelable.
    function runSnap() {
      const fromY = window.scrollY;
      const toY = endScrollY;
      const distance = toY - fromY;
      if (distance === 0) return;
      const start = performance.now();

      function step(now: number) {
        const t = Math.min(1, (now - start) / SNAP_DURATION_MS);
        const eased = 1 - Math.pow(1 - t, 2); // power2.out — same character as hero's own easing
        window.scrollTo(0, fromY + distance * eased);
        snapRafId = t < 1 ? requestAnimationFrame(step) : 0;
      }
      snapRafId = requestAnimationFrame(step);
    }

    function maybeSnap() {
      snapIdleTimer = null;
      if (!isSnapEligible() || snapRafId) return;
      if (!withinSnapWindow(window.scrollY) || hasSnappedThisVisit) return;
      hasSnappedThisVisit = true;
      runSnap();
    }

    // wheel/touchstart/keydown, not 'scroll' — 'scroll' also fires from
    // runSnap()'s own window.scrollTo calls, so using it here would let the
    // snap cancel itself mid-flight and re-arm the idle timer against its
    // own motion.
    function onScrollInputEvent() {
      cancelSnap(); // any real input hands control back immediately
      if (snapIdleTimer) clearTimeout(snapIdleTimer);
      snapIdleTimer = setTimeout(maybeSnap, SNAP_IDLE_MS);
    }

    // Re-arms for the next visit as soon as scrollY leaves the window —
    // separate from the idle-triggered snap-in above, so a single pass
    // through the window without stopping doesn't get "used up".
    function trackSnapWindowMembership() {
      if (!withinSnapWindow(window.scrollY)) hasSnappedThisVisit = false;
    }

    computeTriggers();
    requestTick();

    // ProjectHeader's title is set with an explicit 'Instrument Serif',
    // 'Times New Roman' fallback and font-display:swap — so on first paint
    // it very often renders in the Times New Roman fallback (measured
    // ~84px taller here, exactly one line-height, since the fallback wraps
    // to an extra line the real font doesn't) and reflows once Instrument
    // Serif finishes loading. If computeTriggers() above ran during that
    // fallback window, everything it measured — the hero's resting
    // position, its end-state center, endScrollY — is stale by however much
    // that reflow shifts the hero afterward. This raced silently: whichever
    // page's specific title happened to need an already-cached font chunk
    // came out looking correct, and whichever needed a fresh network fetch
    // came out with mismatched cream bands and a LOGO threshold that didn't
    // line up with the hero's real end state, with no visible error either
    // way. Re-running once fonts.ready resolves (guaranteed to be after any
    // swap-triggered reflow) catches and corrects that regardless of which
    // way the race went.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      computeTriggers();
      requestTick();
    });

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('scroll', trackSnapWindowMembership, { passive: true });
    window.addEventListener('resize', handleResize);
    mqMobile.addEventListener('change', handleMediaChange);
    mqReduced.addEventListener('change', handleMediaChange);
    window.addEventListener('wheel', onScrollInputEvent, { passive: true });
    window.addEventListener('touchstart', onScrollInputEvent, { passive: true });
    window.addEventListener('keydown', onScrollInputEvent);

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('scroll', trackSnapWindowMembership);
      window.removeEventListener('resize', handleResize);
      mqMobile.removeEventListener('change', handleMediaChange);
      mqReduced.removeEventListener('change', handleMediaChange);
      window.removeEventListener('wheel', onScrollInputEvent);
      window.removeEventListener('touchstart', onScrollInputEvent);
      window.removeEventListener('keydown', onScrollInputEvent);
      if (rafId) cancelAnimationFrame(rafId);
      cancelSnap();
      if (snapIdleTimer) clearTimeout(snapIdleTimer);
    };
  }, []);

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      sizes="(max-width: 767px) 100vw, 100vw"
      className="case-hero"
    />
  );
}
