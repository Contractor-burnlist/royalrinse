"use client";

import { useState, type ReactNode } from "react";
import { buttonClasses, type ButtonVariant } from "@/components/ui";
import { loadHcpWidget } from "@/lib/hcp";

/** How long a click waits for the widget before falling back to /book. */
const LOAD_TIMEOUT_MS = 6000;

/** Start fetching the widget as soon as a visitor reaches for the button. */
const warm = () => {
  loadHcpWidget().catch(() => {});
};

export function BookNowButton({
  children = "Book Now",
  variant = "primary",
  className = "",
  onClick,
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Extra side effect for the caller, e.g. closing the mobile menu. */
  onClick?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const openBooking = async () => {
    onClick?.();

    if (window.HCPWidget?.openModal) {
      window.HCPWidget.openModal();
      return;
    }

    setLoading(true);
    try {
      await Promise.race([
        loadHcpWidget(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("HCP widget timed out")), LOAD_TIMEOUT_MS),
        ),
      ]);
      window.HCPWidget?.openModal();
    } catch {
      // Widget blocked or unreachable: the /book page embeds the same booking
      // flow directly and lists the phone number.
      window.location.assign("/book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={openBooking}
      onPointerEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, `${className} ${loading ? "cursor-wait" : ""}`)}
    >
      {children}
    </button>
  );
}
