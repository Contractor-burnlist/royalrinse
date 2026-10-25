import Image from "next/image";
import { BadgeCheck, MapPin } from "lucide-react";
import { BookNowButton } from "@/components/BookNowButton";
import { Gold } from "@/components/Gold";
import { Icon } from "@/components/ui";
import { site } from "@/lib/site";
import type { TeamMember } from "@/lib/team";
import styles from "./TeamProfile.module.css";

/** Small caps label above each block on the card. */
function Label({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
      {children}
    </p>
  );
}

/**
 * One technician's profile card for "Meet the Team" on /about. Every optional
 * field renders only when it is set in lib/team.ts; nothing stands in for a
 * missing one.
 */
export function TeamProfile({ member }: { member: TeamMember }) {
  const { yearsDetailing, specialties, certifications, favoriteJob, quote } = member;

  return (
    <article
      aria-labelledby={`team-${member.slug}`}
      className={`${styles.card} sheen edge-chrome metal-soft flex flex-col rounded-2xl p-5 sm:p-7`}
    >
      <div className={styles.frame}>
        <div className={styles.photo}>
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role.toLowerCase()} at ${site.legalName}`}
            fill
            loading="lazy"
            quality={85}
            /**
             * The real slot: full card width less padding below 640px, the
             * max-w-xl column up to 1024px, then half the 72rem container.
             * Never above 520px, under both photos' native width (864, 985).
             */
            sizes="(min-width: 1024px) 472px, (min-width: 640px) 520px, calc(100vw - 80px)"
            className={`${styles.image} object-cover`}
            style={{ objectPosition: member.photoFocus, transformOrigin: member.photoFocus }}
          />
          <div aria-hidden="true" className={styles.scrim} />
          <p
            className={`${styles.badge} absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.28em]`}
          >
            {/* Experience, never the Royal Rinse start date. A number shows only when set. */}
            {yearsDetailing ? `${yearsDetailing}+ Years Detailing` : "Seasoned Pro Detailer"}
          </p>
        </div>
      </div>

      <h3
        id={`team-${member.slug}`}
        className="mt-7 font-display text-4xl font-bold tracking-tight sm:text-5xl"
      >
        <Gold>{member.name}</Gold>
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
        {member.role}
      </p>

      <div className="mt-6">
        <Label>Covers</Label>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {member.covers.map((area) => (
            <li
              key={area}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-charcoal/50 px-3 py-1 text-xs text-chrome"
            >
              <MapPin aria-hidden="true" className={`${styles.goldIcon} h-3.5 w-3.5`} />
              {area}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-base leading-relaxed text-muted">{member.bio}</p>

      {specialties?.length ? (
        <div className="mt-6">
          <Label>Specialties</Label>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {specialties.map((item) => (
              <li
                key={item}
                className={`${styles.goldChip} rounded-full px-3 py-1 text-xs font-medium`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {certifications?.length ? (
        <div className="mt-6">
          <Label>Certifications</Label>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {certifications.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-charcoal/50 px-3 py-1 text-xs text-chrome"
              >
                <BadgeCheck aria-hidden="true" className={`${styles.goldIcon} h-3.5 w-3.5`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {favoriteJob ? (
        <p className="mt-6 text-sm leading-relaxed text-muted">
          <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            Favorite job
          </span>
          <span className="text-chrome">{favoriteJob}</span>
        </p>
      ) : null}

      {quote ? (
        <blockquote
          className={`${styles.quote} mt-7 pl-5 font-display text-xl font-medium leading-snug text-ink sm:text-2xl`}
        >
          <p>&ldquo;{quote}&rdquo;</p>
        </blockquote>
      ) : null}

      <div className="mt-auto pt-7">
        <div className="flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Icon name="shield" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-chrome" />
            <span>
              Licensed, Insured &amp; Bonded under{" "}
              <span className="whitespace-nowrap">CA DLSE {site.licenseNumber}</span>
            </span>
          </p>
          <BookNowButton className="shrink-0" />
        </div>
      </div>
    </article>
  );
}
