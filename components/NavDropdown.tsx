"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { NavMenuConfig } from "@/lib/navMenus";

/**
 * One dropdown component shared by every nav item that has a menu (Services,
 * Packages, Service Area), driven entirely by a NavMenuConfig. The top label
 * still links to the item's overview page; a chevron button toggles the panel.
 *
 * This is the DISCLOSURE pattern (a button with aria-expanded that shows a list
 * of links), not an ARIA menu. The menu role promises application-style
 * keyboard behaviour and hides the links' own semantics from screen readers;
 * for site navigation a plain list of links behind a toggle is the recommended
 * shape.
 */

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

const itemClass =
  "block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-charcoal hover:text-ink focus:outline-none focus-visible:bg-charcoal focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-royal-light";

const footerItemClass = `${itemClass} font-semibold text-royal-light hover:text-ink`;

const sectionLabelClass =
  "px-3 pb-1 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-royal-light";

/**
 * Desktop dropdown. Opens on hover for pointer users and on click, Enter, Space
 * or ArrowDown from the chevron button for keyboard users. Escape closes it and
 * returns focus to the button. While closed the panel is `invisible`, which
 * removes its links from the tab order and the accessibility tree.
 */
export function NavDropdown({ config }: { config: NavMenuConfig }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
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
    Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []);

  const onTriggerKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      // The panel is `invisible` until the re-render; focus after it shows.
      requestAnimationFrame(() => menuItems()[0]?.focus());
    }
  };

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

  const menuId = `${config.id}-menu`;
  // Literal classes so Tailwind's scanner (which doesn't read /lib) generates them.
  const panelWidthClass =
    config.panelWidth === "narrow" ? "w-[15rem]" : "w-[20rem]";

  return (
    // The hover handlers are a pointer convenience only; the chevron button is
    // the real control, so the wrapper itself needs no role or key handler.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={config.href}
          className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
          onClick={close}
        >
          {config.label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${config.ariaLabel} submenu`}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={onTriggerKeyDown}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-light"
        >
          <Chevron
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Arrow keys are an extra on top of Tab, which already walks the links. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        id={menuId}
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
        // Transparent pt bridges the gap to the trigger so hover never drops.
        className={`absolute left-0 top-full z-50 pt-3 motion-safe:transition-all motion-safe:duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div
          className={`${panelWidthClass} rounded-2xl border border-hairline bg-surface p-2 shadow-2xl`}
        >
          {config.groups.map((group, groupIndex) => (
            <div key={group.label ?? groupIndex}>
              {groupIndex > 0 ? (
                <div className="my-2 border-t border-hairline" />
              ) : null}
              {group.label ? (
                <p className={sectionLabelClass}>{group.label}</p>
              ) : null}
              <ul
                aria-label={group.label ?? config.ariaLabel}
                className={
                  group.columns === 2 ? "grid grid-cols-2 gap-0.5" : ""
                }
              >
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className={itemClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="my-2 border-t border-hairline" />
          <Link
            href={config.footer.href}
            onClick={close}
            className={footerItemClass}
          >
            {config.footer.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile version: a tap-to-expand accordion inside the hamburger menu (no hover
 * on touch). `onNavigate` closes the whole mobile menu when a sub-link is
 * tapped. Renders every group single-column for narrow screens.
 */
export function NavDropdownMobile({
  config,
  onNavigate,
}: {
  config: NavMenuConfig;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const submenuId = `${config.id}-submenu`;

  const linkClass =
    "block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink";

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={submenuId}
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        {config.label}
        <Chevron
          className={`h-4 w-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded ? (
        <div id={submenuId} className="mb-1 mt-1 space-y-0.5 pl-3">
          {config.groups.map((group, groupIndex) => (
            <div key={group.label ?? groupIndex}>
              {groupIndex > 0 ? (
                <div className="my-2 border-t border-hairline" />
              ) : null}
              {group.label ? (
                <p className={sectionLabelClass}>{group.label}</p>
              ) : null}
              <ul aria-label={group.label ?? config.ariaLabel}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="my-2 border-t border-hairline" />
          <Link
            href={config.footer.href}
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-royal-light transition-colors hover:bg-surface hover:text-ink"
          >
            {config.footer.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
