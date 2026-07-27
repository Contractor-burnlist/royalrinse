"use client";

import { useEffect, useState } from "react";
import { PHONE_ARIA, PHONE_DISPLAY, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import { Icon, buttonClasses } from "@/components/ui";

/**
 * A floating "Call now" CTA that follows the reader down a blog post.
 *
 * - Hidden on load; fades in only after the reader scrolls past the post
 *   header (REVEAL_AFTER px), so it doesn't compete with the title.
 * - Bottom bar on mobile (thumb-reachable), floating pill bottom-right on
 *   desktop.
 * - Retracts again once the end-of-article CTA band (identified by
 *   `hideNearId`) scrolls into view, so it never sits on top of that band or
 *   the footer, and never fights the HCP booking modal.
 * - Motion is CSS-only and gated behind `motion-safe:` / `motion-reduce:`, so
 *   a reader with reduced-motion enabled simply gets an instant appear.
 */
const REVEAL_AFTER = 450;

export function StickyCallCta({ hideNearId }: { hideNearId?: string }) {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > REVEAL_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Retract near the end of the page. Watch BOTH the end-of-article CTA band
    // and the footer: at the very bottom the CTA band scrolls above the
    // viewport, so the footer is what keeps the bar tucked away down there.
    const targets = [
      hideNearId ? document.getElementById(hideNearId) : null,
      document.querySelector("footer"),
    ].filter(Boolean) as Element[];
    if (!targets.length) return;

    const seen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) seen.set(entry.target, entry.isIntersecting);
      let anyVisible = false;
      seen.forEach((visible) => {
        if (visible) anyVisible = true;
      });
      setNearEnd(anyVisible);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [hideNearId]);

  const shown = scrolledPast && !nearEnd;

  return (
    <div
      // aria-hidden while hidden so it's not a focus trap off-screen.
      aria-hidden={!shown}
      className={[
        "fixed z-40 transition-all duration-300 ease-out motion-reduce:transition-none",
        "bottom-0 inset-x-0 sm:bottom-6 sm:right-6 sm:left-auto sm:inset-x-auto",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 border-t border-hairline bg-base/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(0,0,0,0.45)] backdrop-blur sm:rounded-2xl sm:border sm:border-chrome/20 sm:px-3 sm:py-3 sm:pb-3 sm:shadow-2xl">
        <a
          href={telHref}
          aria-label={PHONE_ARIA}
          className={buttonClasses("primary", "flex-1 whitespace-nowrap sm:flex-none")}
        >
          <Icon name="phone" className="h-4 w-4" />
          Call {PHONE_DISPLAY}
        </a>
        <BookNowButton
          variant="secondary"
          className="shrink-0 whitespace-nowrap"
        />
      </div>
    </div>
  );
}
