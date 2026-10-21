import type { Metadata } from "next";
import "./ops.css";

/**
 * Internal tool for the booking VA. Password protected by middleware.ts and
 * never linked from, or listed on, the public site.
 */
export const metadata: Metadata = {
  title: "Booking Checker | Royal Rinse",
  description: "Internal tool. Not for the public.",
  // Renders <meta name="robots" content="noindex, nofollow">.
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  // Opaque light page over the site's dark theme background.
  return <div className="ops min-h-screen bg-ops-surface font-sans text-ops-ink antialiased">{children}</div>;
}
