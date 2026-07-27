import Image from "next/image";
import Link from "next/link";
import {
  PHONE_ARIA,
  SERVICE_AREA_LINE,
  SERVICE_AREA_PRIORITY,
  mailHref,
  site,
  telHref,
} from "@/lib/site";
import { featuredCities } from "@/lib/serviceAreas";
import { ceramicCoating, tiers } from "@/lib/services";
import { MilitaryDiscountBadge } from "@/components/MilitaryDiscountBadge";
import { Container } from "@/components/ui";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
      {children}
    </h3>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-charcoal">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex" aria-label="Royal Rinse, home">
              <Image
                src="/royal-logo.jpeg"
                alt="Royal Rinse mobile auto detailing"
                width={1254}
                height={1254}
                className="h-44 w-auto rounded-xl border border-hairline"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">{site.tagline}</p>
            <p className="mt-6 text-sm font-medium text-chrome">{site.license}</p>

            <MilitaryDiscountBadge size="md" className="mt-6" />
          </div>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <address className="mt-4 space-y-2 text-sm not-italic text-muted">
              <p className="font-semibold text-chrome">{site.legalName}</p>
              <p>
                <a
                  href={telHref}
                  aria-label={PHONE_ARIA}
                  className="transition-colors hover:text-ink"
                >
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={mailHref} className="transition-colors hover:text-ink">
                  {site.email}
                </a>
              </p>
              <p>{SERVICE_AREA_PRIORITY}</p>
            </address>

            <dl className="mt-6 space-y-1.5 text-sm text-muted">
              {site.hours.map((entry) => (
                <div key={entry.days} className="flex justify-between gap-4">
                  <dt>{entry.days}</dt>
                  <dd className="text-chrome">{entry.time}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>
                <Link href="/contact" className="transition-colors hover:text-ink">
                  Contact &amp; map
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-ink">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Service Area</ColumnHeading>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {featuredCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-area/${city.slug}`}
                    className="transition-colors hover:text-ink"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-area"
                  className="font-semibold text-chrome transition-colors hover:text-ink"
                >
                  View all service areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {[...tiers, ceramicCoating].map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-ink"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="transition-colors hover:text-ink">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/packages" className="transition-colors hover:text-ink">
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/ceramic-warranty"
                  className="transition-colors hover:text-ink"
                >
                  Ceramic Warranty
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="transition-colors hover:text-ink">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-ink">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-hairline py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Mobile auto detailing in Menifee, Temecula &amp; throughout{" "}
            {SERVICE_AREA_LINE}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
