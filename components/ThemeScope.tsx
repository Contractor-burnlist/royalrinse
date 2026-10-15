"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import theme from "@/app/site-theme.module.css";

/**
 * Applies the site-wide theme (app/site-theme.module.css) to every page
 * except /referral, the reference design that is left as is. The homepage
 * keeps its own JS scroll reveal; interior pages get the CSS one.
 */
export function ThemeScope({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/referral") return <>{children}</>;
  const interior = pathname !== "/";
  return (
    <div className={`${theme.theme} ${interior ? theme.interior : ""}`}>{children}</div>
  );
}
