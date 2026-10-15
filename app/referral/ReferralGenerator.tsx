"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Check, Copy, Mail, MessageSquare, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import styles from "./referral.module.css";

/**
 * Referral code generator. Entirely client side: no API, no form POST, no
 * third party. The code is RR-[first 4 letters of the name]-[4 random], kept
 * in localStorage so a returning visitor sees the same code. Attribution
 * happens at booking, when the friend mentions the code.
 */

const STORAGE_KEY = "rr-referral-v1";
// No 0/O, 1/I/L: a code read aloud over the phone should not be ambiguous.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

type Saved = { name: string; phone: string; code: string };

function readSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    if (typeof parsed.code !== "string" || !/^RR-[A-Z]{1,4}-[A-Z0-9]{4}$/.test(parsed.code)) {
      return null;
    }
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
      code: parsed.code,
    };
  } catch {
    return null;
  }
}

function writeSaved(value: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private mode or blocked storage: the code still works for this visit.
  }
}

function namePart(name: string) {
  return name
    .normalize("NFD")
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase()
    .slice(0, 4);
}

function randomSuffix() {
  const bytes = new Uint8Array(4);
  try {
    window.crypto.getRandomValues(bytes);
  } catch {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

export function buildShareMessage(code: string, name: string, phone: string) {
  let message = `Hey, I use Royal Rinse Mobile Detailing and they do incredible work. Use my code ${code} when you book and you get $25 off your first detail. Call or text ${site.phone} or book at royalrinsemobile.com`;
  if (phone.trim()) {
    message += `. Tell them ${firstName(name) || "a friend"} sent you, my number is ${phone.trim()}.`;
  }
  return message;
}

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

const EMAIL_SUBJECT = "$25 off your first detail with Royal Rinse";

export function ReferralGenerator() {
  const nameId = useId();
  const phoneId = useId();
  const errorId = useId();
  const nameRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState<string | null>(null);
  // Bumped on every reveal so the cascade replays.
  const [revealKey, setRevealKey] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");

  // Returning visitor: restore their code without replaying the reveal.
  useEffect(() => {
    const saved = readSaved();
    if (saved) {
      setName(saved.name);
      setPhone(saved.phone);
      setCode(saved.code);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const part = namePart(name);
    if (!part) {
      setError("Enter your name to get your code.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    // Same first four letters: keep the code they may already have shared.
    const keep = code && code.split("-")[1] === part;
    const next = keep ? code : `RR-${part}-${randomSuffix()}`;
    setCode(next);
    setRevealKey((k) => k + 1);
    setAnnounce(`Your referral code is ${next.split("").join(" ")}`);
    writeSaved({ name: name.trim(), phone: phone.trim(), code: next });
  }

  const message = code ? buildShareMessage(code, name, phone) : "";
  const smsHref = code ? `sms:?&body=${encodeURIComponent(message)}` : undefined;
  const mailHref = code
    ? `mailto:?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(message)}`
    : undefined;

  async function onCopy() {
    if (!code) return;
    const ok = await copyText(message);
    if (ok) {
      setCopied(true);
      setAnnounce("Message copied");
    } else {
      setAnnounce("Copy failed. Select the message and copy it manually.");
    }
  }

  function needCode() {
    setError("Reveal your code first, then share it.");
    nameRef.current?.focus();
  }

  const displayCode = code ?? "RR-NAME-CODE";

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
        <div className={styles.field}>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="given-name"
            placeholder=" "
            required
            aria-required="true"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <label htmlFor={nameId} className={styles.label}>
            Your name
          </label>
        </div>
        <div className={styles.field}>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder=" "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
          <label htmlFor={phoneId} className={styles.label}>
            Your phone (optional)
          </label>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className={`${styles.goldButton} w-full sm:w-auto`}>
            <Sparkles aria-hidden="true" className="h-5 w-5" />
            {code ? "Update my code" : "Reveal my code"}
          </button>
          <p id={errorId} role="alert" className="mt-3 min-h-[1.25rem] text-sm font-medium text-[#f3c26b]">
            {error}
          </p>
        </div>
      </form>

      {/* The reveal: engraved, recessed panel. Always rendered, so the page
          never shifts when the code arrives. */}
      <div
        key={revealKey}
        className={`${styles.codePanel} ${revealKey > 0 ? styles.reveal : ""} mt-4 px-4 py-10 text-center sm:py-14`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c3c8ce]">
          Your referral code
        </p>
        <p className={`${styles.code} mt-4 font-display`} aria-hidden="true">
          {displayCode.split("").map((char, i) => (
            <span
              key={`${char}-${i}`}
              className={`${styles.codeChar} ${code ? styles.metal : styles.codePlaceholder}`}
              style={revealKey > 0 ? { animationDelay: `${i * 45}ms` } : undefined}
            >
              {char}
            </span>
          ))}
        </p>
        <p className="sr-only">{code ? `Your referral code is ${code}` : "No code yet"}</p>
        <span aria-hidden="true" className={styles.sweep} />
      </div>

      {/* Share message */}
      <figure className={`${styles.quote} mt-8 px-5 py-5 sm:px-7 sm:py-6`}>
        <figcaption className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-text)]">
          Your message
        </figcaption>
        <blockquote className="mt-3 text-base leading-relaxed text-[#e4e7eb] sm:text-lg">
          {code ? (
            message
          ) : (
            <span className="text-[#aab0b7]">
              Hey, I use Royal Rinse Mobile Detailing and they do incredible work. Use my
              code <span className="font-semibold text-[var(--gold-text)]">[your code]</span> when
              you book and you get $25 off your first detail. Call or text {site.phone} or
              book at royalrinsemobile.com
            </span>
          )}
        </blockquote>
      </figure>

      {/* Share actions: stacked and full width on mobile, one row from sm up. */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={code ? onCopy : needCode}
          aria-disabled={code ? undefined : "true"}
          className={`${styles.pill} ${copied ? styles.copied : ""}`}
        >
          {copied ? (
            <Check aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Copy aria-hidden="true" className="h-5 w-5" />
          )}
          {copied ? "Copied" : "Copy message"}
        </button>
        {code ? (
          <a href={smsHref} className={styles.pill}>
            <MessageSquare aria-hidden="true" className="h-5 w-5" />
            Text it
          </a>
        ) : (
          <button type="button" onClick={needCode} aria-disabled="true" className={styles.pill}>
            <MessageSquare aria-hidden="true" className="h-5 w-5" />
            Text it
          </button>
        )}
        {code ? (
          <a href={mailHref} className={styles.pill}>
            <Mail aria-hidden="true" className="h-5 w-5" />
            Email it
          </a>
        ) : (
          <button type="button" onClick={needCode} aria-disabled="true" className={styles.pill}>
            <Mail aria-hidden="true" className="h-5 w-5" />
            Email it
          </button>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  );
}
