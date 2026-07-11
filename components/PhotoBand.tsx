import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

/**
 * Photo interstitial.
 *
 * NOT full-bleed. The source photos are portrait phone shots (max 900px wide);
 * stretching one across a 1440px viewport meant a 3.2x upscale on retina and
 * cropped away ~75% of the frame. Instead the photo sits in a portrait frame
 * capped at 26rem (416px CSS = 832px on retina, under the 900px source), so it
 * renders without upscaling and keeps its own aspect ratio.
 */
export function PhotoBand({
  image,
  headline,
  sub,
  reverse = false,
}: {
  image: GalleryImage;
  headline: string;
  sub?: string;
  /** Put the photo on the left instead of the right. */
  reverse?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-charcoal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-royal/10 blur-3xl"
      />

      <Container className="relative py-20 sm:py-28">
        <div
          className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-20 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <Reveal className="flex-1">
            <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {headline}
            </p>
            {sub ? (
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                {sub}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={100} className="w-full max-w-[26rem] shrink-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-hairline shadow-card">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                quality={90}
                // Never requests more than the frame actually is.
                sizes="(max-width: 1024px) 100vw, 416px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
