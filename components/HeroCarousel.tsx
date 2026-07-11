"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { featureVehicles, type GalleryImage } from "@/lib/gallery";
import { Container } from "@/components/ui";

const AUTO_ADVANCE_MS = 5000;

/**
 * Hero slides use only the highest-resolution sources. The 576px shots would
 * need an even harsher upscale than the 900px ones (see lib/gallery.ts).
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
 * Stacked, centered hero: centered copy on top, a large cinematic carousel
 * beneath it. An ambient blurred backdrop of the active slide fills the frame
 * behind everything, so the section still bleeds edge to edge.
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

  // Auto-advance. `current` is a dep so manual navigation restarts the count.
  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;

    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(id);
  }, [paused, reducedMotion, current]);

  // Hover/focus pause is scoped to the carousel itself — never the whole
  // section, or a cursor resting anywhere on screen would freeze it.
  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  return (
    <section
      // Pulled up under the sticky header so the backdrop reaches the top.
      className="relative -mt-24 overflow-hidden border-b border-hairline sm:-mt-32"
    >
      {/* Ambient blurred backdrop — upscaled, but blurred on purpose. */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            quality={40}
            sizes="100vw"
            className="scale-125 object-cover blur-2xl brightness-[0.35] saturate-[0.85]"
          />
        </div>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-base/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent"
      />

      <div className="relative z-10 pb-20 pt-36 sm:pb-24 sm:pt-44">
        {/* Centered copy */}
        <Container>
          <div className="mx-auto max-w-3xl text-center">{children}</div>
        </Container>

        {/* Large centered carousel */}
        <div
          className="mx-auto mt-14 w-[92%] max-w-6xl sm:mt-16"
          role="group"
          aria-roledescription="carousel"
          aria-label="Recent detailing work"
          {...pauseHandlers}
        >
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-chrome/25 shadow-2xl sm:aspect-[16/9]">
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
                  // Matches the real rendered width of the card.
                  sizes="(max-width: 640px) 92vw, (max-width: 1152px) 92vw, 1152px"
                  style={{ objectPosition: "center" }}
                  className={`object-cover ${
                    index === current && !reducedMotion
                      ? "motion-safe:animate-kenburns"
                      : ""
                  }`}
                />
              </div>
            ))}

            {slides.length > 1 ? (
              <>
                <HeroArrow direction="prev" onClick={() => go(-1)} />
                <HeroArrow direction="next" onClick={() => go(1)} />
              </>
            ) : null}
          </div>

          {/* Dots, centered under the image */}
          {slides.length > 1 ? (
            <div className="mt-6 flex items-center justify-center gap-2.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Show photo ${index + 1} of ${slides.length}`}
                  aria-current={index === current}
                  className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                    index === current
                      ? "w-8 bg-royal"
                      : "w-2.5 bg-chrome/40 hover:bg-chrome"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
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
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-base/50 text-ink opacity-0 backdrop-blur-sm transition-opacity hover:bg-base/80 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-royal group-hover:opacity-100 ${
        isPrev ? "left-4" : "right-4"
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
