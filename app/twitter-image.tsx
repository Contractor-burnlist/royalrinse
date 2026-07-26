// Twitter/X share image reuses the same branded card as Open Graph.
// runtime must be a direct string literal (Next can't read a re-exported one).
export const runtime = "nodejs";
export { default, alt, size, contentType } from "./opengraph-image";
