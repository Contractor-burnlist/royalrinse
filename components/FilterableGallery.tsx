"use client";

import { useMemo, useState } from "react";
import type { GalleryCategory, GalleryImage } from "@/lib/gallery";
import { LightboxGrid } from "@/components/Lightbox";

/** Fixed display order; only categories that actually have photos get a tab. */
const CATEGORY_ORDER: GalleryCategory[] = [
  "Exotic",
  "Sedans",
  "SUVs",
  "Trucks",
  "Vans",
  "Interiors",
  "Details",
];

type Filter = "All" | GalleryCategory;

export function FilterableGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<Filter>("All");

  const counts = useMemo(() => {
    const map = new Map<GalleryCategory, number>();
    for (const image of images) {
      map.set(image.category, (map.get(image.category) ?? 0) + 1);
    }
    return map;
  }, [images]);

  // "All" plus every non-empty category — an empty bucket (e.g. Sedans) never
  // shows a dead tab, and adding photos to it later brings the tab back.
  const tabs: { key: Filter; count: number }[] = [
    { key: "All", count: images.length },
    ...CATEGORY_ORDER.filter((category) => (counts.get(category) ?? 0) > 0).map(
      (category) => ({ key: category, count: counts.get(category) ?? 0 }),
    ),
  ];

  const visible = useMemo(
    () =>
      active === "All"
        ? images
        : images.filter((image) => image.category === active),
    [active, images],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter gallery by category"
        className="flex flex-wrap gap-2.5"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-chrome-bright focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                isActive
                  ? "border-transparent bg-chrome-bright text-canvas shadow-card"
                  : "border-transparent btn-metal text-chrome hover:text-ink"
              }`}
            >
              {/* Not colour alone: the active pill also carries a check. */}
              {isActive ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                >
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
              ) : null}
              {tab.key}
              <span
                className={`text-xs tabular-nums ${
                  isActive ? "text-canvas" : "text-chrome"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* A persistent status region: it outlives the filter change, so screen
          readers announce the new count. (It used to sit on the grid wrapper,
          which remounts on every change and so was never announced.) */}
      <p role="status" className="sr-only">
        Showing {visible.length} {active === "All" ? "" : `${active} `}photos
      </p>

      {/* Remounting on filter change replays a gentle fade, dropped for
          reduced-motion, where it swaps instantly. */}
      <div key={active} className="mt-8 motion-safe:animate-[fadeIn_300ms_ease-out]">
        <LightboxGrid
          images={visible}
          variant="grid"
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          tileClassName="aspect-[4/3]"
          eagerCount={8}
          // 2 cols < md, 3 cols md–lg, 4 cols >= lg — matched so tiles never
          // over-fetch and the optimizer never upscales past the source.
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
        />
      </div>
    </>
  );
}
