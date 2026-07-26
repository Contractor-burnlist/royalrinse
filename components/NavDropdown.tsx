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
  "block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-charcoal hover:text-ink focus:bg-charcoal focus:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-royal";

const footerItemClass = `${itemClass} font-semibold text-royal hover:text-ink`;

const sectionLabelClass =
  "px-3 pb-1 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-royal";

/** Desktop dropdown: hover- and focus/click-openable, keyboard accessible. */
export function NavDropdown({ config }: { config: NavMenuConfig }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  // Escape returns focus to the trigger, which sits inside the wrapper and
  // would re-fire onFocus and reopen the menu. This flag suppresses that.
  const suppressFocusOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

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

  const onTriggerKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItems()[0]?.focus();
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

  const tabIndex = open ? 0 : -1;
  const menuId = `${config.id}-menu`;
  // Literal classes so Tailwind's scanner (which doesn't read /lib) generates them.
  const panelWidthClass = config.panelWidth === "narrow" ? "w-[15rem]" : "w-[20rem]";

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
          href={config.href}
          className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
          onClick={close}
        >
          {config.label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Toggle ${config.ariaLabel} menu`}
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
        id={menuId}
        role="menu"
        aria-label={config.ariaLabel}
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
              <div className={group.columns === 2 ? "grid grid-cols-2 gap-0.5" : ""}>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    tabIndex={tabIndex}
                    onClick={close}
                    className={itemClass}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="my-2 border-t border-hairline" />
          <Link
            href={config.footer.href}
            role="menuitem"
            tabIndex={tabIndex}
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
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="my-2 border-t border-hairline" />
          <Link
            href={config.footer.href}
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-royal transition-colors hover:bg-surface hover:text-ink"
          >
            {config.footer.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
