import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PHONE_ARIA, site, telHref } from "@/lib/site";
import { Container, Eyebrow, Icon, Section } from "@/components/ui";

/**
 * Housecall Pro's script only exposes a modal (HCPWidget.openModal), so a true
 * inline embed means iframing the direct booking URL. Verified: the booking host
 * sends no X-Frame-Options and no CSP frame-ancestors, so framing is permitted.
 *
 * The modal on the site-wide "Book Now" buttons is untouched: this page is an
 * additional path, not a replacement.
 */
const HCP_BOOKING_URL =
  "https://book.housecallpro.com/book/Royal-Rinse-Mobile-Detailing/16c0ab2b61894f3d9a901c7ca8af8226?v2=true";

export const metadata: Metadata = buildMetadata({
  title: "Book Mobile Auto Detailing Online | Royal Rinse",
  description:
    "Book Royal Rinse mobile auto detailing online in minutes, or call (951) 338-9117. We come to your home or office across Riverside & San Diego County.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <div className="metal-strong metal-edge-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Book online</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            Book Your Detail
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Pick your service and time. We come to you across Riverside &amp; San Diego
            County.
          </p>
        </Container>
      </div>

      <Section>
        {/* Generous min-height so the service list and calendar aren't cramped;
            it grows taller on larger screens. */}
        <div className="overflow-hidden rounded-2xl surface-machined edge-chrome shadow-card">
          <iframe
            src={HCP_BOOKING_URL}
            title="Book Royal Rinse online"
            loading="lazy"
            className="block w-full border-0"
            style={{ width: "100%", minHeight: "900px", border: "none" }}
            allow="payment"
          />
        </div>

        {/* Fallback: if the embed is blocked, slow, or awkward on a small
            screen, there's always a way through. */}
        <div className="mt-8 flex flex-col items-start gap-3 rounded-xl border border-hairline bg-surface px-5 py-4 text-sm text-muted sm:flex-row sm:items-center sm:gap-5">
          <span className="flex items-center gap-2 font-medium text-chrome">
            <Icon name="check" className="h-4 w-4 shrink-0 text-chrome" />
            Trouble booking?
          </span>

          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            Call{" "}
            <a
              href={telHref}
              aria-label={PHONE_ARIA}
              className="font-semibold text-accent transition-colors hover:text-ink"
            >
              {site.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={HCP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent transition-colors hover:text-ink"
            >
              Book in a new window
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </span>
        </div>
      </Section>
    </>
  );
}
