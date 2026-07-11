import type { Review } from "@/lib/reviews";
import { Card } from "@/components/ui";

function Stars() {
  return (
    <div className="flex gap-1 text-royal" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="flex h-full flex-col">
      <Stars />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <footer className="mt-5 border-t border-hairline pt-4">
        <p className="text-sm font-semibold text-ink">{review.name}</p>
        {review.vehicle ? (
          <p className="mt-0.5 text-xs text-muted">{review.vehicle}</p>
        ) : null}
      </footer>
    </Card>
  );
}
