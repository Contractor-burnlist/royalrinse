"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Renders the public site chrome (header, footer, sticky call bar) on every
 * route except the internal /ops tool, which has its own header and footer.
 * On public routes it renders its children unchanged.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/ops" || pathname.startsWith("/ops/")) return null;
  return <>{children}</>;
}
