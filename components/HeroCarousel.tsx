"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { featureVehicles, type GalleryImage } from "@/lib/gallery";

const AUTO_ADVANCE_MS = 5000;

/**
 * Hero slides. Only the highest-resolution sources (>= 900px wide) — the 576px
 * shots would need upscaling even in the contained frame.
 */
const MIN_HERO_WIDTH = 900;

function buildSlides(): GalleryImage[] {
  const exteriors = featureVehicles.flatMap((vehicle) => vehicle.exterior);
  const highRes = exteriors.filter((image) => image.width >= MIN_HERO_WIDTH);
  if (highRes.length > 1) return highRes;
  if (exteriors.length > 1) return exteriors;

  return featureVehicles.flatMap((vehicle) => [
    ...vehicle.exterior,
    ...vehicle.interior,
  ]);
}

const slides = buildSlides();

/**
 * Contained hero carousel — deliberately NOT full-bleed.
 *
 * The sources top out at 900px wide. Full-bleed meant a 3.2x upscale on retina
 * and a visibly soft image. The frame is capped at 26rem (416px CSS = 832px on
 * retina; the 1.08x Ken Burns drift tops out at ~898px), so it renders at or
 * under the native 900px and stays sharp.
 *
 * If the photos are ever re-exported at 2560px+, this can go back to full-bleed.
 */
export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const go = useCallback(
    (delta: number) =>
      setCurrent((c) => (c + delta + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;

    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(id);
    // `current` is a dep so manual navigation restarts the countdown.
  }, [paused, reducedMotion, current]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Recent detailing work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="mx-auto w-full max-w-[26rem] lg:mx-0"
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-hairline shadow-card">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            aria-hidden={index !== current}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={90}
              // Matches the real frame width — never requests more.
              sizes="(max-width: 1024px) 100vw, 416px"
              className={`object-cover ${
                index === current && !reducedMotion
                  ? "motion-safe:animate-kenburns"
                  : ""
              }`}
            />
          </div>
        ))}

        {/* Bottom scrim so the controls stay legible on any slide. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-base/90 to-transparent"
        />

        {slides.length > 1 ? (
          <>
            <HeroArrow direction="prev" onClick={() => go(-1)} />
            <HeroArrow direction="next" onClick={() => go(1)} />

            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Show photo ${index + 1} of ${slides.length}`}
                  aria-current={index === current}
                  className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                    index === current
                      ? "w-7 bg-royal"
                      : "w-2 bg-chrome/60 hover:bg-chrome"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function HeroArrow({
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
      aria-label={isPrev ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-base/50 text-ink opacity-0 backdrop-blur-sm transition-opacity hover:bg-base/80 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-royal group-hover:opacity-100 ${
        isPrev ? "left-3" : "right-3"
      }`}
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
