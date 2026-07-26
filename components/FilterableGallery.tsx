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
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                isActive
                  ? "border-royal bg-royal text-ink shadow-glow"
                  : "border-hairline bg-surface text-chrome hover:border-royal hover:text-ink"
              }`}
            >
              {tab.key}
              <span
                className={`text-xs tabular-nums ${
                  isActive ? "text-ink/70" : "text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Remounting on filter change replays a gentle fade — dropped for
          reduced-motion, where it swaps instantly. aria-live announces the
          count change to screen readers. */}
      <div
        key={active}
        aria-live="polite"
        className="mt-8 motion-safe:animate-[fadeIn_300ms_ease-out]"
      >
        <span className="sr-only">
          Showing {visible.length} {active === "All" ? "" : `${active} `}photos
        </span>
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
