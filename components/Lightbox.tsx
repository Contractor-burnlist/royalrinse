"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

/**
 * Click-to-enlarge photo grid.
 *
 * No captions anywhere — not under the tiles, not in the modal. Alt text stays
 * on the <img> for screen readers and SEO but is never shown.
 *
 * variant "grid":    uniform cropped tiles.
 * variant "masonry": natural aspect ratios flowed into CSS columns.
 */
export function LightboxGrid({
  images,
  variant = "grid",
  className = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  tileClassName = "aspect-[4/3]",
  eagerCount = 0,
  // Must match the REAL rendered column width, or the browser fetches a file
  // that's too small and the tile looks soft. Default matches
  // `columns-2 lg:columns-3 xl:columns-4`.
  sizes = "(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw",
}: {
  images: GalleryImage[];
  variant?: "grid" | "masonry";
  className?: string;
  tileClassName?: string;
  eagerCount?: number;
  sizes?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const open = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setOpenIndex(index);
  };

  useEffect(() => {
    if (openIndex === null) lastFocused.current?.focus();
  }, [openIndex]);

  const active = openIndex === null ? null : images[openIndex];

  const tileClasses =
    "group relative block w-full overflow-hidden rounded-xl border border-hairline bg-surface shadow-card transition-colors hover:border-royal focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base";

  return (
    <>
      {variant === "masonry" ? (
        <div className={className}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => open(index)}
              className={`${tileClasses} mb-4 break-inside-avoid`}
            >
              {/* width/height are the real file dimensions, so the tile keeps
                  the photo's native ratio — no crop, no squish. */}
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={index < eagerCount ? "eager" : "lazy"}
                priority={index < eagerCount}
                quality={90}
                sizes={sizes}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="sr-only">Enlarge photo</span>
            </button>
          ))}
        </div>
      ) : (
        <ul className={className}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => open(index)}
                className={`${tileClasses} ${tileClassName}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading={index < eagerCount ? "eager" : "lazy"}
                  priority={index < eagerCount}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="sr-only">Enlarge photo</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          className="fixed inset-0 z-[100] flex animate-[fadeIn_260ms_ease-out] items-center justify-center bg-base/97 p-4 backdrop-blur-xl sm:p-6"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface text-ink transition-colors hover:border-chrome/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {images.length > 1 ? (
            <>
              <LightboxNav
                direction="prev"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
              />
              <LightboxNav
                direction="next"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
              />
            </>
          ) : null}

          {/* Image only — no caption, no vehicle label. */}
          <div
            key={active.src}
            onClick={(event) => event.stopPropagation()}
            className="relative h-[88vh] w-full max-w-6xl animate-[fadeIn_320ms_ease-out]"
          >
            {/* object-contain: shows the whole frame at its true ratio. */}
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="rounded-2xl object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function LightboxNav({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: (event: React.MouseEvent) => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-hairline bg-surface text-ink transition-colors hover:border-chrome/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal ${
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
        className="h-5 w-5"
      >
        <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
