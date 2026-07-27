import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallCta } from "@/components/StickyCallCta";
import { SERVICE_AREA_LINE, site } from "@/lib/site";
import { siteJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/url";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  /**
   * Base for resolving og:image and canonical URLs. Without it Next resolves
   * them against localhost. See lib/url.ts for how the domain is chosen.
   */
  metadataBase: new URL(siteUrl),
  title: `${site.legalName} | Mobile Auto Detailing, ${SERVICE_AREA_LINE}`,
  description:
    "Royal Rinse brings premium mobile auto detailing to your driveway anywhere in Riverside & San Diego County. Licensed, insured, and we come to you.",
  applicationName: site.legalName,
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Full LocalBusiness / Organization / WebSite graph (see lib/seo.ts).
const localBusinessSchema = siteJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Reveal starts at opacity-0 and is un-hidden by IntersectionObserver.
            Without JS that would leave sections invisible — force them visible. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body
        className={`${display.variable} ${body.variable} flex min-h-screen flex-col bg-base font-sans text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* One floating call/book CTA for the whole site. Fades in past the
            hero, retracts near the footer, and hides while the booking modal
            or lightbox is open. */}
        <StickyCallCta />

        {/* Housecall Pro online booking. Loaded once here — every BookNowButton
            calls window.HCPWidget.openModal(). */}
        <Script
          src="https://online-booking.housecallpro.com/script.js?token=16c0ab2b61894f3d9a901c7ca8af8226&orgName=Royal-Rinse-Mobile-Detailing"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
