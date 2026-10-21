/* eslint-disable no-console -- CLI script, its output is the point */
// Exports the comments archived from the old WordPress site to
// src/data/comments/<wordpress_id>.json, one file per post. They are read at
// build time by src/components/ArchivedComments.astro.
//
// The WordPress database is not in this repo. It is only read through a
// throwaway MariaDB container, to re-run:
//
//   docker run --rm -d --name raco-export -e MARIADB_ROOT_PASSWORD=<pw> \
//     -e MARIADB_DATABASE=racotecnic mariadb:11.8.9
//   zcat racotecnic-db-2026-10-21.sql.gz | docker exec -i raco-export \
//     sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" --default-character-set=utf8mb4 racotecnic'
//   node scripts/export-comments.mjs
//   docker stop raco-export
//
// Set RACO_DB_CONTAINER to use another container name. Only approved regular
// comments are exported (no pingbacks, trackbacks, spam or trash). The author
// email, IP, user agent and author URL are never written. The source is
// untrusted: `content` goes through an allowlist sanitizer and the output is
// checked again before writing. Spam-looking comments are reported, not dropped.
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sanitizeHtml from "sanitize-html";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const postsDir = join(root, "src/content/posts");
const outDir = join(root, "src/data/comments");
const container = process.env.RACO_DB_CONTAINER ?? "raco-export";
const timeZone = "Europe/Madrid";

// Comments dropped by hand: generic spam whose payload was the dropped author URL.
const EXCLUDED_IDS = new Set([36381, 32473, 32747]);

const ALLOWED_TAGS = [
  "p",
  "br",
  "a",
  "em",
  "strong",
  "b",
  "i",
  "code",
  "pre",
  "blockquote",
  "ul",
  "ol",
  "li",
];

// WordPress stores comments as plain text with raw newlines. This mirrors
// wpautop: blank lines start a new paragraph, single newlines become <br>.
// Chunks with block markup (blockquotes from reply quotes) are not wrapped,
// as <p> cannot contain them.
const BLOCK_MARKUP = /<(blockquote|pre|ul|ol|p|div)[\s>]/i;

function wpautop(text) {
  return text
    .replace(/\r\n?/g, "\n")
    .trim()
    .split(/\n\s*\n+/)
    .map(chunk =>
      BLOCK_MARKUP.test(chunk) ? chunk : `<p>${chunk.replace(/\n/g, "<br>")}</p>`
    )
    .join("\n");
}

