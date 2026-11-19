import Image from "next/image";
import { headlightRestorationPairs, type GalleryImage } from "@/lib/gallery";
import { Container, Eyebrow } from "@/components/ui";
import { Gold } from "@/components/Gold";

/**
 * Labeled before/after pairs. The masonry grid on /gallery cannot keep two
 * shots of the same lens together, so this section does.
 *
 * Sources are 1080x1350. Stacked on small screens (full content width) and
 * side by side from 640px, inside the 72rem container, so a 2x display is at
 * or under the file's native width.
 */
export function HeadlightBeforeAfter() {
  return (
    <section aria-labelledby="headlight-restoration-heading" className="metal-inset">
      <Container className="py-16 sm:py-20">
        <Eyebrow>Recent work</Eyebrow>
        <h2
          id="headlight-restoration-heading"
          className="mt-3 scroll-mt-32 font-display text-3xl font-bold tracking-tight text-metal sm:text-4xl"
        >
          Headlight restoration: <Gold>before & after</Gold>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Two views of a pickup truck&rsquo;s headlights, restored on site. Each
          pair is the same lens, before the haze was removed and after.
        </p>

        <ul className="mt-10 space-y-8 sm:space-y-10">
          {headlightRestorationPairs.map((pair, pairIndex) => (
            <li key={pair.id}>
              <h3 className="sr-only">{pair.label}</h3>
              <div className="grid items-start gap-4 sm:grid-cols-2 sm:gap-5">
                <ComparisonPhoto
                  image={pair.before}
                  label="Before"
                  eager={pairIndex === 0}
                  priority={pairIndex === 0}
                />
                <ComparisonPhoto image={pair.after} label="After" eager={pairIndex === 0} />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ComparisonPhoto({
  image,
  label,
  eager = false,
  priority = false,
}: {
  image: GalleryImage;
  label: "Before" | "After";
  eager?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-xl surface-machined edge-chrome shadow-card">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={90}
        sizes="(max-width: 639px) calc(100vw - 2.5rem), 540px"
        className="h-auto w-full"
        // priority already disables lazy loading; don't pass both.
        {...(priority ? { priority: true } : { loading: eager ? "eager" : "lazy" })}
      />
      <figcaption className="border-t border-hairline px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-chrome">
        {label}
      </figcaption>
    </figure>
  );
}
