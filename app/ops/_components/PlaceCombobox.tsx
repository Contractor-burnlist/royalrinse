"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { PLACE_OPTIONS, placeOptionLabel } from "@/lib/ops/places";

interface Props {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Type to search, arrow keys to move, Enter to pick, Escape to close.
 * Follows the ARIA combobox pattern so screen readers announce the list.
 */
export function PlaceCombobox({ label, hint, value, onChange }: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const hintId = `${id}-hint`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(placeOptionLabel(value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // Keep the text in step when the value changes from outside (map click).
  useEffect(() => setQuery(placeOptionLabel(value)), [value]);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || query === placeOptionLabel(value)) return PLACE_OPTIONS;
    return PLACE_OPTIONS.filter((p) => p.label.toLowerCase().includes(q));
  }, [query, value]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function pick(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(placeOptionLabel(value));
    }
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-base font-semibold">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-ops-muted">
          {hint}
        </p>
      )}
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && options[active] ? `${id}-opt-${active}` : undefined}
        aria-describedby={hint ? hintId : undefined}
        autoComplete="off"
        spellCheck={false}
        placeholder="Type a city, for example Temecula"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={(e) => {
          e.target.select();
          setOpen(true);
        }}
        onClick={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          setQuery(placeOptionLabel(value));
        }}
        onKeyDown={onKeyDown}
        className="mt-2 w-full rounded-xl border border-ops-line bg-white px-4 py-3 text-base shadow-sm placeholder:text-ops-muted focus-visible:border-ops-primary"
      />
      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-[1100] mt-2 max-h-72 w-full overflow-auto rounded-xl border border-ops-line bg-white py-1 shadow-lg"
        >
          {options.length === 0 && <div className="px-4 py-3 text-ops-muted">No city found. Ask Tim.</div>}
          {options.map((option, i) => (
            <div
              key={option.value}
              id={`${id}-opt-${i}`}
              data-index={i}
              role="option"
              aria-selected={option.value === value}
              // Focus stays in the input (aria-activedescendant), so options are never tab stops.
              tabIndex={-1}
              // Pick on mouse down and keep focus in the input, so the pick is
              // not lost to blur. Keyboard picking goes through the input.
              onMouseDown={(e) => {
                e.preventDefault();
                pick(i);
              }}
              onMouseMove={() => setActive(i)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 ${
                i === active ? "bg-ops-primary-soft" : ""
              }`}
            >
              <span>{option.label}</span>
              {option.value === value && <span className="text-sm font-semibold text-ops-primary">Selected</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
