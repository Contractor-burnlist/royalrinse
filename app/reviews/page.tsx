import type { Metadata } from "next";
import { featuredReviews } from "@/lib/reviews";
import { GoogleReviewsLink } from "@/components/GoogleReviewsLink";
import { QuoteCta } from "@/components/QuoteCta";
import { ReviewCard } from "@/components/ReviewCard";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Reviews | Royal Rinse — Mobile Auto Detailing",
  description:
    "What Royal Rinse customers say about our mobile auto detailing across Riverside & San Diego County — real reviews from real drivers.",
};

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
            Real words from drivers who let us into their driveways.
          </p>
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

        <div className="mt-12 flex justify-center">
          <GoogleReviewsLink className="rounded-xl border border-hairline bg-surface px-5 py-3 hover:border-royal">
            See all reviews on Google
          </GoogleReviewsLink>
        </div>
      </Section>

      <QuoteCta heading="Ready to see the difference?" />
    </>
  );
}
