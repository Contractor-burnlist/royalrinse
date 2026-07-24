"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { allGalleryImages } from "@/lib/gallery";
import { Container } from "@/components/ui";

const AUTO_ADVANCE_MS = 4500;

/**
 * Every photo on the site: featureVehicles (exterior + interior),
 * exteriorGallery and interiorGallery, de-duplicated by src in lib/gallery.ts.
 */
const slides = allGalleryImages;

/**
 * Multi-up hero carousel.
 *
 * Tiles are portrait (3:4) because the photos are portrait; a landscape tile
 * would crop most of each frame away.
 *
 * ------------------------------------------------------------------
 *  SHARPNESS BUDGET — why the tiles stop growing at 450px.
 * ------------------------------------------------------------------
 * The sources are phone-resolution. By native width, of 24 photos:
 *      576px x4      900px x12      1024px x2      2268px+ x6
 * So 900px is the binding constraint for the bulk of the set. On a 2x
 * display a tile W CSS pixels wide needs 2W real pixels, which makes
 *      900 / 2 = 450px  the widest a tile can be and still be pixel-exact.
 *
 * At 450x600 CSS the tile asks for 900x1200 device pixels; a 900x1600
 * source cropped to 3:4 supplies exactly 900x1200. Dead on, no upscale.
 *
 * MAX_ROW_PX below caps the row so the tile can never exceed that, however
 * wide the viewport gets. Raising the tile size past this, or dropping to
 * 2-up on desktop, starts upscaling the 900px sources and they go soft.
 * The only real fix is re-exporting the originals larger.
 *
 * The four 576px sources DO upscale ~1.6x at this size — see the note on
 * MAX_ROW_PX. They are the oldest shots in the set.
 */
function perViewFor(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  // Fractional: the next tile peeks in at the right edge, which signals
  // swipeability on mobile far better than a single flush-cut tile.
  return 1.2;
}

/**
 * Row cap: 3 tiles x (450px image + 16px of px-2 gutter) = 1398.
 * Below ~1553px viewport the 90% width rule is narrower than this and wins,
 * so the cap only engages on large desktops — exactly where an uncapped
 * percentage width would blow the tiles past the 450px sharpness budget.
 */
const MAX_ROW_PX = 1398;

