"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

/**
 * Click-to-enlarge grid. Renders its own modal so any page can hand it a list
 * of images and get keyboard-navigable enlargement for free.
 */
export function LightboxGrid({
  images,
  className = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  tileClassName = "aspect-[4/3]",
  priorityCount = 0,
}: {
  images: GalleryImage[];
  className?: string;
  tileClassName?: string;
  priorityCount?: number;
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
    // Freeze the page behind the modal.
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

  // Restore focus to the thumbnail that opened the modal.
  useEffect(() => {
    if (openIndex === null) lastFocused.current?.focus();
  }, [openIndex]);

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className={className}>
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => open(index)}
              className={`group relative w-full overflow-hidden rounded-xl border border-hairline bg-surface shadow-card transition-colors hover:border-royal focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${tileClassName}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={index < priorityCount ? "eager" : "lazy"}
                priority={index < priorityCount}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="sr-only">Enlarge photo</span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base/95 p-4 backdrop-blur-sm sm:p-8"
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

          <figure
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="rounded-xl object-contain"
              />
            </div>
            <figcaption className="max-w-2xl text-center text-sm text-muted">
              {active.alt}
            </figcaption>
          </figure>
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
