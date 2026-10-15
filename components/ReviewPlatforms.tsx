import {
  FACEBOOK_URL,
  GOOGLE_REVIEWS_URL,
  THUMBTACK_URL,
  TOTAL_REVIEW_COUNT_DISPLAY,
} from "@/lib/site";
import { GoldStars } from "@/components/GoogleReviewsBadge";
import {
  BrandChip,
  FacebookMark,
  GoogleMark,
  ThumbtackMark,
  brandChipSizes,
  type BrandChipSize,
} from "@/components/SocialMarks";

/**
 * The three review platforms, in order. No Instagram: it has no review
 * system, so it does not belong next to a review count.
 */
const reviewPlatforms = [
  { name: "Google", href: GOOGLE_REVIEWS_URL, Mark: GoogleMark },
  { name: "Facebook", href: FACEBOOK_URL, Mark: FacebookMark },
  { name: "Thumbtack", href: THUMBTACK_URL, Mark: ThumbtackMark },
];

/**
 * Google, Facebook, Thumbtack as decoration only (no links), for use inside
 * an existing link such as the trust bar stat. md = 24px chips, sm = 20px.
 */
export function ReviewPlatformLogos({ size = "md" }: { size?: BrandChipSize }) {
  return (
    <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1.5">
      {reviewPlatforms.map(({ name, Mark }) => (
        <BrandChip key={name} size={size}>
          <Mark className={brandChipSizes[size].mark} />
        </BrandChip>
      ))}
    </span>
  );
}

/**
 * Hero social-proof badge. Each logo links to its own review profile; the
 * stars and "300+ Five-Star Reviews" link to the Google Business Profile. One
 * line on desktop; on narrow screens the stars and text wrap below the logos
 * as a unit, and nothing shrinks.
 */
export function ReviewPlatformsBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-semibold ${className}`}
    >
      <span className="inline-flex shrink-0 items-center gap-2 sm:gap-2.5">
        {reviewPlatforms.map(({ name, href, Mark }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read our ${name} reviews, opens in a new tab`}
            className="group/brand rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <BrandChip size="lg">
              <Mark className={brandChipSizes.lg.mark} />
            </BrandChip>
          </a>
        ))}
      </span>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read our reviews, ${TOTAL_REVIEW_COUNT_DISPLAY.replace("+", " plus")} five star reviews across Google, Facebook, and Thumbtack, opens in a new tab`}
        className="inline-flex items-center gap-2.5 rounded-md transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <GoldStars className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        <span className="whitespace-nowrap text-sm sm:text-base">
          {TOTAL_REVIEW_COUNT_DISPLAY} Five-Star Reviews
        </span>
      </a>
    </span>
  );
}
