"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Mail, MessageSquare } from "lucide-react";
import styles from "./referral.module.css";

/**
 * Share actions for existing customers: copy the page link, or text or email
 * a prefilled message carrying it. Client side only; nothing is sent anywhere.
 */

const EMAIL_SUBJECT = "$25 off your first detail with Royal Rinse";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or clipboard blocked: fall back to a hidden textarea.
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

export function ReferralShare({ url, message }: { url: string; message: string }) {
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function onCopy() {
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      setAnnounce("Link copied");
    } else {
      setAnnounce("Copy failed. Select the link and copy it manually.");
    }
  }

  const smsHref = `sms:?&body=${encodeURIComponent(message)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(message)}`;

  return (
    <div>
      <figure className={`${styles.quote} px-5 py-5 sm:px-7 sm:py-6`}>
        <figcaption className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-text)]">
          Your message
        </figcaption>
        <blockquote className="mt-3 break-words text-base leading-relaxed text-[#e4e7eb] sm:text-lg">
          {message}
        </blockquote>
      </figure>

      {/* Stacked and full width on mobile, one row from sm up. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onCopy}
          className={`${styles.pill} ${copied ? styles.copied : ""}`}
        >
          {copied ? (
            <Check aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Link2 aria-hidden="true" className="h-5 w-5" />
          )}
          {copied ? "Copied" : "Copy link"}
        </button>
        <a href={smsHref} className={styles.pill}>
          <MessageSquare aria-hidden="true" className="h-5 w-5" />
          Text it
        </a>
        <a href={mailHref} className={styles.pill}>
          <Mail aria-hidden="true" className="h-5 w-5" />
          Email it
        </a>
      </div>

      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  );
}
