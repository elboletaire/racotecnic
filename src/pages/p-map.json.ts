import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";

/** WordPress post id (`?p=<id>`) → post URL, for `components/WordpressRedirect.astro`. */
export async function GET() {
  const posts = getSortedPosts(await getCollection("posts"));
  const map: Record<string, string> = {};

  for (const post of posts) {
    const url = getPostUrl(post.id);
    if (post.data.wordpress_id !== undefined) {
      map[String(post.data.wordpress_id)] = url;
    }
    for (const from of post.data.redirect_from) {
      const id = from.match(/^\?p=(\d+)\/?$/)?.[1];
      if (id) map[id] = url;
    }
  }

  return new Response(JSON.stringify(map), {
    headers: { "Content-Type": "application/json" },
  });
}
