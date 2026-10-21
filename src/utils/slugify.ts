/**
 * Accent mapping of the old Jekyll `removeaccents` filter, same letters and order.
 */
const ACCENTS: [letter: string, codes: number[]][] = [
  ["E", [200, 201, 202, 203]],
  ["e", [232, 233, 234, 235]],
  ["A", [192, 193, 194, 195, 196, 197]],
  ["a", [224, 225, 226, 227, 228, 229, 230]],
  ["C", [199]],
  ["c", [231]],
  ["O", [210, 211, 212, 213, 214, 216]],
  ["o", [242, 243, 244, 245, 246, 248]],
  ["I", [204, 205, 206, 207]],
  ["i", [236, 237, 238, 239]],
  ["U", [217, 218, 219, 220]],
  ["u", [249, 250, 251, 252]],
  ["N", [209]],
  ["n", [241]],
  ["Y", [221]],
  ["y", [253, 255]],
  ["AE", [306]],
  ["ae", [346]],
  ["OE", [188]],
  ["oe", [189]],
];

/**
 * Slug used in `/etiqueta/<slug>/` and `/categoria/<slug>/`: a port of the
 * `urlize` filter of the old Jekyll site (_plugins/text_filters.rb), so the old
 * URLs still match. Accents are removed, the string is lowercased, spaces become
 * dashes and every other character outside [-_A-Za-z0-9] is dropped
 * ("Domains & Hosting" → "domains-hosting", "CakePHP 1.2" → "cakephp-12").
 */
export const slugifyStr = (str: string): string => {
  let out = str.trim();
  for (const [letter, codes] of ACCENTS) {
    out = out.replace(
      new RegExp(`[${String.fromCodePoint(...codes)}]`, "g"),
      letter
    );
  }
  return out
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^-_A-Za-z0-9]/g, "")
    .replace(/-+/g, "-");
};

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