function safeHref(href) {
  if (!href) return undefined;
  try {
    const url = new URL(href.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

// Anchors that are neither an http(s) link nor a reply to a comment of the
// same post are unwrapped to their text, so no dead link is left behind.
function sanitizeContent(text, commentIds) {
  const marked = sanitizeHtml(wpautop(text), {
    // `span` is only a placeholder for anchors to unwrap, removed below.
    allowedTags: [...ALLOWED_TAGS, "span"],
    allowedAttributes: { a: ["href", "rel"] },
    allowedSchemes: ["http", "https"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attribs) => {
        const reply = attribs.href?.match(/^#comment-(\d+)$/);
        if (reply && commentIds.has(Number(reply[1]))) {
          return { tagName: "a", attribs: { href: attribs.href } };
        }
        const href = safeHref(attribs.href);
        if (href) {
          return {
            tagName: "a",
            attribs: { href, rel: "nofollow ugc noopener" },
          };
        }
        return { tagName: "span", attribs: {} };
      },
    },
  });
  return sanitizeHtml(marked, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ["href", "rel"] },
    allowedSchemes: ["http", "https"],
    allowProtocolRelative: false,
  });
}

const SPAM_WORDS =
  /\b(viagra|cialis|levitra|pharmac\w*|casino|poker|payday|loans?|forex|bitcoin|porn\w*|replica|backlink)\b/i;

// Binary junk left in some rows of the database (the old site was compromised).
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function spamReasons(rawText) {
  const reasons = [];
  const links = (rawText.match(/https?:\/\//gi) ?? []).length;
  if (links >= 3) reasons.push(`${links} links`);
  const word = rawText.match(SPAM_WORDS);
  if (word) reasons.push(`keyword "${word[0]}"`);
  return reasons;
}

// Output must only ever contain the allowlist; this fails the export if not.
// Tags and attributes are checked, not plain text: comments may say "javascript:".
const UNSAFE = [
  /<\/?(script|iframe)\b/i,
  /<[^>]*\son\w+\s*=/i,
  /<a\b[^>]*\shref="(?!https?:\/\/|#comment-\d+")/i,
];
const TAG = /<\/?([a-z][a-z0-9]*)\b/gi;

function isUnsafe(html) {
  if (UNSAFE.some(pattern => pattern.test(html))) return true;
  return [...html.matchAll(TAG)].some(
    ([, tag]) => !ALLOWED_TAGS.includes(tag.toLowerCase())
  );
}

// WordPress dates are in the blog's time zone, comment_date_gmt is UTC.
function toMadridIso(gmt) {
  const instant = new Date(`${gmt.replace(" ", "T")}Z`);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(instant)
      .map(({ type, value }) => [type, value])
  );
  const local = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  const offset = (Date.parse(`${local}Z`) - instant.getTime()) / 60_000;
  const abs = Math.abs(offset);
  const pad = value => String(value).padStart(2, "0");
  const sign = offset < 0 ? "-" : "+";
  return `${local}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

// Front matter `wordpress_id` of every post, by id.
function postsByWordpressId() {
  const map = new Map();
  for (const file of readdirSync(postsDir)) {
    if (!file.endsWith(".md")) continue;
    const source = readFileSync(join(postsDir, file), "utf8");
    const frontMatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const id = frontMatter.match(/^wordpress_id:\s*(\d+)\s*$/m)?.[1];
    if (!id) continue;
    if (map.has(id)) throw new Error(`Duplicate wordpress_id ${id} in ${file}`);
    map.set(id, file);
  }
  return map;
}

function readComments() {
  const sql = `
    SELECT comment_ID, comment_post_ID, comment_parent, comment_date_gmt,
      HEX(comment_author), HEX(comment_content)
    FROM ra_comments
    WHERE comment_approved = '1' AND comment_type = ''
    ORDER BY comment_post_ID, comment_date_gmt, comment_ID;`;
  // Credentials stay inside the container, where the image defines them.
  const output = execFileSync(
    "docker",
    [
      "exec",
      "-i",
      container,
      "sh",
      "-c",
      'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" --default-character-set=utf8mb4 -N -B racotecnic',
    ],
    { input: sql, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 }
  );
  // HEX, not TO_BASE64: base64 is wrapped every 76 characters.
  const decode = hex => Buffer.from(hex, "hex").toString("utf8");
  return output
    .split("\n")
    .filter(Boolean)
    .map(line => {
      const [id, postId, parent, gmt, author, content] = line.split("\t");
      return {
        id: Number(id),
        postId,
        parent: Number(parent),
        gmt,
        author: decode(author),
        content: decode(content),
      };
    });
}

const posts = postsByWordpressId();
const allRows = readComments();
const rows = allRows.filter(row => !EXCLUDED_IDS.has(row.id));

// Reply links only point at comments exported for the same post.
const idsByPost = new Map();
for (const row of rows) {
  const ids = idsByPost.get(row.postId) ?? new Set();
  ids.add(row.id);
  idsByPost.set(row.postId, ids);
}

const byPost = new Map();
const flagged = [];
const unsafe = [];
const controlCharRows = [];

for (const row of rows) {
  const raw = row.content;
  const cleaned = raw.replace(CONTROL_CHARS, "");
  if (cleaned !== raw) controlCharRows.push(row.id);
  const content = sanitizeContent(cleaned, idsByPost.get(row.postId));
  if (isUnsafe(content)) unsafe.push(row.id);
  const reasons = spamReasons(raw);
  if (reasons.length > 0) flagged.push({ ...row, reasons });
  const list = byPost.get(row.postId) ?? [];
  list.push({
    id: row.id,
    parent: row.parent,
    author: row.author,
    date: toMadridIso(row.gmt),
    content,
  });
  byPost.set(row.postId, list);
}

if (unsafe.length > 0) {
  throw new Error(`Unsafe markup left in comments: ${unsafe.join(", ")}`);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const unmatched = [];
for (const [postId, list] of byPost) {
  const file = posts.get(postId);
  if (!file) unmatched.push(postId);
  writeFileSync(
    join(outDir, `${postId}.json`),
    `${JSON.stringify(list, null, 2)}\n`
  );
}

console.log(`Comments excluded by id: ${allRows.length - rows.length}`);
console.log(`Comments exported: ${rows.length}`);
console.log(`Posts with comments: ${byPost.size}`);
console.log(
  `Posts without a wordpress_id in src/content/posts: ${unmatched.length ? unmatched.join(", ") : "none"}`
);
console.log(
  `Comments with control characters removed: ${controlCharRows.length} (${controlCharRows.join(", ")})`
);
console.log(`Flagged as spam-like (kept, review by hand): ${flagged.length}`);
for (const { id, postId, reasons } of flagged) {
  console.log(`  comment ${id} (post ${postId}): ${reasons.join("; ")}`);
}
