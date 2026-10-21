import type { CollectionEntry } from "astro:content";

const DESCRIPTION_LENGTH = 160;

/**
 * The post's excerpt, or when it has none (57 posts), the start of its body
 * as plain text.
 */
export function getPostDescription(
  post: Pick<CollectionEntry<"posts">, "data" | "body">
): string {
  if (post.data.description) return post.data.description;

  const text = (post.body ?? "")
    .replace(/^\s*\[[^\]]+\]:.*$/gm, " ") // reference link definitions
    .replace(/^\s*\{:.*$/gm, " ") // kramdown attribute lines
    .replace(/<[^>]+>/g, " ") // raw HTML
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // inline links and images
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1") // reference links
    .replace(/\{\{[^}]*\}\}/g, " ") // Jekyll template tags
    .replace(/[*_`#>~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= DESCRIPTION_LENGTH) return text;
  const cut = text.slice(0, DESCRIPTION_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,;:]$/, "")}…`;
}
