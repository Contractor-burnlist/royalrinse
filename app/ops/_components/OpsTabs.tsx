"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface OpsTab {
  id: string;
  label: string;
  panel: ReactNode;
}

const STORAGE_KEY = "ops-tab";

/**
 * Tabs across the top of /ops (WAI-ARIA tabs pattern): arrow keys, Home and
 * End move between tabs. Every panel stays mounted and inactive ones are
 * hidden, so typed input and the follow-up timer survive a tab switch. The
 * last open tab is remembered in this browser.
 */
export function OpsTabs({ tabs }: { tabs: OpsTab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Restore after mount so the server and first client render match.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && tabs.some((t) => t.id === saved)) setActive(saved);
    } catch {
      // Storage blocked (private mode): start on the first tab.
    }
  }, [tabs]);

  function open(id: string) {
    setActive(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Not remembered, but the tab still opens.
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : e.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    open(tabs[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <>
      <div className="border-b border-ops-line bg-white">
        <div
          role="tablist"
          aria-label="Ops tools"
          className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-2 sm:flex sm:gap-2 sm:px-6"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => open(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`rounded-xl px-3 py-2.5 text-sm font-bold sm:px-4 sm:text-base ${
                  selected ? "bg-ops-primary text-white" : "text-ops-ink hover:bg-ops-surface"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
          className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6"
        >
          {tab.panel}
        </div>
      ))}
    </>
  );
}
