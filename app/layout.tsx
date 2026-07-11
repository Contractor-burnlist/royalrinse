import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  PHONE_DISPLAY,
  SERVICE_AREA_COUNTIES,
  SERVICE_AREA_LINE,
  site,
} from "@/lib/site";
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
  title: "Royal Rinse | Mobile Auto Detailing — Riverside & San Diego County",
  description:
    "Royal Rinse brings professional mobile auto detailing to your driveway anywhere in Riverside & San Diego County. Licensed, insured, and we come to you.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: site.name,
  description: `Mobile auto detailing serving ${SERVICE_AREA_LINE}. We come to you.`,
  telephone: PHONE_DISPLAY,
  areaServed: SERVICE_AREA_COUNTIES.map((county) => ({
    "@type": "AdministrativeArea",
    name: county,
  })),
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
