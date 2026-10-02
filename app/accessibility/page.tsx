import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { mailHref, site, smsHref, telHref } from "@/lib/site";
import { Container, Eyebrow, Icon, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility Statement | Royal Rinse",
  description:
    "Royal Rinse Mobile Detailing is working toward WCAG 2.1 Level AA. How we approach accessibility, known limitations, and how to reach us by phone, text or email for help.",
  path: "/accessibility",
});

/**
 * Set by hand, on purpose. A date generated at build time would move forward
 * on every deploy and claim a review that never happened. Change it when the
 * statement itself is reviewed or edited.
 */
const LAST_UPDATED = "2026-10-02";

const lastUpdatedDisplay = new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" },
);

const measures = [
  "Accessibility is considered during design and development, not added afterward",
  "Images have text alternatives, and decorative images are hidden from screen readers",
  "Menus, the photo gallery, the photo viewer and the FAQ can be used with a keyboard alone",
  "Keyboard focus is always visible",
  "Pages use semantic HTML, with ARIA where it adds meaning",
  "Text and control colors are reviewed against WCAG contrast minimums",
  "Animation is reduced, and the photo carousel does not rotate by itself, when your device asks for reduced motion",
  "We review the site again as we add new pages and content",
];

const contactLink =
  "font-semibold text-chrome-bright underline decoration-chrome-bright/50 underline-offset-4 transition-colors hover:text-ink";

const h2 = "font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl";
const prose = "mt-4 space-y-4 text-base leading-relaxed text-chrome";

export default function AccessibilityPage() {
  return (
    <>
      <div className="metal-strong metal-edge-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Accessibility</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            Accessibility Statement
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-chrome">
            Having trouble with this site? Call or text{" "}
            <a href={telHref} className={contactLink}>
              {site.phone}
            </a>{" "}
            and we will help you directly.
          </p>
        </Container>
      </div>

      <Section className="!py-16 sm:!py-20">
        <div className="max-w-3xl space-y-14">
          <section aria-labelledby="commitment">
            <h2 id="commitment" className={h2}>
              Our commitment
            </h2>
            <div className={prose}>
              <p>
                {site.legalName} is committed to making our website usable for
                everyone, including people with disabilities. We want every
                customer to be able to learn about our services, view our work,
                and book an appointment.
              </p>
            </div>
          </section>

          <section aria-labelledby="conformance">
            <h2 id="conformance" className={h2}>
              Conformance status
            </h2>
            <div className={prose}>
              <p>
                We are working toward conformance with the Web Content
                Accessibility Guidelines (WCAG) 2.1 Level AA. Some areas of the
                site may not yet fully conform, and we are actively working to
                identify and resolve those issues.
              </p>
            </div>
          </section>

          <section aria-labelledby="measures">
            <h2 id="measures" className={h2}>
              Measures we take
            </h2>
            <ul className="mt-5 space-y-3">
              {measures.map((measure) => (
                <li key={measure} className="flex gap-3 text-base leading-relaxed text-chrome">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-chrome" />
                  {measure}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="limitations">
            <h2 id="limitations" className={h2}>
              Known limitations
            </h2>
            <div className={prose}>
              <p>
                Some content and tools on this site come from other companies
                and are not fully under our control. That includes our online
                booking tool, which is provided by Housecall Pro, and the
                embedded Google map. These may not meet the same standard as
                the rest of the site.
              </p>
              <p>
                If you have trouble booking online, call or text us and we will
                book your appointment for you.
              </p>
            </div>
          </section>

          {/* The most important section: set apart so it is easy to find. */}
          <section
            aria-labelledby="feedback"
            className="rounded-2xl border border-chrome-bright/60 bg-surface p-6 shadow-card sm:p-10"
          >
            <h2 id="feedback" className={h2}>
              Feedback and help
            </h2>
            <div className={prose}>
              <p>
                If you have difficulty using any part of this site, or need
                help booking, contact us. We will assist you directly and work
                to fix the issue.
              </p>
            </div>

            <dl className="mt-6 space-y-4 text-base text-chrome">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <dt className="w-16 font-semibold text-ink">Phone</dt>
                <dd>
                  <a href={telHref} className={contactLink}>
                    Call {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <dt className="w-16 font-semibold text-ink">Text</dt>
                <dd>
                  <a href={smsHref} className={contactLink}>
                    Text {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <dt className="w-16 font-semibold text-ink">Email</dt>
                <dd>
                  <a href={mailHref} className={`${contactLink} break-all`}>
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-base leading-relaxed text-chrome">
              We aim to respond to accessibility feedback within 2 business
              days. It helps if you tell us which page you were on and what you
              were trying to do.
            </p>
          </section>

          <section aria-labelledby="alternative">
            <h2 id="alternative" className={h2}>
              Alternative access
            </h2>
            <div className={prose}>
              <p>
                Every service on this site is available by phone or text. If
                you cannot use the website, call or text{" "}
                <a href={telHref} className={contactLink}>
                  {site.phone}
                </a>{" "}
                to get a quote and book. We are open{" "}
                {site.hours[0].time.replace(" - ", " to ")}, seven days a week.
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
