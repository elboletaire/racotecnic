/* eslint-disable no-console -- CLI script, its output is the point */
// Checks that every old URL listed in tests/old-urls.txt and
// tests/old-taxonomy-urls.txt was built to dist/<path>/index.html (redirect
// pages included). Run after `pnpm build`.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("dist/ not found, run `pnpm build` first");
  process.exit(1);
}

const lists = ["old-urls.txt", "old-taxonomy-urls.txt"];
const urls = lists.flatMap(file =>
  readFileSync(join(root, "tests", file), "utf8")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
);

const misses = urls.filter(url => {
  const dir = decodeURIComponent(url).normalize("NFC");
  return !existsSync(join(dist, dir, "index.html"));
});

if (misses.length > 0) {
  console.error(`${misses.length} of ${urls.length} old URLs missing:`);
  for (const url of misses) console.error(`  ${url}`);
  process.exit(1);
}

console.log(`All ${urls.length} old URLs found in dist/`);
