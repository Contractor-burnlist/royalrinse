import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { formatPostDate, readingMinutes, sortedPosts } from "@/lib/blog";
import { SERVICE_AREA_LINE } from "@/lib/site";
import { QuoteCta } from "@/components/QuoteCta";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Car Detailing Blog | Royal Rinse Mobile Detailing",
  description:
    "Detailing advice from Royal Rinse — ceramic coating, paint correction and mobile detailing tips for drivers across Riverside & San Diego County.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <div className="border-b border-hairline bg-charcoal">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Detailing, explained
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Straight answers about paint, protection, and keeping a car looking
            its best — from the people doing the work in driveways across{" "}
            {SERVICE_AREA_LINE}.
          </p>
        </Container>
      </div>

      <Section>
        {sortedPosts.length > 0 ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post, index) => (
              <li key={post.slug}>
                <Reveal delay={index * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-royal/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-base"
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
                          className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex items-center gap-2 text-xs font-medium text-muted">
                        <time dateTime={post.date}>
                          {formatPostDate(post.date)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{readingMinutes(post)} min read</span>
                      </p>

                      <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-royal">
                        {post.title}
                      </h2>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors group-hover:text-ink">
                        Read article
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-muted">
            New articles are on the way — check back soon.
          </p>
        )}
      </Section>

      <QuoteCta />
    </>
  );
}
