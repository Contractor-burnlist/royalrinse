"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PHONE_ARIA, nav, site, telHref } from "@/lib/site";
import { BookNowButton } from "@/components/BookNowButton";
import { Container } from "@/components/ui";

function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Royal Rinse — home">
      {/* Logo ships with its own near-black background, so it sits flush on the
          header. The border keeps the square edge from reading as an artifact. */}
      <Image
        src="/royal-logo.jpeg"
        alt="Royal Rinse mobile auto detailing"
        width={1254}
        height={1254}
        priority
        className="h-20 w-auto rounded-lg border border-hairline sm:h-28"
      />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-base/85 backdrop-blur-md">
      <Container>
        <div className="flex h-24 items-center justify-between gap-4 sm:h-32">
          <Logo />

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
