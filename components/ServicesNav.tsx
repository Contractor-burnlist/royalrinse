"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  ceramicCoating,
  maintenancePlan,
  rvDetailing,
  tiers,
} from "@/lib/services";

type MenuLink = { label: string; href: string };

/**
 * Dropdown contents, derived from the services data so labels/slugs stay in
 * sync with the detail pages. `packages` are the five tiers plus ceramic
 * coating; `more` is the secondary menu. Add-Ons has no detail page — it links
 * to the #add-ons section on /services.
 */
const packageLinks: MenuLink[] = [
  ...tiers.map((tier) => ({ label: tier.name, href: `/services/${tier.slug}` })),
  { label: ceramicCoating.name, href: `/services/${ceramicCoating.slug}` },
];

const moreLinks: MenuLink[] = [
  { label: "Add-Ons", href: "/services#add-ons" },
  { label: maintenancePlan.name, href: `/services/${maintenancePlan.slug}` },
  { label: rvDetailing.name, href: `/services/${rvDetailing.slug}` },
];

const Chevron = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const menuItemClass =
  "block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-charcoal hover:text-ink focus:bg-charcoal focus:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-royal";

const sectionLabelClass =
  "px-3 pb-1 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-royal";

/**
 * Desktop "Services" nav item: a dropdown that opens on hover and on
 * focus/click, while the "Services" label itself still links to /services.
 */
export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  // Escape closes and returns focus to the trigger — but focusing the trigger
  // (inside the wrapper) would fire onFocus and reopen the menu. This flag
  // suppresses that one reopen.
  const suppressFocusOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Outside-click and Escape (Escape returns focus to the trigger).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        suppressFocusOpen.current = true;
        triggerRef.current?.focus();
        setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 0);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Small close delay so crossing from the trigger to the panel never flickers.
  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const menuItems = () =>
    Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );

  // ArrowDown from the trigger drops focus into the first item (which opens the
  // menu via the wrapper's onFocus).
  const onTriggerKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItems()[0]?.focus();
    }
  };

  // Roving arrow-key navigation inside the panel.
  const onPanelKeyDown = (event: ReactKeyboardEvent) => {
    const items = menuItems();
    if (!items.length) return;
    const index = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        (items[index + 1] ?? items[0]).focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        (items[index - 1] ?? items[items.length - 1]).focus();
        break;
      case "Home":
        event.preventDefault();
        items[0].focus();
        break;
      case "End":
        event.preventDefault();
        items[items.length - 1].focus();
        break;
    }
  };

  const tabIndex = open ? 0 : -1;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={() => {
        if (!suppressFocusOpen.current) setOpen(true);
      }}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href="/services"
          className="text-sm font-medium text-muted transition-colors hover:text-ink"
          onClick={close}
        >
          Services
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label="Toggle services menu"
          onClick={() => setOpen((value) => !value)}
          onKeyDown={onTriggerKeyDown}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
        >
          <Chevron
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="services-menu"
        role="menu"
        aria-label="Services"
        aria-hidden={!open}
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
        // Transparent pt bridges the gap to the trigger so hover never drops.
        className={`absolute left-0 top-full z-50 pt-3 motion-safe:transition-all motion-safe:duration-200 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="w-[20rem] rounded-2xl border border-hairline bg-surface p-2 shadow-2xl">
          <p className={sectionLabelClass}>Packages</p>
          <div className="grid grid-cols-2 gap-0.5">
            {packageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                tabIndex={tabIndex}
                onClick={close}
                className={menuItemClass}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="my-2 border-t border-hairline" />

          <p className={sectionLabelClass}>More</p>
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              tabIndex={tabIndex}
              onClick={close}
              className={menuItemClass}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/services"
            role="menuitem"
            tabIndex={tabIndex}
            onClick={close}
            className={`${menuItemClass} font-semibold text-royal hover:text-ink`}
          >
            View all services →
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile "Services" item: a tap-to-expand accordion inside the hamburger menu,
 * since there's no hover on touch. `onNavigate` closes the whole mobile menu
 * when a sub-link is tapped.
 */
export function ServicesMobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="services-submenu"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        Services
        <Chevron
          className={`h-4 w-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded ? (
        <div id="services-submenu" className="mb-1 mt-1 space-y-0.5 pl-3">
          <p className={sectionLabelClass}>Packages</p>
          {packageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 border-t border-hairline" />

          <p className={sectionLabelClass}>More</p>
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/services"
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-royal transition-colors hover:bg-surface hover:text-ink"
          >
            View all services →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
