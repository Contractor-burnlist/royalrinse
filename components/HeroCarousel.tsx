"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { featureVehicles, type GalleryImage } from "@/lib/gallery";

const AUTO_ADVANCE_MS = 5000;

/**
 * Strongest exterior shots across every feature vehicle. If that somehow yields
 * a single image, fall back to exterior + interior so the carousel always has
 * something to rotate through.
 */
function buildSlides(): GalleryImage[] {
  const exteriors = featureVehicles.flatMap((vehicle) => vehicle.exterior);
  if (exteriors.length > 1) return exteriors;

  return featureVehicles.flatMap((vehicle) => [
    ...vehicle.exterior,
    ...vehicle.interior,
  ]);
}

const slides = buildSlides();

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
    // `current` is a dep so manual navigation restarts the 5s countdown rather
    // than advancing again a moment later.
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
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline shadow-card lg:aspect-[5/4]"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== current}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {slides.length > 1 ? (
        <>
          <HeroArrow direction="prev" onClick={() => go(-1)} />
          <HeroArrow direction="next" onClick={() => go(1)} />

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show photo ${index + 1} of ${slides.length}`}
                aria-current={index === current}
                className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                  index === current
                    ? "w-6 bg-royal"
                    : "w-2 bg-chrome/50 hover:bg-chrome"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
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
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-hairline bg-base/70 text-ink opacity-0 backdrop-blur-sm transition-opacity hover:bg-base/90 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-royal group-hover:opacity-100 ${
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
        className="h-5 w-5"
      >
        <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
