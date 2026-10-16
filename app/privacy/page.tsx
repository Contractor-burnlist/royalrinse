import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { mailHref, site, smsHref, telHref } from "@/lib/site";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Royal Rinse Mobile Detailing, Menifee CA",
  description:
    "How Royal Rinse Mobile Detailing in Menifee, CA collects, uses, and protects your information when you book, call, text, or visit our website. No data is sold.",
  path: "/privacy",
});

/**
 * Set by hand. Change it when the policy itself is reviewed or edited.
 *
 * ACCURACY: this policy describes what the site actually does, audited
 * 2026-10-15. No analytics, pixels or tracking scripts are installed (the
 * Content-Security-Policy in next.config.mjs would block them anyway), the
 * site sets no cookies and uses no browser storage, and there are no forms.
 * Outside services: Housecall Pro (booking widget, loaded only when a visitor
 * reaches for Book Now, plus the iframe on /book), the Google Maps embed on
 * /contact, and Vercel hosting. If any of that changes, update this page.
 */
const EFFECTIVE_DATE = "2026-10-15";

const effectiveDisplay = new Date(`${EFFECTIVE_DATE}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" },
);

const link =
  "font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-ink";
const h2 = "font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl";
const h3 = "font-display text-lg font-bold text-ink";
const prose = "mt-4 space-y-4 text-base leading-relaxed text-chrome";
const list = "list-disc space-y-2 pl-5 marker:text-[var(--gold-text)]";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use-information", title: "How we use information" },
  { id: "third-party-services", title: "Third party services" },
  { id: "calls-and-texts", title: "Calls and text messages" },
  { id: "cookies", title: "Cookies and browser storage" },
  { id: "sharing", title: "How we share information" },
  { id: "retention", title: "How long we keep information" },
  { id: "security", title: "Security" },
  { id: "california-rights", title: "Your California privacy rights" },
  { id: "children", title: "Children's privacy" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function PolicySection({ id, children }: { id: SectionId; children: ReactNode }) {
  const title = sections.find((s) => s.id === id)?.title;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-32">
      <h2 id={`${id}-heading`} className={h2}>
        {title}
      </h2>
      <div className={prose}>{children}</div>
    </section>
  );
}

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
            What {site.legalName} collects, why we collect it, and who it is
            shared with, in plain English.
          </p>
          <p className="mt-4 text-sm text-muted">
            Effective <time dateTime={EFFECTIVE_DATE}>{effectiveDisplay}</time>
          </p>
        </Container>
      </div>

      <Section className="!py-16 sm:!py-20">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.16em] text-chrome">
              On this page
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[42rem] space-y-14">
            <PolicySection id="introduction">
              <p>
                {site.legalName} (&ldquo;Royal Rinse&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) is a mobile auto detailing company based in
                Menifee, California. We serve Menifee, Temecula, Murrieta,
                Riverside, San Diego, and the surrounding areas of Riverside
                County and San Diego County.
              </p>
              <p>
                This policy explains what information we collect when you visit
                royalrinsemobile.com, book a service, or call, text, or email
                us, and what we do with it. We collect only what we need to
                quote, schedule, and perform your detail.
              </p>
              <p>
                This policy is effective as of{" "}
                <time dateTime={EFFECTIVE_DATE}>{effectiveDisplay}</time>.
              </p>
            </PolicySection>

            <PolicySection id="information-we-collect">
              <h3 className={h3}>Information you give us</h3>
              <ul className={list}>
                <li>
                  <strong className="text-ink">When you book online.</strong>{" "}
                  Online booking is provided by Housecall Pro, through the Book
                  Now window and the booking form on our{" "}
                  <Link href="/book" className={link}>
                    Book page
                  </Link>
                  . You enter your details directly into Housecall Pro: your
                  name, phone number, email address, the service address,
                  details about your vehicle, and payment information. We
                  receive that booking information so we can schedule and
                  perform the service.
                </li>
                <li>
                  <strong className="text-ink">When you call or text us.</strong>{" "}
                  We receive your phone number and whatever you tell us, such
                  as your vehicle, your address, and the service you want.
                </li>
                <li>
                  <strong className="text-ink">When you email us.</strong> We
                  receive your email address and the contents of your message.
                </li>
              </ul>
              <p>
                This website has no contact forms or sign-up forms of its own.
                The only place you type personal details into a page on our site
                is the Housecall Pro booking form.
              </p>

              <h3 className={`${h3} pt-4`}>Information collected automatically</h3>
              <ul className={list}>
                <li>
                  <strong className="text-ink">Server logs.</strong> Our website
                  is hosted by Vercel. Like most hosts, Vercel records standard
                  technical information when a page is requested, such as your
                  IP address, browser type, the page requested, and the time.
                  This is used to deliver the site and keep it secure.
                </li>
                <li>
                  <strong className="text-ink">No analytics or tracking.</strong>{" "}
                  This website does not use analytics tools, advertising
                  cookies, tracking pixels, or similar tracking scripts.
                </li>
                <li>
                  <strong className="text-ink">No browser storage.</strong> Our
                  website does not set cookies or save information in your
                  browser&rsquo;s storage. See{" "}
                  <a href="#cookies" className={link}>
                    Cookies and browser storage
                  </a>{" "}
                  for the outside services that may.
                </li>
              </ul>
            </PolicySection>

            <PolicySection id="how-we-use-information">
              <p>We use the information we collect to:</p>
              <ul className={list}>
                <li>Schedule and perform the services you book</li>
                <li>Give you a quote</li>
                <li>Contact you about your appointment or quote</li>
                <li>Process payment and keep business and tax records</li>
                <li>Answer your questions and requests</li>
                <li>Improve our services</li>
              </ul>
            </PolicySection>

            <PolicySection id="third-party-services">
              <p>
                We use a small number of outside services to run the business.
                Each has its own privacy policy, which applies to the
                information it handles.
              </p>
              <ul className={list}>
                <li>
                  <strong className="text-ink">Housecall Pro</strong> provides
                  our online booking, scheduling, and payment tools. Its booking
                  code loads only when you reach for a Book Now button or open
                  our Book page, so pages you only read do not load it.
                </li>
                <li>
                  <strong className="text-ink">Vercel</strong> hosts this
                  website and keeps the server logs described above.
                </li>
                <li>
                  <strong className="text-ink">Google Maps</strong> provides the
                  map embedded on our{" "}
                  <Link href="/contact" className={link}>
                    Contact page
                  </Link>
                  . When that map loads, your browser connects to Google.
                </li>
              </ul>
              <p>
                Our site also links to our profiles on Google, Facebook,
                Instagram, and Thumbtack. Those sites are only contacted if you
                click a link to them, and their own policies apply once you are
                there.
              </p>
            </PolicySection>

            <PolicySection id="calls-and-texts">
              <p>
                If you call or text us at{" "}
                <a href={telHref} className={link}>
                  {site.phone}
                </a>
                , or give us your number when you book, we use it to contact you
                about your own appointments and quotes.
              </p>
              <ul className={list}>
                <li>We do not sell or share your phone number.</li>
                <li>
                  You can stop text messages at any time by replying STOP, or by
                  telling us directly.
                </li>
                <li>Message and data rates from your carrier may apply.</li>
              </ul>
            </PolicySection>

            <PolicySection id="cookies">
              <p>
                Our own website does not set cookies and does not save anything
                in your browser&rsquo;s local storage or session storage. We do
                not use advertising or analytics cookies.
              </p>
              <p>
                Two outside services that appear on our pages may use cookies or
                similar technology of their own when they load:
              </p>
              <ul className={list}>
                <li>
                  <strong className="text-ink">Housecall Pro</strong>, when you
                  open the booking form, to run the booking and payment process.
                </li>
                <li>
                  <strong className="text-ink">Google</strong>, when the map on
                  our Contact page loads.
                </li>
              </ul>
              <p>
                You can block or clear cookies in your browser settings. If you
                block cookies from Housecall Pro, online booking may not work,
                and you can call or text us to book instead.
              </p>
            </PolicySection>

            <PolicySection id="sharing">
              <p>
                <strong className="text-ink">
                  We do not sell your personal information.
                </strong>{" "}
                We do not share it with other companies for their own marketing.
              </p>
              <p>We share information only:</p>
              <ul className={list}>
                <li>
                  With the service providers we need to run the business, such
                  as Housecall Pro for booking and payments, and only for that
                  purpose
                </li>
                <li>When the law requires it</li>
              </ul>
            </PolicySection>

            <PolicySection id="retention">
              <p>
                We keep customer information for as long as we need it to keep
                your service history, for accounting and tax records, and to
                meet our legal obligations. When we no longer need it, we delete
                it.
              </p>
            </PolicySection>

            <PolicySection id="security">
              <p>
                We take reasonable steps to protect your information. This
                website is served only over an encrypted connection (HTTPS), and
                booking and payment details are handled by Housecall Pro, not
                stored on this website.
              </p>
              <p>
                No method of sending or storing information is completely
                secure, so we cannot guarantee absolute security.
              </p>
            </PolicySection>

            <PolicySection id="california-rights">
              <p>
                If you live in California, the California Consumer Privacy Act
                (CCPA), as amended by the California Privacy Rights Act (CPRA),
                gives you these rights:
              </p>
              <ul className={list}>
                <li>
                  <strong className="text-ink">Right to know</strong> what
                  personal information we have about you and how we use it
                </li>
                <li>
                  <strong className="text-ink">Right to delete</strong> your
                  personal information, subject to some legal exceptions
                </li>
                <li>
                  <strong className="text-ink">Right to correct</strong>{" "}
                  inaccurate personal information
                </li>
                <li>
                  <strong className="text-ink">Right to opt out</strong> of the
                  sale or sharing of your personal information
                </li>
              </ul>
              <p>
                <strong className="text-ink">
                  We do not sell or share your personal information
                </strong>{" "}
                as those terms are defined in California law, so there is
                nothing to opt out of. You still have every other right listed
                here.
              </p>
              <p>
                To use any of these rights, call or text{" "}
                <a href={telHref} className={link}>
                  {site.phone}
                </a>{" "}
                or email{" "}
                <a href={mailHref} className={`${link} break-all`}>
                  {site.email}
                </a>
                . We may ask a few questions to confirm it is really you before
                we act on a request. We will not treat you differently for using
                your privacy rights.
              </p>
            </PolicySection>

            <PolicySection id="children">
              <p>
                Our services are not directed to children under 13, and we do
                not knowingly collect personal information from them. If you
                believe a child has given us information, contact us and we
                will delete it.
              </p>
            </PolicySection>

            <PolicySection id="changes">
              <p>
                If we change this policy, we will post the updated version on
                this page and update the effective date at the top.
              </p>
            </PolicySection>

            <section
              id="contact"
              aria-labelledby="contact-heading"
              className="scroll-mt-32 rounded-2xl border border-accent/60 bg-surface p-6 shadow-card sm:p-10"
            >
              <h2 id="contact-heading" className={h2}>
                Contact us
              </h2>
              <div className={prose}>
                <p>
                  Questions about this policy or your information? Reach{" "}
                  {site.legalName}, based in Menifee, California:
                </p>
                <ul className={list}>
                  <li>
                    Call:{" "}
                    <a href={telHref} className={link}>
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    Text:{" "}
                    <a href={smsHref} className={link}>
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    Email:{" "}
                    <a href={mailHref} className={`${link} break-all`}>
                      {site.email}
                    </a>
                  </li>
                </ul>
                <p>
                  See also our{" "}
                  <Link href="/terms" className={link}>
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
