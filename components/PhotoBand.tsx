import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

/**
 * Photo interstitial that still runs to the viewport edge, but on desktop the
 * photo occupies ~62% of the width rather than 100%. Same reason as the hero:
 * at full width a 900px source upscales 3.2x on retina; at 62% it's ~1.9x and
 * far less of the car is cropped away.
 *
 * No fixed-attachment parallax: it doesn't work with next/image (which renders
 * an <img>, not a CSS background) and is janky on mobile Safari.
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
    <section className="relative flex min-h-[55vh] items-center overflow-hidden md:min-h-[62vh]">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          quality={90}
          sizes="(max-width: 1024px) 100vw, 62vw"
          style={{ objectPosition: "center" }}
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-base via-base/60 to-transparent lg:via-base/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-72 bg-gradient-to-r from-base via-base/70 to-transparent lg:block"
        />
      </div>

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
