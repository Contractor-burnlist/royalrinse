import { GOOGLE_REVIEWS_URL, TOTAL_REVIEW_COUNT_DISPLAY } from "@/lib/site";
import { GoldStars } from "@/components/GoogleReviewsBadge";
import { GoogleMark } from "@/components/GoogleMark";

/**
 * Official Facebook and Thumbtack marks (paths from Simple Icons, brand colors
 * #0866FF and #009FD9). Both marks have a knocked-out center, the "f" and the
 * pin, which is meant to read white. On the dark gunmetal it would read dark,
 * so each mark sits on a white circular chip (see PlatformChip) instead of
 * being recolored.
 */
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#0866FF"
        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
      />
    </svg>
  );
}

function ThumbtackMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#009FD9"
        d="M6.18 6.38h11.69v2.68H6.17zm7.27 3.8v3.14c0 3.23-.02 3.74-.14 4.36a7.95 7.95 0 0 1-1.3 2.87c-.03 0-.78-1.35-.9-1.62-.17-.4-.3-.8-.4-1.25l-.09-.41-.02-5.78.16-.2a3.3 3.3 0 0 1 2.44-1.1zM12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0Z"
      />
    </svg>
  );
}

/** A white circle behind a mark, fixed size so it never shrinks in a flex row. */
function PlatformChip({
  size,
  children,
}: {
  size: "sm" | "md";
  children: React.ReactNode;
}) {
  const box = size === "md" ? "h-6 w-6" : "h-5 w-5";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/10 ${box}`}
    >
      {children}
    </span>
  );
}

/** Google, Facebook, Thumbtack, in that order. md = 24px chips, sm = 20px. */
export function ReviewPlatformLogos({ size = "md" }: { size?: "sm" | "md" }) {
  const mark = size === "md" ? "h-[18px] w-[18px]" : "h-[15px] w-[15px]";
  return (
    <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1.5">
      <PlatformChip size={size}>
        <GoogleMark className={mark} />
      </PlatformChip>
      <PlatformChip size={size}>
        <FacebookMark className={mark} />
      </PlatformChip>
      <PlatformChip size={size}>
        <ThumbtackMark className={mark} />
      </PlatformChip>
    </span>
  );
}

/**
 * Hero social-proof badge: platform logos, gold stars, and "300+ Five-Star
 * Reviews", linking to the verified Google Business Profile. One line on
 * desktop; on narrow screens the text wraps below the logos and stars as a
 * unit, and nothing shrinks.
 */
export function ReviewPlatformsBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read our reviews, ${TOTAL_REVIEW_COUNT_DISPLAY.replace("+", " plus")} five star reviews across Google, Facebook, and Thumbtack, opens in a new tab`}
      className={`inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
    >
      <span className="inline-flex shrink-0 items-center gap-2.5">
        <ReviewPlatformLogos />
        <GoldStars className="h-3.5 w-3.5" />
      </span>
      <span className="whitespace-nowrap">
        {TOTAL_REVIEW_COUNT_DISPLAY} Five-Star Reviews
      </span>
    </a>
  );
}
