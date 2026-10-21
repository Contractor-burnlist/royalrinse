import { NextResponse } from "next/server";
import { RULES } from "@/lib/ops/rules";

/**
 * The Booking Checker's rules and prices as JSON. Lives under /ops, so
 * middleware.ts password-protects it. This is the ONLY way the browser gets
 * this data: it is never in the JS bundle.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(RULES, {
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
