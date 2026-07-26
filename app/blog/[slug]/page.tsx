import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, posts, readingMinutes } from "@/lib/blog";
import { PHONE_ARIA, SERVICE_AREA_LINE, site, telHref } from "@/lib/site";
import { absoluteUrl } from "@/lib/url";
import { BlogBody } from "@/components/BlogBody";
import { BookNowButton } from "@/components/BookNowButton";
import { ButtonAnchor, Container, Eyebrow, Section } from "@/components/ui";

type Params = { slug: string };

/** Every post is a static page — no runtime rendering for content that never changes. */
export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  const canonical = `/blog/${post.slug}`;

  return {
    title: `${post.title} | Royal Rinse`,
    description: post.excerpt.slice(0, 155),
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt.slice(0, 155),
      url: canonical,
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage.src }] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  /**
   * BlogPosting schema. Kept to fields we can state truthfully — there is no
   * dateModified because we don't track edits, and no fabricated publisher
   * logo dimensions. Google is happier with fewer accurate fields than with
   * invented ones.
   */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    // Absolute — crawlers resolve JSON-LD URLs from their own origin, so a
    // bare "/blog/x" here is either ignored or resolved against the wrong host.
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    ...(post.coverImage ? { image: [absoluteUrl(post.coverImage.src)] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <div className="border-b border-hairline bg-charcoal">
          <Container className="py-16 sm:py-20">
            <Eyebrow>Blog</Eyebrow>

            <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <span className="text-chrome">{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(post)} min read</span>
            </p>

            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-chrome"
            >
              <span aria-hidden="true">←</span>
              All articles
            </Link>
          </Container>
        </div>

        {post.coverImage ? (
          <Container className="pt-10 sm:pt-14">
            {/* 21:9 keeps a portrait source from eating the fold while still
                reading as a banner. Sized to the container, never the viewport. */}
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-chrome/20 shadow-2xl">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1152px) 92vw, 1088px"
                className="object-cover object-center"
              />
            </div>
          </Container>
        ) : null}

        <Section className="!pb-0 !pt-12 sm:!pt-16">
          <BlogBody blocks={post.body} />
        </Section>
      </article>

      {/* Closing CTA band. */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface px-6 py-14 text-center shadow-card sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-royal/25 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Want this done to your car?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted">
              We come to you anywhere in {SERVICE_AREA_LINE}. Call or book
              online and we&rsquo;ll quote the right level for your vehicle.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonAnchor href={telHref} aria-label={PHONE_ARIA}>
                Call {site.phone}
              </ButtonAnchor>
              <BookNowButton variant="secondary" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
