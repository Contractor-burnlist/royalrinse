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
      className={`group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl border shadow-card transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
        featured ? "border-royal/50 shadow-glow" : "border-hairline hover:border-royal/50"
      }`}
    >
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        quality={85}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
      />

      {/* Readability scrim — deepens on hover. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-base via-base/85 to-base/25 transition-opacity duration-500 group-hover:from-base group-hover:via-base/75"
      />

      <div className="relative p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-base/60 text-royal backdrop-blur-sm">
          <Icon name={icon} className="h-5 w-5" />
        </span>

        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-chrome">{tagline}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors group-hover:text-ink">
          Learn more
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
