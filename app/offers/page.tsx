import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BookNowButton } from "@/components/BookNowButton";
import { MilitaryDiscountBadge } from "@/components/MilitaryDiscountBadge";
import {
  ButtonAnchor,
  Card,
  Container,
  Eyebrow,
  Icon,
  Section,
} from "@/components/ui";
import { offers, offerTerms, type Offer } from "@/lib/offers";
import { PROVIDER_REF, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site, smsHref, telHref } from "@/lib/site";
import { absoluteUrl } from "@/lib/url";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Detailing Offers in Menifee & Temecula | Royal Rinse",
  description:
    "Mobile detailing offers in Menifee, Temecula, and Murrieta: a first-time rate, 10% military discount, maintenance plan and ceramic bundles, and fleet rates.",
  path: "/offers",
});

/**
 * One Offer per card, no prices: every service is quoted, so price and
 * priceSpecification are left out rather than invented. Each offer points at
 * its card and names the service it applies to.
 */
const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${absoluteUrl("/offers")}#offers`,
  name: "Royal Rinse current offers",
  url: absoluteUrl("/offers"),
  itemListElement: offers.map((offer) => ({
    "@type": "Offer",
    name: offer.title,
    description: offer.note
      ? `${offer.description} ${offer.note}`
      : offer.description,
    url: absoluteUrl(`/offers#${offer.id}`),
    seller: PROVIDER_REF,
    itemOffered: {
      "@type": "Service",
      name: offer.service,
      provider: PROVIDER_REF,
    },
  })),
};

const inlineLink =
  "font-semibold text-accent transition-colors hover:text-ink";

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-chrome/10 text-chrome">
          <Icon name={offer.icon} className="h-5 w-5" />
        </span>
        {/* The military card carries the site-wide badge in place of a tag. */}
        {offer.id === "military" ? (
          <MilitaryDiscountBadge size="sm" />
        ) : (
          <span className="rounded-full border border-hairline bg-charcoal px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-chrome">
            {offer.tag}
          </span>
        )}
      </div>

      <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-ink">
        {offer.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {offer.description}
      </p>
      {offer.note ? (
        <p className="mt-4 rounded-xl border border-hairline bg-charcoal/60 px-4 py-3 text-xs leading-relaxed text-chrome">
          {offer.note}
        </p>
      ) : null}
      {offer.link ? (
        <Link
          href={offer.link.href}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent transition-colors hover:text-ink"
        >
          {offer.link.label}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : null}

      {/* mt-auto pins the buttons to the card floor so rows line up. */}
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {offer.ctas.includes("call") ? (
          <ButtonAnchor
            href={telHref}
            className="!px-4"
            aria-label={`${offer.callLabel ?? "Call"} about the ${offer.title}, ${site.phone}`}
          >
            {offer.callLabel ?? "Call"}
          </ButtonAnchor>
        ) : null}
        {offer.ctas.includes("text") ? (
          <ButtonAnchor
            href={smsHref}
            variant="secondary"
            className="!px-4"
            aria-label={`Text us about the ${offer.title}, ${site.phone}`}
          >
            Text
          </ButtonAnchor>
        ) : null}
        {offer.ctas.includes("book") ? (
          <BookNowButton variant="secondary" className="!px-4" />
        ) : null}
      </div>
    </Card>
  );
}

export default function OffersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Offers", path: "/offers" }])} />
      <JsonLd data={offerCatalogSchema} />

      {/* Hero */}
      <div className="metal-strong metal-edge-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Offers &amp; Specials</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            Current Offers
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-chrome">
            Every detail is quoted on your vehicle&rsquo;s size and condition,
            so each offer is a saving on your quote, never a fixed sticker
            price.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Mention an offer when you call, text, or book, and we apply it at
            booking. Offers combine only where a card says so. Every offer
            applies across our service area, including{" "}
            <Link href="/service-area/menifee" className={inlineLink}>
              Menifee
            </Link>
            ,{" "}
            <Link href="/service-area/temecula" className={inlineLink}>
              Temecula
            </Link>
            , and{" "}
            <Link href="/service-area/murrieta" className={inlineLink}>
              Murrieta
            </Link>
            .
          </p>
        </Container>
      </div>

      <Section className="!pb-0 !pt-16 sm:!pt-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.id} id={offer.id} className="scroll-mt-36">
              <OfferCard offer={offer} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Fine print */}
      <Section className="!py-16 sm:!py-20">
        <div className="rounded-xl surface-machined edge-chrome p-6 shadow-card sm:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
            Fine print
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {offerTerms.map((term) => (
              <li key={term} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-chrome"
                />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
