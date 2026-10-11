import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { mailHref, site, telHref } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Royal Rinse",
  description:
    "How Royal Rinse Mobile Detailing collects, uses and protects your information when you visit this site, contact us, or book a mobile detail.",
  path: "/privacy",
});

/** Set by hand. Change it when the policy itself is reviewed or edited. */
const LAST_UPDATED = "2026-10-11";

const lastUpdatedDisplay = new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" },
);

const contactLink =
  "font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-ink";

const h2 = "font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl";
const prose = "mt-4 space-y-4 text-base leading-relaxed text-chrome";
const list = "list-disc space-y-2 pl-5";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Policy", path: "/privacy" }])} />
      <div className="metal-strong metal-edge-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Privacy</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-chrome">
            What {site.legalName} collects, why, and who it is shared with.
          </p>
        </Container>
      </div>

      <Section className="!py-16 sm:!py-20">
        <div className="max-w-3xl space-y-14">
          <section aria-labelledby="overview">
            <h2 id="overview" className={h2}>
              Overview
            </h2>
            <div className={prose}>
              <p>
                This policy covers this website and the information you give
                us when you call, text, email, or book a service with{" "}
                {site.legalName} (&ldquo;Royal Rinse&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;). We collect only what we need to quote,
                schedule and perform your detail.
              </p>
            </div>
          </section>

          <section aria-labelledby="collect">
            <h2 id="collect" className={h2}>
              Information we collect
            </h2>
            <div className={prose}>
              <p>
                <strong className="text-ink">Information you give us.</strong>{" "}
                When you book or ask for a quote, we collect your name, phone
                number, email address, the address where the service will be
                performed, details about your vehicle, and anything else you
                choose to tell us.
              </p>
              <p>
                <strong className="text-ink">Payment information.</strong>{" "}
                Card payments are processed by our booking and payment
                provider. We do not store full card numbers on this website.
              </p>
              <p>
                <strong className="text-ink">Basic technical data.</strong>{" "}
                Like most websites, our hosting provider records standard
                server log data such as IP address, browser type and the pages
                requested. This is used to keep the site running and secure.
              </p>
              <p>
                This website does not use advertising cookies, analytics
                trackers or tracking pixels of its own, and it has no contact
                form that stores your details.
              </p>
            </div>
          </section>

          <section aria-labelledby="use">
            <h2 id="use" className={h2}>
              How we use it
            </h2>
            <div className={prose}>
              <ul className={list}>
                <li>To give you a quote and schedule your appointment</li>
                <li>To perform the service at the address you provide</li>
                <li>
                  To contact you about your appointment by phone, text or email
                </li>
                <li>To process payment and keep business records</li>
                <li>To respond to your questions and requests</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="sharing">
            <h2 id="sharing" className={h2}>
              Who we share it with
            </h2>
            <div className={prose}>
              <p>
                We do not sell your personal information, and we do not share
                it with third parties for their own marketing. We share it only
                with the service providers that help us run the business:
              </p>
              <ul className={list}>
                <li>
                  <strong className="text-ink">Housecall Pro</strong> provides
                  our online booking, scheduling and payment tools. When you
                  book online, you enter your details directly into their
                  system, and their privacy policy also applies.
                </li>
                <li>
                  <strong className="text-ink">Google</strong> provides the map
                  embedded on our contact page. Viewing that page loads the map
                  from Google, under Google&rsquo;s privacy policy.
                </li>
                <li>
                  <strong className="text-ink">Vercel</strong> hosts this
                  website.
                </li>
              </ul>
              <p>
                We may also disclose information when the law requires it.
              </p>
            </div>
          </section>

          <section aria-labelledby="texts">
            <h2 id="texts" className={h2}>
              Text messages
            </h2>
            <div className={prose}>
              <p>
                If you give us your mobile number, we may text you about your
                quote or appointment. Message and data rates may apply. Reply
                STOP at any time to stop receiving texts. Mobile numbers and
                text message consent are not shared with third parties for
                marketing.
              </p>
            </div>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className={h2}>
              Your choices
            </h2>
            <div className={prose}>
              <p>
                You can ask us what information we hold about you, ask us to
                correct it, or ask us to delete it. Contact us using the
                details below and we will respond. We keep customer records
                only as long as needed to serve you and to meet our legal and
                tax obligations.
              </p>
              <p>
                This website is not directed to children under 13, and we do
                not knowingly collect their information.
              </p>
            </div>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className={h2}>
              Changes to this policy
            </h2>
            <div className={prose}>
              <p>
                If we change this policy, we will post the updated version here
                and change the date below.
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
                Questions about this policy or your information? Call{" "}
                <a href={telHref} className={contactLink}>
                  {site.phone}
                </a>{" "}
                or email{" "}
                <a href={mailHref} className={`${contactLink} break-all`}>
                  {site.email}
                </a>
                . See also our{" "}
                <Link href="/terms" className={contactLink}>
                  Terms of Service
                </Link>
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
