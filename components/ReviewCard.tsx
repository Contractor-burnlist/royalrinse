import type { Review } from "@/lib/reviews";
import { GoogleMark } from "@/components/GoogleMark";

/**
 * Google-styled review card: circular initial avatar, reviewer name, a gold
 * star row, the review text, a muted vehicle subline, and a small Google "G"
 * so it's clearly framed as a Google review. These are curated (not a live
 * feed) — the "G" plus the "See all on Google" links keep that honest.
 */

// Google-like avatar colors, picked deterministically so a name always maps to
// the same color.
const AVATAR_COLORS = [
  "#4285F4",
  "#0F9D58",
  "#DB4437",
  "#F4B400",
  "#AB47BC",
  "#00838F",
  "#E8710A",
  "#5C6BC0",
];

function avatarColor(name: string): string {
  const sum = name
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function StarRow({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${clamped} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-4 w-4 ${i < clamped ? "text-amber-400" : "text-chrome/25"}`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const rating = review.rating ?? 5;
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-xl border border-hairline bg-surface p-6 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
            style={{ backgroundColor: avatarColor(review.name) }}
          >
            {initial}
          </span>
          <div className="min-w-0">
            <figcaption className="truncate text-sm font-semibold text-ink">
              {review.name}
            </figcaption>
            <div className="mt-1">
              <StarRow rating={rating} />
            </div>
          </div>
        </div>
        {/* Signals these are Google reviews. */}
        <GoogleMark className="h-5 w-5 shrink-0 opacity-90" />
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {review.text}
      </blockquote>

      {review.vehicle ? (
        <p className="mt-4 border-t border-hairline pt-3 text-xs font-medium text-muted">
          {review.vehicle}
        </p>
      ) : null}
    </figure>
  );
}
