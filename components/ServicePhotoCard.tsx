import Image from "next/image";
import Link from "next/link";
import type { GalleryImage } from "@/lib/gallery";
import { Icon } from "@/components/ui";

/**
 * Tier card with a real photo behind it. The gradient is opaque at the bottom
 * where the text sits, so copy stays readable over any image.
 */
export function ServicePhotoCard({
  name,
  tagline,
  href,
  icon,
  image,
  featured = false,
}: {
  name: string;
  tagline: string;
  href: string;
  icon: string;
  image: GalleryImage;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[22rem] flex-col justify-end overflow-hidden edge-chrome rounded-2xl shadow-card transition-transform duration-300 motion-safe:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
        featured ? "edge-accent" : ""
      }`}
    >
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        quality={85}
        // Matches the real card width (~346px in a 3-col grid), not the
        // viewport — so the browser fetches a small file and nothing upscales.
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 24vw"
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-motion-safe:hover:scale-110"
      />

      {/* Readability wash: solid page colour under the copy (bottom 40%), so the
          dark text never sits on the photo itself; the photo shows clear above. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-canvas from-40% via-canvas/90 via-60% to-canvas/10"
      />

      <div className="relative p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl btn-metal text-chrome">
          <Icon name={icon} className="h-5 w-5" />
        </span>

        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-chrome">{tagline}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-ink">
          Learn more
          <span
            aria-hidden="true"
            className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
