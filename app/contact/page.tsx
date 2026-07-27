import type { Metadata } from "next";
import Link from "next/link";
import {
  GOOGLE_MAP_EMBED_URL,
  GOOGLE_REVIEWS_URL,
  PHONE_ARIA,
  SERVICE_AREA_LINE,
  mailHref,
  site,
  telHref,
} from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { BookNowButton } from "@/components/BookNowButton";
import { ButtonAnchor, Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Contact Royal Rinse Mobile Detailing | (951) 338-9117",
  description:
    "Contact Royal Rinse Mobile Detailing: call (951) 338-9117 or book online. Mobile auto detailing that comes to you across Riverside & San Diego County, open 7 days.",
  path: "/contact",
});

/** NAP rows — the canonical name/phone/email/area, identical to the footer + schema. */
const details: { icon: string; label: string; value: string; href?: string; aria?: string }[] = [
  {
    icon: "car",
    label: "Business",
    value: site.legalName,
  },
  {
    icon: "droplet",
    label: "Phone",
    value: site.phone,
    href: telHref,
    aria: PHONE_ARIA,
  },
  {
    icon: "sparkle",
    label: "Email",
    value: site.email,
    href: mailHref,
  },
  {
    icon: "shield",
    label: "Service area",
    value: `${SERVICE_AREA_LINE}, we come to you`,
  },
  {
    icon: "calendar",
    label: "Hours",
    value: `${site.hours[0].days} · ${site.hours[0].time}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Contact {site.legalName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Mobile auto detailing that comes to you across {SERVICE_AREA_LINE}.
            Call, email, or book online. Open 7 days.
          </p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <address className="not-italic">
              <dl className="space-y-6">
                {details.map((row) => (
                  <div key={row.label} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal/15 text-royal">
                      <Icon name={row.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-base text-ink">
                        {row.href ? (
                          <a
                            href={row.href}
                            aria-label={row.aria}
                            className="font-semibold text-ink transition-colors hover:text-royal"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </address>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Licensed, insured &amp; bonded: CA DLSE {site.licenseNumber}. We
              offer a 10% military discount.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
                Call {site.phone}
              </ButtonAnchor>
              <BookNowButton variant="secondary" />
            </div>

            <p className="mt-6 text-sm text-muted">
              Prefer to read first? See our{" "}
              <Link href="/faq" className="font-semibold text-royal hover:text-chrome">
                FAQ
              </Link>{" "}
              or{" "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-royal hover:text-chrome"
              >
                reviews on Google
              </a>
              .
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline shadow-card">
            <iframe
              title={`${site.legalName} on Google Maps`}
              src={GOOGLE_MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full lg:h-full lg:min-h-[420px]"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
