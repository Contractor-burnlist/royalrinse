import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-container px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-royal">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-royal text-ink shadow-glow hover:bg-royal-hover",
  secondary: "border border-hairline bg-surface text-ink hover:border-chrome/40 hover:bg-charcoal",
  ghost: "text-chrome hover:text-ink",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-hairline bg-surface p-6 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Stand-in for a real photo. Swap for next/image once assets land —
 * the aspect ratio and rounding are already set by the caller.
 */
export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={`flex items-center justify-center overflow-hidden rounded-xl border border-hairline bg-gradient-to-br from-charcoal via-surface to-charcoal ${className}`}
    >
      <span className="px-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
    </div>
  );
}

const iconPaths: Record<string, ReactNode> = {
  droplet: <path d="M12 3s6 6.5 6 10.5a6 6 0 1 1-12 0C6 9.5 12 3 12 3Z" />,
  seat: (
    <>
      <path d="M6 4h6a3 3 0 0 1 3 3v7H9a3 3 0 0 1-3-3V4Z" />
      <path d="M6 18h11a3 3 0 0 0 3-3v-1" />
      <path d="M4 14v6" />
    </>
  ),
  car: (
    <>
      <path d="M3 13l2-5a2 2 0 0 1 2-1.3h10A2 2 0 0 1 19 8l2 5" />
      <path d="M3 13h18v4H3z" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="16.5" cy="18.5" r="1.5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Z" />,
  polish: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8a4 4 0 0 0 0 8" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 6.5" />,
  diamond: (
    <>
      <path d="M6 3h12l3 6-9 12L3 9l3-6Z" />
      <path d="M3 9h18M9 3l-1.5 6L12 21l4.5-12L15 3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name] ?? iconPaths.check}
    </svg>
  );
}
