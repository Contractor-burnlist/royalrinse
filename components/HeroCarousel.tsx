"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { featureVehicles, type GalleryImage } from "@/lib/gallery";

const AUTO_ADVANCE_MS = 5000;

/**
 * Full-bleed is the most-upscaled surface on the site, so the hero uses only
 * the highest-resolution sources. The 576px shots would need a 5x upscale here;
 * the 900px ones need 3.2x. Still not truly sharp — the sources are too small
 * for full-bleed (see lib/gallery.ts) — but this is the best available.
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
 * Full-bleed cinematic hero. Photos run edge to edge behind the content; a
 * gradient scrim from the bottom-left keeps the headline and CTAs legible over
 * whatever slide is showing.
 */
export function HeroCarousel({ children }: { children: ReactNode }) {
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
    <section
      role="group"
      aria-roledescription="carousel"
      aria-label="Recent detailing work"
      // Pull up under the sticky header so photos run to the very top.
      // Slightly taller than before: the panel now starts below the header
      // divider, so the extra height keeps the photo from shrinking.
      className="relative -mt-24 flex min-h-[80vh] items-end overflow-hidden sm:-mt-32 lg:min-h-[92vh]"
    >
      {/*
        Two layers per slide:

        1. An ambient backdrop — the same photo, blown up and heavily blurred.
           It IS upscaled, but it's blurred on purpose, so nobody can tell. It
           fills the frame edge to edge and keeps the cinematic full-bleed feel.

        2. The real photo, object-CONTAIN. The whole frame is visible (no crop)
           and it renders SMALLER than its 900px source, so it is genuinely
           sharp — no upscaling at all.
      */}
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
            alt=""
            aria-hidden="true"
            fill
            quality={40}
            sizes="100vw"
            className="scale-125 object-cover blur-2xl brightness-[0.4] saturate-[0.85]"
          />

          {/*
            The hero is pulled up under the sticky header (-mt-24 / -mt-32), so
            the panel's top is anchored to the header's height — top-24 on
            mobile, top-32 from `sm` up — which lands it exactly on the divider
            line beneath the nav instead of running behind it.

            top + bottom are both set, so the height is derived from the section
            and `aspect-[3/4]` derives the width from that. It can't overflow.
          */}
          <div className="absolute right-0 top-24 bottom-8 w-full sm:top-32 lg:right-[6%] lg:bottom-10 lg:w-auto lg:overflow-hidden lg:rounded-2xl lg:border lg:border-chrome/25 lg:shadow-2xl lg:aspect-[3/4]">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="(max-width: 1024px) 100vw, 600px"
              className={`object-contain lg:object-cover ${
                index === current && !reducedMotion
                  ? "motion-safe:animate-kenburns"
                  : ""
              }`}
            />
          </div>
        </div>
      ))}

      {/* Scrim keeps the copy legible over the backdrop. Weighted left so the
          contained photo on the right stays clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-base/40 lg:via-base/60 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent"
      />

      {/* min-w-0: as a flex item this would otherwise size to its widest child
          and push the headline past the viewport on mobile. */}
      <div
        className="relative w-full min-w-0 pb-20 pt-40 sm:pb-24 sm:pt-48"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {children}

        {slides.length > 1 ? (
          <div className="mx-auto mt-14 w-full max-w-container px-5 sm:px-8">
            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Show photo ${index + 1} of ${slides.length}`}
                  aria-current={index === current}
                  className={`h-1 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                    index === current
                      ? "w-10 bg-royal"
                      : "w-5 bg-chrome/40 hover:bg-chrome"
                  }`}
                />
              ))}

              {/* Kept beside the dots on the left so they never sit on top of
                  the photo panel. */}
              <span className="ml-4 flex gap-2">
                <HeroArrow direction="prev" onClick={() => go(-1)} />
                <HeroArrow direction="next" onClick={() => go(1)} />
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-base/40 text-chrome backdrop-blur-sm transition-colors hover:border-chrome/50 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
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
