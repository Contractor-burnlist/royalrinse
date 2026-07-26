import type { BlogBlock } from "@/lib/blog";

/**
 * Renders a post's block array.
 *
 * Blocks are data, not HTML, so nothing here needs dangerouslySetInnerHTML and
 * a post can never inject markup. The only inline syntax is **bold**; adding
 * more means adding a parser, so resist it unless a post genuinely needs it.
 */

/** Splits on **bold** runs. Odd indices are the bold ones. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
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

          case "callout":
            return (
              <p
                key={index}
                className="mt-8 rounded-xl border border-hairline border-l-2 border-l-royal bg-surface px-5 py-4 text-base font-medium leading-relaxed text-chrome"
              >
                <Inline text={block.text} />
              </p>
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
