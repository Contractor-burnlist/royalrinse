"use client";

import { useEffect, useRef } from "react";
import { HCP_BOOKING_URL } from "@/lib/hcp";

const HCP_ORIGIN = new URL(HCP_BOOKING_URL).origin;

/**
 * Inline Housecall Pro booking. Their page renders nothing inside an iframe
 * until the parent sends it "hcp:open" (their modal script normally does
 * that), so this does the same handshake: it answers the frame's
 * "hcp:iframe-loaded" with "hcp:open". Messages are only accepted from, and
 * only sent to, the booking origin.
 */
export function BookingEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const open = () =>
      ref.current?.contentWindow?.postMessage("hcp:open", HCP_ORIGIN);

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== HCP_ORIGIN) return;
      // "hcp:close" is the X inside the booking flow. There is nothing to
      // close on this page, so start the flow over rather than leave it blank.
      if (event.data === "hcp:iframe-loaded" || event.data === "hcp:close") open();
    };

    window.addEventListener("message", onMessage);
    // In case the frame finished loading before this listener was attached.
    open();
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      src={HCP_BOOKING_URL}
      title="Book Royal Rinse online"
      className="block w-full border-0"
      style={{ width: "100%", minHeight: "900px", border: "none" }}
      allow="payment"
    />
  );
}
