import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

// WordPress exports dates as "2008-12-18 13:45:48 +0100".
const parseWordpressDate = (value: string) =>
  new Date(
    value.replace(
      /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/,
      "$1T$2$3:$4"
    )
  );

const wordpressDate = z
  .union([z.date(), z.string()])
  .transform(value =>
    value instanceof Date ? value : parseWordpressDate(value)
  );

const posts = defineCollection({
  // Keep the file name as id: it carries the date and the (percent-encoded)
  // slug that the old WordPress URLs are built from, see utils/getPostPaths.ts
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: `./${BLOG_PATH}`,
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ""),
  }),
  schema: z
    .object({
      title: z.string(),
      date: wordpressDate.optional(),
      modified: wordpressDate.optional(),
      excerpt: z.string().optional(),
      categories: z.array(z.coerce.string()).default([]),
      tags: z.array(z.coerce.string()).default([]),
      wordpress_id: z.coerce.number().optional(),
      redirect_from: z.array(z.string()).default([]),
      published: z.boolean().default(true),
      status: z.string().optional(),
      featured: z.boolean().optional(),
      ogImage: z.string().optional(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    })
    // Unknown front matter (WordPress author, layout, comments...) is dropped.
    .transform(
      ({ date, modified, excerpt, published, status, ...data }, ctx) => {
        const pubDatetime = date ?? modified;
        if (!pubDatetime) {
          ctx.addIssue({ code: "custom", message: "Missing date" });
          return z.NEVER;
        }
        const isDraft =
          !published || (status !== undefined && status !== "publish");
        return {
          ...data,
          author: config.site.author,
          pubDatetime,
          modDatetime:
            modified && modified > pubDatetime ? modified : undefined,
          description: excerpt,
          draft: isDraft,
        };
      }
    ),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
