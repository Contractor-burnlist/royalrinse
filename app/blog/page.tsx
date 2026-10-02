import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { sortedPosts } from "@/lib/blog";
import { SERVICE_AREA_LINE } from "@/lib/site";
import { BlogCard } from "@/components/BlogCard";
import { QuoteCta } from "@/components/QuoteCta";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = buildMetadata({
  title: "Car Detailing Blog | Royal Rinse Mobile Detailing",
  description:
    "Detailing advice from Royal Rinse: ceramic coating, paint correction and mobile detailing tips for drivers across Riverside & San Diego County.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <div className="surface-brushed rule-chrome-b">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-metal sm:text-5xl">
            Detailing, explained
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Straight answers about paint, protection, and keeping a car looking
            its best, from the people doing the work in driveways across{" "}
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
                  <BlogCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-muted">
            New articles are on the way. Check back soon.
          </p>
        )}
      </Section>

      <QuoteCta />
    </>
  );
}
