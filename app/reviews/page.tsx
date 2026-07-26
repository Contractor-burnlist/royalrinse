import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { featuredReviews } from "@/lib/reviews";
import { GoogleRatingSummary } from "@/components/GoogleRatingSummary";
import { GoogleReviewsLink } from "@/components/GoogleReviewsLink";
import { ReviewCard } from "@/components/ReviewCard";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Reviews — Mobile Auto Detailing | Royal Rinse",
  description:
    "See what Royal Rinse customers say about our mobile auto detailing across Riverside & San Diego County — real reviews, plus our verified Google profile.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Reviews</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            What Our Customers Say
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Real words from drivers who let us into their driveways — a curated
            selection from our verified Google Business Profile.
          </p>
          <GoogleRatingSummary className="mt-6" />
        </Container>
      </div>

      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {featuredReviews.map((review) => (
            <li key={review.name}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GoogleReviewsLink variant="button">
            See all reviews on Google
          </GoogleReviewsLink>
          <GoogleReviewsLink variant="button">
            Leave us a review on Google
          </GoogleReviewsLink>
        </div>
      </Section>
    </>
  );
}
