/* eslint-disable no-console -- CLI script, its output is the point */
// Checks that every root-relative src/href in dist/ HTML points to a file in
// dist/ (uploads, tutorials, pagefind...) or to a built route, i.e. dist/<path>/index.html
// or dist/<path>.html. Run after `pnpm build`.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("dist/ not found, run `pnpm build` first");
  process.exit(1);
}

const walk = dir =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const exists = path => {
  const file = join(dist, path);
  if (path.endsWith("/")) return existsSync(join(file, "index.html"));
  return existsSync(file) || existsSync(join(file, "index.html")) || existsSync(`${file}.html`);
};

const refPattern = /\s(?:src|href)="(\/(?!\/)[^"<>\s]*)"/g;
const misses = new Map();
let refs = 0;

for (const html of walk(dist).filter(file => file.endsWith(".html"))) {
  const source = relative(dist, html);
  for (const [, raw] of readFileSync(html, "utf8").matchAll(refPattern)) {
    const path = decodeURIComponent(raw.split(/[?#]/)[0]).normalize("NFC");
    refs++;
    if (exists(path)) continue;
    if (!misses.has(path)) misses.set(path, []);
    misses.get(path).push(source);
  }
}

if (misses.size > 0) {
  console.error(`${misses.size} missing root-relative targets (${refs} references checked):`);
  for (const [path, sources] of misses) {
    console.error(`  ${path}`);
    for (const source of [...new Set(sources)].slice(0, 3)) console.error(`    in ${source}`);
  }
  process.exit(1);
}

console.log(`All ${refs} root-relative references resolve in dist/`);
