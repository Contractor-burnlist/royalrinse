import {
  AGGREGATE_RATING,
  REVIEW_COUNT_DISPLAY,
  REVIEW_RATING_DISPLAY,
} from "@/lib/site";
import { GoogleMark } from "@/components/GoogleMark";
import { GoldStars } from "@/components/GoogleReviewsBadge";

/**
 * Social-proof header: the Google "G", a gold star row, and the rating line —
 * "Rated 5.0 on Google · 30+ reviews". The numbers come from AGGREGATE_RATING /
 * the REVIEW_*_DISPLAY strings in lib/site.ts (the schema uses the same source).
 */
export function GoogleRatingSummary({ className = "" }: { className?: string }) {
  if (!AGGREGATE_RATING) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      <GoogleMark className="h-6 w-6" />
      <GoldStars
        className="h-5 w-5"
        label={`${REVIEW_RATING_DISPLAY} out of 5 stars on Google`}
      />
      <p className="text-sm font-semibold text-chrome">
        Rated {REVIEW_RATING_DISPLAY} on Google
        <span className="text-muted"> · {REVIEW_COUNT_DISPLAY} reviews</span>
      </p>
    </div>
  );
}