export function HeroCarousel({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(4);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Last index we can scroll to without running past the final tile.
  const maxIndex = Math.max(0, slides.length - perView);

  useEffect(() => {
    const sync = () => setPerView(perViewFor(window.innerWidth));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Clamp if the viewport grew and `current` is now past the end.
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  /**
   * maxIndex is FRACTIONAL when perView is (22.8 for 24 slides at 1.2-up), so
   * stepping by a whole 1 can jump past the end: index 23 against a 22.8 limit
   * would translate the track further than it has tiles and open a blank gap
   * at the right edge. Overshoot therefore lands ON maxIndex first — a flush
   * final frame — and only wraps to 0 on the step after that.
   */
  const go = useCallback(
    (delta: number) =>
      setCurrent((c) => {
        const next = c + delta;
        if (next < 0) return maxIndex;
        if (next > maxIndex) return c >= maxIndex ? 0 : maxIndex;
        return next;
      }),
    [maxIndex],
  );

  // Read inside the interval so the effect below never needs these as deps.
  const maxIndexRef = useRef(maxIndex);
  maxIndexRef.current = maxIndex;
  const enoughSlidesRef = useRef(true);
  enoughSlidesRef.current = slides.length > perView;

  /**
   * ============================================================
   *  AUTO-SCROLL — DO NOT REMOVE.
   *  This interval is the ONLY thing that advances the carousel.
   *  `current` drives the translateX on the tile track below, so if this
   *  effect stops running the row goes static.
   *
   *  Deps are deliberately ONLY [paused]. Everything else is read through a
   *  ref, so the interval is never torn down and rebuilt on unrelated
   *  re-renders (resize, index change, etc.) — that churn is what made this
   *  fragile and repeatedly "broke" auto-scroll after layout edits.
   * ============================================================
   */
  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      if (!enoughSlidesRef.current) return;
      // Same fractional-maxIndex clamp as go() — see the note there.
      setCurrent((c) =>
        c >= maxIndexRef.current
          ? 0
          : Math.min(c + 1, maxIndexRef.current),
      );
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [paused]);

  /**
   * Pause is bound ONLY to the arrow buttons — small, deliberate targets.
   * It used to sit on large regions (the hero, the tile row), where a cursor
   * simply resting on the page froze the carousel indefinitely and read as
   * "auto-scroll is broken". Focus-pause is kept for keyboard users.
   */
  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  return (
    <section className="relative -mt-24 overflow-hidden border-b border-hairline sm:-mt-32">
      {/* Ambient blurred backdrop of the leading tile — upscaled, but blurred
          on purpose, so its softness reads as depth. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={slides[Math.min(current, slides.length - 1)].src}
          alt=""
          fill
          quality={40}
          sizes="100vw"
          className="scale-125 object-cover blur-3xl brightness-[0.3] saturate-[0.8] transition-all duration-1000"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-base/85"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent"
      />

      {/* Tight top offset — just clears the sticky header (h-24 / h-32) — so the
          whole block sits high and the photo row lands above the fold. */}
      <div className="relative z-10 pb-16 pt-28 sm:pb-20 sm:pt-36">
        <Container>
          <div className="mx-auto max-w-3xl text-center">{children}</div>
        </Container>

        {/* 92% / 90% framed width is unchanged; maxWidth is the sharpness cap
            described at MAX_ROW_PX, and only bites on large desktops. */}
        <div
          className="mx-auto mt-6 w-[92%] sm:mt-7 sm:w-[90%]"
          style={{ maxWidth: `${MAX_ROW_PX}px` }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Recent detailing work"
        >
          {/* Viewport. overflow-hidden clips the track; no page overflow. */}
          <div className="overflow-hidden">
            {/* Under prefers-reduced-motion the row still advances, but jumps
                instantly instead of sliding — the ANIMATION is what that
                setting asks us to drop, not the content rotation. */}
            <div
              data-autoscroll="hero"
              data-index={current}
              className={`flex ${
                reducedMotion ? "" : "transition-transform duration-700 ease-out"
              }`}
              style={{
                transform: `translateX(-${current * (100 / perView)}%)`,
              }}
            >
              {slides.map((slide, index) => {
                /**
                 * Load the visible row plus one tile of lookahead. Native
                 * lazy-loading does NOT reliably fire for tiles inside a
                 * translated track — they slid in blank — so loading is driven
                 * off the carousel index instead. Offscreen tiles beyond the
                 * lookahead stay lazy, so the page doesn't pull all 11 up front.
                 */
                const load = index <= Math.max(perView, current + perView);

                /**
                 * The lead tile is the featured shot (see the ordering note in
                 * lib/gallery.ts). It gets a royal ring and a warmer shadow so
                 * it reads as the hero image, and a higher quality since it is
                 * the one tile guaranteed to be on screen at first paint.
                 * This is styling only — it must not affect track geometry, or
                 * the translateX maths below stops landing cleanly.
                 */
                const featured = index === 0;

                return (
                  <div
                    key={slide.src}
                    // No gap on the track: the tile width is an exact fraction
                    // so the translate lands cleanly. Gutter is inner padding.
                    className="shrink-0 px-1.5 sm:px-2"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <div
                      className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface shadow-2xl ${
                        featured
                          ? "border-2 border-royal/70 shadow-royal/20 ring-1 ring-royal/30"
                          : "border border-chrome/20"
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        /**
                         * Tracks the real rendered tile width so next/image
                         * serves a file that fits it — no bigger, no smaller.
                         *   >=1553px : row is capped, tile is a flat 450px
                         *   >=1024px : 90vw / 3 tiles = 30vw
                         *   >=640px  : 90vw / 2 tiles = 45vw
                         *   <640px   : 92vw / 1.2 tiles = 77vw
                         * Anything wider than the source is served at the
                         * source's own width — the optimizer never upscales.
                         */
                        sizes="(min-width: 1553px) 450px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 77vw"
                        quality={85}
                        priority={featured}
                        loading={load ? "eager" : "lazy"}
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal controls: arrows + a compact counter. A dot per photo
              would be a cluttered row at this many slides. */}
          <div className="mt-7 flex items-center justify-center gap-5">
            {/* pauseHandlers live on the arrows themselves — see the note above
                the auto-scroll effect. Anything larger has repeatedly frozen
                the carousel by accident. */}
            <span {...pauseHandlers}>
              <CarouselArrow direction="prev" onClick={() => go(-1)} />
            </span>

            <span className="font-display text-xs font-semibold tabular-nums tracking-[0.14em] text-chrome">
              {/* ceil: perView is fractional on mobile (1.2), and a counter
                  reading "1.2 / 24" is nonsense. Round up to the last tile
                  that has any part of itself on screen. */}
              {String(
                Math.ceil(Math.min(current + perView, slides.length)),
              ).padStart(2, "0")}
              <span className="text-muted">
                {" "}
                / {String(slides.length).padStart(2, "0")}
              </span>
            </span>

            <span {...pauseHandlers}>
              <CarouselArrow direction="next" onClick={() => go(1)} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous photos" : "Next photos"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface/60 text-chrome backdrop-blur-sm transition-colors hover:border-chrome/50 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
