import { getRelativeLocaleUrl } from "astro:i18n";
import config from "@/config";

export type PostPermalink = {
  year: string;
  month: string;
  slug: string;
};

/**
 * Splits a post id ("2008-12-18-instal%c2%b7lar-ubuntu-server") into the
 * `/YYYY/MM/<slug>/` parts of its old WordPress permalink. The slug is percent-
 * decoded so it matches the URLs people already have ("instal·lar-ubuntu-server").
 */
export function getPostPermalink(id: string): PostPermalink {
  const match = id.match(/^(\d{4})-(\d{2})-\d{2}-(.+)$/);
  if (!match) {
    throw new Error(`Post id "${id}" must start with YYYY-MM-DD-`);
  }
  const [, year, month, rawSlug] = match;
  return { year, month, slug: decodeURIComponent(rawSlug) };
}

/** Absolute-path URL of a post, e.g. `/2008/12/instal·lar-ubuntu-server/`. */
export function getPostUrl(
  id: string,
  locale: string = config.site.lang
): string {
  const { year, month, slug } = getPostPermalink(id);
  return getRelativeLocaleUrl(locale, `${year}/${month}/${slug}/`);
}
