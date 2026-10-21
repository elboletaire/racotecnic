import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { slugifyStr } from "./slugify";

type Term = {
  tag: string;
  tagName: string;
};

/**
 * Builds a de-duplicated, sorted list of tags (or categories) from posts.
 *
 * - Drafts and scheduled posts are excluded via `postFilter()`
 * - `tag` is the slug used in URLs; `tagName` is the original label for display
 * - Uniqueness is based on the slug (so differently-cased labels collapse)
 */
export function getUniqueTags(
  posts: CollectionEntry<"posts">[],
  field: "tags" | "categories" = "tags"
) {
  const tags: Term[] = posts
    .filter(postFilter)
    .flatMap(post => post.data[field])
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
}
