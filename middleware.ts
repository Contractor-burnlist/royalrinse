import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth for the internal /ops tool. Runs ONLY on /ops (see the
 * matcher below): every public route skips this file entirely.
 *
 * Credentials come from OPS_USER and OPS_PASSWORD. If either is missing,
 * /ops returns 401 to everyone (fail closed).
 */
const NO_INDEX = "noindex, nofollow";

/** Compares every character so the time taken does not leak the match. */
function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function decodeBasic(header: string | null): [string, string] | null {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6).trim());
    const split = decoded.indexOf(":");
    if (split < 0) return null;
    return [decoded.slice(0, split), decoded.slice(split + 1)];
  } catch {
    return null;
  }
}

function unauthorized() {
  return new NextResponse("Password required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Royal Rinse Ops", charset="UTF-8"',
      "X-Robots-Tag": NO_INDEX,
      "Cache-Control": "no-store",
    },
  });
}

export function middleware(req: NextRequest) {
  const user = process.env.OPS_USER;
  const password = process.env.OPS_PASSWORD;
  if (!user || !password) return unauthorized();

  const creds = decodeBasic(req.headers.get("authorization"));
  // Check both parts every time so a wrong user name takes as long as a wrong password.
  const userOk = creds ? safeEqual(creds[0], user) : false;
  const passwordOk = creds ? safeEqual(creds[1], password) : false;
  if (!userOk || !passwordOk) return unauthorized();

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", NO_INDEX);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: ["/ops", "/ops/:path*"],
};
