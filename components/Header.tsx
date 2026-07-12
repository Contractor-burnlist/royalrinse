"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PHONE_ARIA, nav, site, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import { Container } from "@/components/ui";

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link
      href="/"
      // `group` drives the hover lift on the image.
      className="group flex items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      aria-label="Royal Rinse — home"
    >
      {/* Logo ships with its own near-black background, so it sits flush on the
          header. The border keeps the square edge from reading as an artifact.

          Source is 1254x1254 — sharp to ~627px CSS on retina, so these sizes are
          nowhere near the resolution ceiling.

          Every motion (entrance, hover scale, glow) is behind motion-safe:, so
          reduced-motion users get the same larger logo, just static. */}
      <Image
        src="/royal-logo.jpeg"
        alt="Royal Rinse mobile auto detailing"
        width={1254}
        height={1254}
        priority
        sizes="160px"
        className={`w-auto rounded-xl border border-hairline transition-[height,transform,filter,box-shadow] duration-300 ease-out motion-safe:animate-logo-in motion-safe:group-hover:scale-[1.05] motion-safe:group-hover:border-chrome/40 motion-safe:group-hover:brightness-110 motion-safe:group-hover:shadow-glow ${
          compact ? "h-20 sm:h-24" : "h-24 sm:h-32"
        }`}
      />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Near-transparent over the hero photo; solid once the user scrolls past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-hairline bg-base/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-gradient-to-b from-base/80 via-base/40 to-transparent"
      }`}
    >
      <Container>
        {/* Bar grows with the logo so it never crowds the nav: the logo is
            ~16px shorter than the bar at each state, keeping even breathing
            room above and below. */}
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-500 ${
            solid ? "h-24 sm:h-28" : "h-28 sm:h-36"
          }`}
        >
          <Logo compact={solid} />

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={telHref}
              aria-label={PHONE_ARIA}
              className="text-sm font-semibold text-chrome transition-colors hover:text-ink"
            >
              {site.phone}
            </a>
            <BookNowButton className="px-5 py-2.5" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hairline text-ink lg:hidden"
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
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-hairline bg-charcoal lg:hidden">
          <Container className="py-5">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex flex-col gap-3 border-t border-hairline pt-5">
              <a
                href={telHref}
                aria-label={PHONE_ARIA}
                className="px-3 text-sm font-semibold text-chrome"
                onClick={() => setOpen(false)}
              >
                Call {site.phone}
              </a>
              <BookNowButton onClick={() => setOpen(false)} />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
