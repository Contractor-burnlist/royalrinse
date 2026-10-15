import type { ReactNode } from "react";
import theme from "@/app/site-theme.module.css";

/** The one metallic gold phrase in a heading. Use sparingly. */
export function Gold({ children }: { children: ReactNode }) {
  return <span className={theme.gold}>{children}</span>;
}
