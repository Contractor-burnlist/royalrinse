import type { ReactNode } from "react";
import { BookNowButton } from "@/components/BookNowButton";
import { Gold } from "@/components/Gold";
import { Reveal } from "@/components/Reveal";
import { CoversChips, TeamPhoto } from "@/components/TeamProfile";
import { ButtonLink, Section } from "@/components/ui";
import { team, type TeamMember } from "@/lib/team";
import styles from "./TeamProfile.module.css";

/** The bio up to and including its first period. */
function firstSentence(bio: string) {
  const end = bio.indexOf(".");
  return end === -1 ? bio : bio.slice(0, end + 1);
}

/**
 * A shorter technician card for the homepage: the wide 3:2 crop with the van,
 * the badge, name, role, the bio's first sentence and up to four areas. Same
 * frame, glow and hover zoom as the /about cards (TeamProfile.module.css).
 */
function HomeTeamCard({ member }: { member: TeamMember }) {
  return (
    <article
      aria-labelledby={`home-team-${member.slug}`}
      className={`${styles.card} sheen edge-chrome metal-soft flex h-full flex-col rounded-2xl p-5 sm:p-6`}
    >
      <TeamPhoto
        member={member}
        aspectClass="aspect-[3/2]"
        focus={member.homePhotoFocus ?? member.photoFocus}
        /**
         * The real slot: full card width less padding below 640px, the
         * max-w-xl column up to 768px, then half the 72rem container less
         * gutters and padding. Never above 528px, under both photos' native
         * width (864, 985).
         */
        sizes="(min-width: 1152px) 480px, (min-width: 768px) calc(50vw - 96px), (min-width: 640px) 528px, calc(100vw - 80px)"
      />

      <h3
        id={`home-team-${member.slug}`}
        className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        <Gold>{member.name}</Gold>
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
        {member.role}
      </p>

      <p className="mt-4 text-base leading-relaxed text-muted">{firstSentence(member.bio)}</p>

      <div className="mt-auto pt-5">
        <CoversChips covers={member.covers} max={4} />
      </div>
    </article>
  );
}

/**
 * "Meet your detailers" on the homepage. Everything comes from lib/team.ts.
 * `heading` is the page's own HomeHeading, passed in so the section matches
 * every other homepage heading.
 */
export function HomeTeam({ heading }: { heading: ReactNode }) {
  return (
    <Section className="!py-16 sm:!py-20">
      <Reveal>{heading}</Reveal>

      <div className="mx-auto mt-12 grid max-w-xl gap-8 md:max-w-none md:grid-cols-2">
        {team.map((member, i) => (
          <Reveal key={member.slug} delay={i * 140} className="h-full">
            <HomeTeamCard member={member} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/about#team" variant="secondary" className="whitespace-nowrap">
          Meet the team
          <span aria-hidden="true">→</span>
        </ButtonLink>
        <BookNowButton className="whitespace-nowrap" />
      </Reveal>
    </Section>
  );
}
