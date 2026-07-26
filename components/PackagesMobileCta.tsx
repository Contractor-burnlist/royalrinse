"use client";

import { useEffect, useState } from "react";
import { PHONE_ARIA, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";

/**
 * Floating "Book Now" bar for /packages on mobile only (lg:hidden), so the CTA
 * is always reachable while scrolling a long page.
 *
 * It appears once the user has scrolled past the hero, and hides once the
 * page's final CTA band reaches the viewport — that band carries its own
 * buttons, and letting the floating bar sit over it (and the footer below)
 * would cover their links. The sentinel it watches is rendered at the top of
 * that band.
 *
 * Visibility is computed from the sentinel's position rather than an
 * IntersectionObserver: once the sentinel's top passes the viewport bottom it
 * stays past it as you scroll into the footer, so "at end" latches instead of
 * flickering back on the way down. Entrance/exit motion is behind motion-safe:,
 * so reduced-motion users just get the bar toggled with no slide.
 */
export function PackagesMobileCta({ sentinelId }: { sentinelId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after the first screen so it doesn't cover the hero on load.
      const pastHero = window.scrollY > 480;

      const sentinel = document.getElementById(sentinelId);
      // "At end" the moment the sentinel enters from the bottom, and it stays
      // true as its top scrolls up past the viewport into the footer.
      const atEnd = sentinel
        ? sentinel.getBoundingClientRect().top <= window.innerHeight
        : false;

      setVisible(pastHero && !atEnd);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sentinelId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden motion-safe:transition-all motion-safe:duration-300 ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 motion-safe:translate-y-4"
      }`}
    >
      <div className="border-t border-hairline bg-base/85 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <BookNowButton className="flex-1">Book Now</BookNowButton>
          <a
            href={telHref}
            aria-label={PHONE_ARIA}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface text-chrome transition-colors hover:border-chrome/40 hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M4 5c0 8.284 6.716 15 15 15a1 1 0 0 0 1-1v-3a1 1 0 0 0-.757-.97l-3.5-.875a1 1 0 0 0-1.02.38l-.83 1.108a11.05 11.05 0 0 1-4.24-4.24l1.108-.83a1 1 0 0 0 .38-1.02l-.875-3.5A1 1 0 0 0 8 5H5a1 1 0 0 0-1 1Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/** The mobile-CTA sentinel and its id, kept together so the page can't mistype it. */
export const PACKAGES_CTA_SENTINEL = "packages-cta-end";

export function PackagesCtaSentinel() {
  return <div id={PACKAGES_CTA_SENTINEL} aria-hidden="true" className="h-px w-full" />;
}
