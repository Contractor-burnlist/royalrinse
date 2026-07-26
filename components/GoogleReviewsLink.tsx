import { GOOGLE_REVIEWS_URL } from "@/lib/site";
import { GoogleMark } from "@/components/GoogleMark";

/**
 * Sends people to the Google Business Profile — either for the full review list
 * ("See all reviews on Google") or to leave one. The curated cards stay on-site;
 * this is the trusted exit to Google. Opens in a new tab.
 *
 * variant "link"   — inline royal text link (default).
 * variant "button" — a prominent bordered button for section CTAs.
 */
export function GoogleReviewsLink({
  children = "See all reviews on Google",
  variant = "link",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "link" | "button";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base";
  const styles =
    variant === "button"
      ? "rounded-xl border border-hairline bg-surface px-5 py-3 text-sm text-ink hover:border-royal hover:bg-charcoal"
      : "text-sm text-royal hover:text-chrome";

  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <GoogleMark className="h-4 w-4" />
      {children}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens Google in a new tab)</span>
    </a>
  );
}
