import Image from "next/image";
import Link from "next/link";
import { formatPostDate, readingMinutes, type BlogPost } from "@/lib/blog";

/** Cover, date, title and excerpt for one post. Used on /blog and the homepage. */
export function BlogCard({
  post,
  headingAs: Heading = "h2",
}: {
  post: BlogPost;
  /** h2 on the blog index, h3 where the card sits under a section heading. */
  headingAs?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden sheen edge-chrome metal-soft rounded-xl transition-transform duration-300 motion-safe:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-chrome-bright focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {post.coverImage ? (
        <div className="relative aspect-[3/2] overflow-hidden border-b border-hairline">
          <Image
            src={post.coverImage.src}
            alt=""
            aria-hidden="true"
            fill
            // Real card width in the 3-col grid, not the viewport.
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            quality={85}
            className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-motion-safe:hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-medium text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post)} min read</span>
        </p>

        <Heading className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-chrome-bright">
          {post.title}
        </Heading>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-chrome-bright transition-colors group-hover:text-ink">
          Read article
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
