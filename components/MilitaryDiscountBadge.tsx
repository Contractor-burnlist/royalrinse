/**
 * Military discount badge.
 *
 * "10% Military Discount" is always the primary line — the amount is the point.
 * The "Thank you for your service" subline appears on the md (footer) variant;
 * the sm variant runs in the trust bar where a second line would crowd the row.
 *
 * Inline SVG rather than lucide-react — the project has no icon dependency and
 * this matches the existing Icon set's stroke weight and tokens.
 */

function ChevronBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Service ribbon / chevrons */}
      <path d="M4 7l8 5 8-5" />
      <path d="M4 13l8 5 8-5" />
    </svg>
  );
}

export function MilitaryDiscountBadge({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  if (size === "sm") {
    return (
      <span
        className={`inline-flex items-center justify-center gap-2 edge-chrome rounded-xl bg-canvas/70 px-3 py-1.5 text-center text-sm font-semibold text-ink ${className}`}
      >
        <ChevronBadge className="h-4 w-4 shrink-0 text-chrome-bright" />
        10% Military Discount
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3.5 edge-chrome rounded-xl bg-canvas/70 px-4 py-3 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chrome/10 text-chrome">
        <ChevronBadge className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-sm font-bold tracking-tight text-ink">
          10% Military Discount
        </span>
        <span className="mt-0.5 block text-xs text-muted">
          Thank you for your service
        </span>
      </span>
    </div>
  );
}
