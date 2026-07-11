import Link from "next/link";
import type { GalleryImage } from "@/lib/gallery";
import { LightboxGrid } from "@/components/Lightbox";
import { Container, Eyebrow, Section } from "@/components/ui";

/** Shared shell for /gallery/exterior and /gallery/interior. */
export function GallerySubPage({
  eyebrow,
  title,
  intro,
  images,
  otherHref,
  otherLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  images: GalleryImage[];
  otherHref: string;
  otherLabel: string;
}) {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>

          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Gallery sections">
            <Link
              href="/gallery"
              className="inline-flex rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-chrome transition-colors hover:border-royal hover:text-ink"
            >
              All work
            </Link>
            <Link
              href={otherHref}
              className="inline-flex rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-chrome transition-colors hover:border-royal hover:text-ink"
            >
              {otherLabel}
            </Link>
          </nav>
        </Container>
      </div>

      <Section>
        {images.length > 0 ? (
          <LightboxGrid
            images={images}
            variant="masonry"
            className="columns-2 gap-4 lg:columns-3"
            eagerCount={3}
          />
        ) : (
          <p className="text-base text-muted">
            Photos coming soon.{" "}
            <Link href="/gallery" className="font-semibold text-royal hover:text-chrome">
              See all work
            </Link>
            .
          </p>
        )}
      </Section>
    </>
  );
}
