import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { mailHref, site, telHref } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Royal Rinse",
  description:
    "The terms that apply when you use the Royal Rinse Mobile Detailing website or book a mobile auto detailing service with us.",
  path: "/terms",
});

/** Set by hand. Change it when the terms themselves are reviewed or edited. */
const LAST_UPDATED = "2026-10-11";

const lastUpdatedDisplay = new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" },
);

const contactLink =
  "font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-ink";

const h2 = "font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl";
const prose = "mt-4 space-y-4 text-base leading-relaxed text-chrome";

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms of Service", path: "/terms" }])} />
      <div className="metal-strong metal-edge-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Terms</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-chrome">
            The terms for using this website and booking with {site.legalName}.
          </p>
        </Container>
      </div>

      <Section className="!py-16 sm:!py-20">
        <div className="max-w-3xl space-y-14">
          <section aria-labelledby="agreement">
            <h2 id="agreement" className={h2}>
              Agreement
            </h2>
            <div className={prose}>
              <p>
                This website is operated by {site.legalName} (&ldquo;Royal
                Rinse&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a mobile auto
                detailing business registered with the California DLSE under
                license {site.licenseNumber}. By using this site or booking a
                service, you agree to these terms.
              </p>
            </div>
          </section>

          <section aria-labelledby="services">
            <h2 id="services" className={h2}>
              Services and quotes
            </h2>
            <div className={prose}>
              <p>
                Pricing is quote-based and depends on your vehicle&rsquo;s
                size and condition. Service descriptions on this site are
                general information, not a binding offer. The price and scope
                of your detail are the ones we confirm with you when you book.
              </p>
              <p>
                If the vehicle&rsquo;s condition on arrival is materially
                different from what was described, we will talk with you about
                any change in price or scope before starting work.
              </p>
            </div>
          </section>

          <section aria-labelledby="booking">
            <h2 id="booking" className={h2}>
              Booking and appointments
            </h2>
            <div className={prose}>
              <p>
                Online booking and payment are provided by Housecall Pro, and
                their terms also apply when you use their tools. Because we
                come to you, we need safe, legal access to the vehicle at the
                service address at the scheduled time.
              </p>
              <p>
                If you need to reschedule or cancel, please call or text us as
                early as you can. Weather or other conditions outside our
                control may occasionally require us to reschedule.
              </p>
            </div>
          </section>

          <section aria-labelledby="warranty">
            <h2 id="warranty" className={h2}>
              Warranties
            </h2>
            <div className={prose}>
              <p>
                Ceramic coating warranty coverage is described on our{" "}
                <Link href="/ceramic-warranty" className={contactLink}>
                  Ceramic Warranty
                </Link>{" "}
                page. If you are not satisfied with any service, tell us
                promptly so we can make it right.
              </p>
            </div>
          </section>

          <section aria-labelledby="site-use">
            <h2 id="site-use" className={h2}>
              Using this website
            </h2>
            <div className={prose}>
              <p>
                The text, photos and logo on this site belong to Royal Rinse
                and may not be reused without our permission. The site is
                provided as is. We work to keep it accurate and available, but
                we do not guarantee it will be error-free or uninterrupted.
                Links to other websites are provided for convenience, and we
                are not responsible for their content.
              </p>
            </div>
          </section>

          <section aria-labelledby="privacy">
            <h2 id="privacy" className={h2}>
              Privacy
            </h2>
            <div className={prose}>
              <p>
                Our{" "}
                <Link href="/privacy" className={contactLink}>
                  Privacy Policy
                </Link>{" "}
                explains what information we collect and how we use it.
              </p>
            </div>
          </section>

          <section aria-labelledby="law">
            <h2 id="law" className={h2}>
              Governing law and changes
            </h2>
            <div className={prose}>
              <p>
                These terms are governed by the laws of the State of
                California. We may update them from time to time; the current
                version is always posted here with the date below.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="contact"
            className="rounded-2xl border border-accent/60 bg-surface p-6 shadow-card sm:p-10"
          >
            <h2 id="contact" className={h2}>
              Contact us
            </h2>
            <div className={prose}>
              <p>
                Questions about these terms? Call{" "}
                <a href={telHref} className={contactLink}>
                  {site.phone}
                </a>{" "}
                or email{" "}
                <a href={mailHref} className={`${contactLink} break-all`}>
                  {site.email}
                </a>
                .
              </p>
            </div>
          </section>

          <p className="border-t border-hairline pt-6 text-sm text-muted">
            Last updated:{" "}
            <time dateTime={LAST_UPDATED}>{lastUpdatedDisplay}</time>
          </p>
        </div>
      </Section>
    </>
  );
}
