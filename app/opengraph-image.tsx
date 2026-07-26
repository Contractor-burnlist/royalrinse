import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { PHONE_DISPLAY, SERVICE_AREA_LINE, site } from "@/lib/site";

/**
 * Default social share card (1200x630) for every page unless one sets its own
 * openGraph.images. A branded card rather than a raw photo crop, because the
 * source photos are all portrait and center-crop badly to a landscape frame —
 * this keeps the brand, service area, and phone readable at any preview size,
 * with a car photo on the right.
 */
export const runtime = "nodejs";
export const alt = `${site.legalName} — Mobile Auto Detailing, ${SERVICE_AREA_LINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const coverDataUri = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), "public/og/cover.jpg"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B0D10",
          color: "#F5F7FA",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              color: "#2563EB",
              fontWeight: 700,
            }}
          >
            PREMIUM MOBILE AUTO DETAILING
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            Royal Rinse
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 700,
              color: "#C9CED6",
            }}
          >
            Mobile Detailing
          </div>
          <div
            style={{ display: "flex", marginTop: 26, fontSize: 27, color: "#C9CED6" }}
          >
            {SERVICE_AREA_LINE} — We Come To You
          </div>
          <div
            style={{ display: "flex", marginTop: 28, fontSize: 34, fontWeight: 700 }}
          >
            {PHONE_DISPLAY}
          </div>
          <div
            style={{ display: "flex", marginTop: 14, fontSize: 20, color: "#9BA3AF" }}
          >
            Licensed & Insured · 10% Military Discount
          </div>
        </div>

        <div style={{ display: "flex", width: 430 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverDataUri}
            alt=""
            width={430}
            height={630}
            style={{ width: 430, height: 630, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
