"use client";

import { useEffect, useRef, useState } from "react";
import { PHONE_ARIA, PHONE_DISPLAY, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import { Icon, buttonClasses } from "@/components/ui";

/**
 * Site-wide floating "Call now" CTA. Rendered exactly once in the root layout,
 * so every page shows the same single bar — there are no per-page floaters.
 *
 * Visibility rules:
 * - Hidden on load; fades in after the reader scrolls past the top/hero
 *   (~60% of the first viewport), so it never covers a hero on arrival.
 * - Retracts as the footer approaches, so it never blocks the footer's dense
 *   link list or a page's end-of-page CTA band. A small bottom rootMargin
 *   pulls it back a touch early to clear those bands' buttons.
 * - Hides entirely while a full-screen overlay is open — the Housecall Pro
 *   booking modal or the gallery lightbox. Both lock body scroll
 *   (overflow-y: hidden), which is the signal we watch; the HCP
 *   `.hcp-widget--visible` container and any `[aria-modal]` are checked too as
 *   a backstop.
 *
 * Motion is CSS-only and gated behind motion-reduce:, so reduced-motion users
 * get an instant toggle with no slide. When hidden the bar is made `inert` so
 * its controls leave the tab order and the accessibility tree.
 *
 * Layout: full-width fixed bottom bar on mobile (thumb-reachable), floating
 * pill bottom-right on desktop.
 */
export function StickyCallCta() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Reveal after the first ~60% of a screen has scrolled by.
  useEffect(() => {
    const onScroll = () =>
      setScrolledPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Retract near the footer so its links (and the end-of-page CTA band just
  // above it) are never covered. The footer lives in the root layout, so this
  // node is stable across client-side navigations.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearEnd(entry.isIntersecting),
      // Fire a little before the footer to clear a preceding CTA band's buttons.
      { rootMargin: "0px 0px 15% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Hide while a full-screen overlay (HCP booking modal or gallery lightbox)
  // is open. Both lock body scroll; watching body/html style+class catches the
  // toggle in both directions.
  useEffect(() => {
    const check = () => {
      const scrollLocked =
        getComputedStyle(document.body).overflowY === "hidden";
      const hcpOpen = !!document.querySelector(".hcp-widget--visible");
      const ariaModal = !!document.querySelector('[aria-modal="true"]');
      setOverlayOpen(scrollLocked || hcpOpen || ariaModal);
    };
    check();
    const observer = new MutationObserver(check);
    const opts: MutationObserverInit = {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
    };
    observer.observe(document.body, opts);
    observer.observe(document.documentElement, opts);
    return () => observer.disconnect();
  }, []);

  const shown = scrolledPast && !nearEnd && !overlayOpen;

  // `inert` (not aria-hidden) so the off-screen controls are fully removed from
  // tab order and the a11y tree without nesting focusables inside aria-hidden.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [shown]);

  return (
    <div
      ref={ref}
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
        <BookNowButton variant="secondary" className="shrink-0 whitespace-nowrap" />
      </div>
    </div>
  );
}
