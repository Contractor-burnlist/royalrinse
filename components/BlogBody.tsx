import Image from "next/image";
import Link from "next/link";
import type { BlogBlock } from "@/lib/blog";

/**
 * Renders a post's block array.
 *
 * Blocks are data, not HTML, so nothing here needs dangerouslySetInnerHTML and
 * a post can never inject markup. The inline grammar is just **bold** and
 * [label](/path) internal links — see lib/blog.ts.
 */

/**
 * Splits text into plain runs, **bold** runs, and [label](/path) links.
 *
 * The capturing split keeps the delimiters as their own array entries, so each
 * piece is then classified. Link hrefs are required to be root-relative ("/…")
 * — an external URL would need target/rel handling this blog doesn't use, so
 * the pattern simply won't match one.
 */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)]+\))/g;

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, index) => {
        if (!part) return null;

        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {bold[1]}
            </strong>
          );
        }

        const link = /^\[([^\]]+)\]\((\/[^)]+)\)$/.exec(part);
        if (link) {
          return (
            <Link
              key={index}
              href={link[2]}
              className="font-medium text-royal underline decoration-royal/40 underline-offset-2 transition-colors hover:text-chrome hover:decoration-chrome/60"
            >
              {link[1]}
            </Link>
          );
        }

        return part;
      })}
    </>
  );
}

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    /**
     * Readability constraint. The `ch` unit is the advance of "0", wider than
     * the average prose glyph, so this over-counts: measured on the rendered
     * page, 54ch lands at ~70 actual characters a line — inside the comfortable
     * 45–75 range. (68ch was ~86, 60ch ~79 — both too wide.) Deliberately
     * narrower than the page container.
     */
    <div className="max-w-[54ch] text-base leading-[1.75] text-muted sm:text-[1.0625rem]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                // Generous top margin is what gives long copy its rhythm; the
                // first block never needs it.
                className="mt-14 font-display text-2xl font-bold tracking-tight text-ink first:mt-0 sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={index}
                className="mt-9 font-display text-lg font-bold tracking-tight text-chrome first:mt-0 sm:text-xl"
              >
                {block.text}
              </h3>
            );

          case "ul":
            return (
              <ul key={index} className="mt-5 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-royal"
                    />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "image": {
            // Unresolved filename: skip the block rather than render a broken
            // frame. See the `image` note in lib/blog.ts.
            if (!block.image) return null;

            return (
              <figure key={index} className="mt-8">
                {/**
                 * 4:5 rather than the sources' own 9:16. These are phone shots,
                 * and a full-height portrait in the middle of an article pushes
                 * the copy either side of it off the screen. 4:5 still reads as
                 * a portrait photo without taking a whole viewport.
                 */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-hairline bg-surface">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    fill
                    loading="lazy"
                    quality={85}
                    /**
                     * The reading column, not the viewport: this div sits
                     * inside BlogBody's max-w-[54ch], which measures ~520px at
                     * the rendered body size. Below the container's breakpoint
                     * the column is simply the page width less its gutters.
                     */
                    sizes="(max-width: 640px) 92vw, 520px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                  {block.caption}
                </figcaption>
              </figure>
            );
          }

          case "callout":
            return (
              <p
                key={index}
                className="mt-8 rounded-xl border border-hairline border-l-2 border-l-royal bg-surface px-5 py-4 text-base font-medium leading-relaxed text-chrome"
              >
                <Inline text={block.text} />
              </p>
            );

          case "table":
            return (
              /**
               * The frame owns the horizontal scroll, so a table wider than the
               * reading column scrolls inside its own box instead of pushing the
               * page sideways. min-w keeps columns legible; below it, scroll.
               */
              <div
                key={index}
                className="mt-8 overflow-x-auto rounded-xl border border-hairline"
              >
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-hairline bg-surface">
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          scope="col"
                          className="px-4 py-3 font-display font-semibold text-ink"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-hairline last:border-0"
                      >
                        {row.map((cell, cellIndex) =>
                          // First column is the row label — treated as a header
                          // cell and given more emphasis than the data cells.
                          cellIndex === 0 ? (
                            <th
                              key={cellIndex}
                              scope="row"
                              className="px-4 py-3 text-left align-top font-medium text-chrome"
                            >
                              <Inline text={cell} />
                            </th>
                          ) : (
                            <td
                              key={cellIndex}
                              className="px-4 py-3 align-top text-muted"
                            >
                              <Inline text={cell} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return (
              <p key={index} className="mt-5 first:mt-0">
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
