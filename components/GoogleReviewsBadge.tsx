import { GOOGLE_REVIEWS_URL } from "@/lib/site";
import { GoogleMark } from "@/components/GoogleMark";

/** A row of five gold (amber) stars — the shared review-star visual. */
export function GoldStars({
  className = "h-4 w-4",
  label = "5 out of 5 stars",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className="inline-flex gap-0.5 text-amber-400"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={className}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Clickable social-proof badge: gold stars + Google "G" + label, linking to the
 * verified Google Business Profile in a new tab. Reused across the hero chip and
 * the under-CTA strip so the "30+ five-star Google reviews" claim renders
 * identically everywhere.
 */
export function GoogleReviewsBadge({
  children,
  className = "",
  starClassName = "h-3.5 w-3.5",
}: {
  children: React.ReactNode;
  className?: string;
  starClassName?: string;
}) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${className}`}
    >
      <GoldStars className={starClassName} />
      <GoogleMark className="h-4 w-4" />
      <span>{children}</span>
      <span className="sr-only">(opens Google in a new tab)</span>
    </a>
  );
}
