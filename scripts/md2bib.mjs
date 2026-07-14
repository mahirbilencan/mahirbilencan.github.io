// Converts the legacy Astro publication markdown files (src/content/publications/*.md)
// into _bibliography/papers.bib for jekyll-scholar / al-folio.
// Run from repo root: node scripts/md2bib.mjs > _bibliography/papers.bib
// The 3 edited books (orders 301-303) are hand-written below; the markdown
// titles embed "(co-edited with ...)" which belongs in the editor field.
import { readFileSync, readdirSync } from "node:fs";

const DIR = "src/content/publications";
const SELECTED_ORDERS = new Set([7, 9, 11, 16, 17]);
const STOPWORDS = new Set(
  "a an the on of from in to and for with using their some into over".split(" ")
);

const HANDWRITTEN_BOOKS = `
@book{can2024glimpse,
  bibtex_show = {true},
  editor = {Can, Mahir Bilen and Feldvoss, J{\\"o}rg},
  title = {A Glimpse into Geometric Representation Theory},
  series = {Contemporary Mathematics},
  volume = {804},
  publisher = {American Mathematical Society},
  address = {Providence, RI},
  year = {2024},
  isbn = {978-1-4704-7090-6}
}

@book{can2017algebraic,
  bibtex_show = {true},
  editor = {Can, Mahir Bilen},
  title = {Algebraic Groups: Structure and Actions},
  series = {Proceedings of Symposia in Pure Mathematics},
  volume = {94},
  publisher = {American Mathematical Society},
  address = {Providence, RI},
  year = {2017},
  isbn = {978-1-4704-2601-9}
}

@book{can2014algebraic,
  bibtex_show = {true},
  editor = {Can, Mahir Bilen and Li, Zhenheng and Steinberg, Benjamin and Wang, Qiang},
  title = {Algebraic Monoids, Group Embeddings, and Algebraic Combinatorics},
  series = {Fields Institute Communications},
  volume = {71},
  publisher = {Springer},
  year = {2014},
  doi = {10.1007/978-1-4939-0938-4}
}
`.trim();

function fm(text, key) {
  const m = text.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"));
  return m ? m[1] : undefined;
}
function link(text, key) {
  const m = text.match(new RegExp(`^\\s{2,}${key}:\\s*"(.*?)"`, "m"));
  return m ? m[1] : undefined;
}
// "19?23" style mojibake from a lost dash becomes a plain hyphen
const fixDashes = (s) => s.replace(/(\d)\?(\d)/g, "$1-$2");
const escapeTex = (s) => s.replace(/([&%#_])/g, "\\$1");

function flipName(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts.pop();
  const flipped = `${last}, ${parts.join(" ")}`;
  if (parts.length > 2) console.error(`REVIEW surname guess: "${name}" -> "${flipped}"`);
  return flipped;
}
function bibAuthors(raw) {
  return raw
    .split(/;|,| and /)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(flipName)
    .join(" and ");
}
function bibKey(year, title, used) {
  const word =
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .split(/[\s-]+/)
      .find((w) => w && !STOPWORDS.has(w)) || "entry";
  let key = `can${year}${word}`;
  let suffix = "";
  while (used.has(key + suffix)) suffix = suffix ? String.fromCharCode(suffix.charCodeAt(0) + 1) : "b";
  used.add(key + suffix);
  return key + suffix;
}

const used = new Set();
const entries = [];
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".md")).sort()) {
  const raw = readFileSync(`${DIR}/${f}`, "utf8");
  const body = raw.match(/^---\n([\s\S]*?)\n---/)[1];
  const kind = fm(body, "kind");
  const order = Number(fm(body, "order"));
  if (kind === "book") {
    console.error(`SKIP (hand-written book): ${f}`);
    continue;
  }
  const title = escapeTex(fixDashes(fm(body, "title")));
  const year = fm(body, "date").slice(0, 4);
  const venue = escapeTex(fixDashes(fm(body, "venue") || ""));
  const author = bibAuthors(fm(body, "authors") || "Mahir Bilen Can");
  const doi = link(body, "doi")?.replace(/^https?:\/\/(dx\.)?doi\.org\//, "");
  const arxivUrl = link(body, "arxiv");
  const arxiv = arxivUrl?.match(/(\d{4}\.\d{4,5}|[a-z-]+\/\d{7})/)?.[1];
  const pdf = link(body, "pdf");
  const website = link(body, "website");

  const type = kind === "conference" ? "inproceedings" : kind === "submitted" ? "unpublished" : "article";
  const fields = [["bibtex_show", "true"], ["author", author], ["title", title], ["year", year]];
  if (kind === "journal" || kind === "preprint") fields.push(["journal", venue]);
  if (kind === "conference") fields.push(["booktitle", venue]);
  if (kind === "submitted") fields.push(["note", "Submitted"]);
  if (doi) fields.push(["doi", doi]);
  if (arxiv) fields.push(["arxiv", arxiv]);
  if (pdf && !/arxiv\.org/.test(pdf)) fields.push(["pdf", pdf]);
  if (website) fields.push(["html", website]);
  if (SELECTED_ORDERS.has(order)) fields.push(["selected", "true"]);

  const key = bibKey(year, fm(body, "title"), used);
  const text = `@${type}{${key},\n${fields.map(([k, v]) => `  ${k} = {${v}}`).join(",\n")}\n}`;
  entries.push({ order, text });
}

entries.sort((a, b) => a.order - b.order);
process.stdout.write(entries.map((e) => e.text).join("\n\n") + "\n\n" + HANDWRITTEN_BOOKS + "\n");
console.error(`Wrote ${entries.length} converted entries + 3 hand-written books.`);
