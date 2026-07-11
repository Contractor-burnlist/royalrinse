"use client";

import type { ReactNode } from "react";
import { buttonClasses, type ButtonVariant } from "@/components/ui";

/** Used if the widget script hasn't finished loading when the user clicks. */
const HCP_FALLBACK_URL =
  "https://book.housecallpro.com/book/Royal-Rinse-Mobile-Detailing/16c0ab2b61894f3d9a901c7ca8af8226?v2=true";

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
  const openBooking = () => {
    onClick?.();

    if (typeof window !== "undefined" && window.HCPWidget?.openModal) {
      window.HCPWidget.openModal();
    } else {
      window.open(HCP_FALLBACK_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      type="button"
      onClick={openBooking}
      aria-label="Book Royal Rinse online"
      className={buttonClasses(variant, className)}
    >
      {children}
    </button>
  );
}
