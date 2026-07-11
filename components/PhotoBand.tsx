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
      {/* Blurred ambient backdrop (upscaled, but blurred on purpose). */}
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        quality={40}
        sizes="100vw"
        className="scale-125 object-cover blur-2xl brightness-[0.4] saturate-[0.85]"
      />

      {/* The real photo in a framed panel at its own ratio — no crop, no
          upscaling, so it stays sharp. */}
      <div className="absolute inset-y-8 right-0 w-full lg:inset-y-auto lg:top-1/2 lg:right-[6%] lg:h-[min(52vh,560px)] lg:w-auto lg:-translate-y-1/2 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-chrome/25 lg:shadow-2xl lg:aspect-[3/4]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          quality={90}
          sizes="(max-width: 1024px) 100vw, 440px"
          className="object-contain lg:object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-base/40 lg:via-base/60 lg:to-transparent"
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
