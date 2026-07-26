import { AGGREGATE_RATING } from "@/lib/site";
import { GoogleMark } from "@/components/GoogleMark";

/**
 * Social-proof header: the Google "G", a gold star row, and a rating line.
 *
 * The exact average and review count come from AGGREGATE_RATING in lib/site.ts,
 * which is null until the real Google Business Profile numbers are filled in —
 * so nothing is fabricated. Until then it reads "Rated 5 stars on Google" (the
 * curated reviews are all 5 stars) without a made-up count.
 */
export function GoogleRatingSummary({ className = "" }: { className?: string }) {
  const rating = AGGREGATE_RATING;
  const displayValue = rating ? rating.ratingValue.toFixed(1) : "5";
  const starCount = rating ? Math.round(rating.ratingValue) : 5;

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      <GoogleMark className="h-6 w-6" />
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`${displayValue} out of 5 stars on Google`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={`h-5 w-5 ${i < starCount ? "text-amber-400" : "text-chrome/25"}`}
          >
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
          </svg>
        ))}
      </div>
      <p className="text-sm font-semibold text-chrome">
        Rated {displayValue} stars on Google
        {rating ? (
          <span className="text-muted"> · {rating.reviewCount} reviews</span>
        ) : null}
      </p>
    </div>
  );
}
