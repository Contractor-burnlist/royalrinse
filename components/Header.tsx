"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site, telHref } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal font-display text-base font-bold text-ink shadow-glow">
        R
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink">
        Royal Rinse
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-base/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
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
              className="text-sm font-semibold text-chrome transition-colors hover:text-ink"
            >
              {site.phone}
            </a>
            <ButtonLink href="/book" className="px-5 py-2.5">
              Book Now
            </ButtonLink>
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
                className="px-3 text-sm font-semibold text-chrome"
                onClick={() => setOpen(false)}
              >
                Call {site.phone}
              </a>
              <ButtonLink href="/book" onClick={() => setOpen(false)}>
                Book Now
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
