import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

/**
 * Full-bleed photo interstitial with an overlaid line of copy.
 *
 * No fixed-attachment parallax: it doesn't work with next/image (which renders
 * an <img>, not a CSS background) and is janky on mobile Safari. The depth here
 * comes from the scrim and the reveal instead.
 */
export function PhotoBand({
  image,
  headline,
  sub,
}: {
  image: GalleryImage;
  headline: string;
  sub?: string;
}) {
  return (
    <section className="relative flex min-h-[55vh] items-center overflow-hidden md:min-h-[65vh]">
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          quality={90}
          sizes="100vw"
          style={{ objectPosition: "50% 40%" }}
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-base via-base/75 to-base/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-base to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base to-transparent"
      />

      <Container className="relative py-24">
        <Reveal>
          <p className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {headline}
          </p>
          {sub ? (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-chrome sm:text-lg">
              {sub}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
