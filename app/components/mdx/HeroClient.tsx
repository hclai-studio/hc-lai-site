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
const SMOOTHING = 0.08; // ≈ GSAP ScrollTrigger scrub: 0.8
const END_VIEWPORT_FRACTION = 0.4; // hero center at 40% of viewport height
const SPAN_VH_FRACTION = 0.3; // scroll span = 30% of viewport height, anchored off the end trigger
const CONVERGED_THRESHOLD = 0.001;

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

      const rect = el2.getBoundingClientRect();
      const computed = getComputedStyle(el2);
      const vh = window.innerHeight;
      const centerDocY = rect.top + window.scrollY + rect.height / 2;

      // Only the end trigger is anchored to the hero's own position; the start
      // trigger is derived by subtracting a fixed viewport-height fraction
      // from it. Anchoring both ends independently (each as "hero center at
      // X% of viewport height") let the actual span balloon past its
      // intended size whenever the hero's height changed the position of its
      // own center — diluting power2.out's front-loaded feel over a much
      // longer scroll distance than intended.
      endScrollY = centerDocY - vh * END_VIEWPORT_FRACTION;
      startScrollY = endScrollY - vh * SPAN_VH_FRACTION;
      startWidth = Math.min(HERO_WIDTH_START, window.innerWidth - 48);
      endWidth = document.documentElement.clientWidth; // not 100vw — excludes the scrollbar
      startMarginTop = parseFloat(computed.marginTop) || 0;
      startMarginBottom = parseFloat(computed.marginBottom) || 0;

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
      computeTriggers();
      requestTick();
    }

    function handleMediaChange() {
      if (mqMobile.matches || mqReduced.matches) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        applyStatic();
      } else {
        computeTriggers();
        requestTick();
      }
    }

    computeTriggers();
    requestTick();

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', handleResize);
    mqMobile.addEventListener('change', handleMediaChange);
    mqReduced.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', handleResize);
      mqMobile.removeEventListener('change', handleMediaChange);
      mqReduced.removeEventListener('change', handleMediaChange);
      if (rafId) cancelAnimationFrame(rafId);
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
