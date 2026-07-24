#!/usr/bin/env node
/**
 * generate-docs.mjs
 *
 * Fetches STANDARD.md and ERRORS.md from the Grayscale repo (or reads local copies)
 * and generates Starlight-compatible markdown pages + errors.json.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const STANDARD_URL = 'https://raw.githubusercontent.com/grayscale-lang/grayscale/main/STANDARD.md';
const ERRORS_URL = 'https://raw.githubusercontent.com/grayscale-lang/grayscale/main/ERRORS.md';

// Local fallback paths (for development when working alongside the Grayscale repo)
const LOCAL_STANDARD = join(ROOT, '..', 'Grayscale', 'STANDARD.md');
const LOCAL_ERRORS = join(ROOT, '..', 'Grayscale', 'ERRORS.md');

// Output directories
const DOCS_DIR = join(ROOT, 'src', 'content', 'docs');
const DATA_DIR = join(ROOT, 'src', 'data');

// ─── Section mapping ────────────────────────────────────────────────────────

const SECTION_MAP = {
  '1': { slug: 'overview', dir: '', label: 'Overview', group: 'Getting Started', order: 1 },
  '2': { slug: 'lexical-structure', dir: 'language', label: 'Lexical Structure', group: 'Language', order: 1 },
  '3': { slug: 'types', dir: 'language', label: 'Types', group: 'Language', order: 2 },
  '4': { slug: 'variables', dir: 'language', label: 'Variables and Constants', group: 'Language', order: 3 },
  '5': { slug: 'expressions', dir: 'language', label: 'Expressions', group: 'Language', order: 4 },
  '6': { slug: 'statements', dir: 'language', label: 'Statements', group: 'Language', order: 5 },
  '7': { slug: 'functions', dir: 'language', label: 'Functions', group: 'Language', order: 6 },
  '8': { slug: 'modules', dir: 'language', label: 'Modules', group: 'Language', order: 7 },
  '10': { slug: 'error-handling', dir: 'language', label: 'Error Handling', group: 'Language', order: 8 },
  '11': { slug: 'memory-model', dir: 'language', label: 'Memory Model', group: 'Language', order: 9 },
  '12': { slug: 'program-execution', dir: 'language', label: 'Program Execution', group: 'Language', order: 10 },
  '13': { slug: 'commands', dir: 'cli', label: 'CLI Commands', group: 'CLI Reference', order: 1 },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

async function fetchContent(url, localPath) {
  // Try local first for faster dev builds
  if (existsSync(localPath)) {
    console.log(`  Using local: ${localPath}`);
    return readFileSync(localPath, 'utf-8');
  }
  console.log(`  Fetching: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function writePage(relPath, content) {
  const fullPath = join(DOCS_DIR, relPath);
  ensureDir(dirname(fullPath));
  writeFileSync(fullPath, content);
  console.log(`  Generated: src/content/docs/${relPath}`);
}

function makeFrontmatter(title, order) {
  return `---\ntitle: "${title}"\nsidebar:\n  order: ${order}\n---\n\n`;
}

/**
 * Strip section numbering from headings within body content.
 * Converts "### 9.2 Arrays Module ..." -> "### Arrays Module ..."
 * Converts "#### 9.2.1 ..." -> "#### ..."
 */
function stripNumbering(content) {
  return content.replace(/^(#{2,4})\s+\d+(?:\.\d+)*\.?\s+/gm, '$1 ');
}

/**
 * Downgrade heading levels within body content so subsections render properly.
 * Top-level ## becomes omitted (it's the page title).
 * ### becomes ##, #### becomes ###, etc.
 */
function downgradeHeadings(content) {
  return content.replace(/^(#{2,5})#\s/gm, '$1 ');
}

/**
 * Strip internal anchor links like [Section 4.5](#45-return-value-handling)
 * and replace with just the link text since cross-page anchors won't work.
 */
function fixInternalLinks(content) {
  return content.replace(/\[([^\]]+)\]\(#[\w-]+\)/g, '$1');
}

// ─── STANDARD.md Parser ────────────────────────────────────────────────────

function parseStandard(raw) {
  const lines = raw.split('\n');
  const pages = [];

  // Find all top-level section boundaries (## N. Title)
  const sectionStarts = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^## (\d+)\.\s+(.+)$/);
    if (match) {
      sectionStarts.push({ lineIndex: i, num: match[1], title: match[2] });
    }
  }

  for (let s = 0; s < sectionStarts.length; s++) {
    const { lineIndex, num, title } = sectionStarts[s];
    const nextStart = s + 1 < sectionStarts.length ? sectionStarts[s + 1].lineIndex : lines.length;
    // Body is everything after the ## heading, up to the next ## heading
    // Skip lines that are just "---" right after the heading
    let bodyStart = lineIndex + 1;
    while (bodyStart < nextStart && lines[bodyStart].trim() === '') bodyStart++;
    if (bodyStart < nextStart && lines[bodyStart].trim() === '---') bodyStart++;
    const bodyLines = lines.slice(bodyStart, nextStart);
    let body = bodyLines.join('\n').trim();

    if (num === '9') {
      // Section 9: split into individual stdlib module pages
      parseStdlibSection(body, pages);
    } else {
      const mapping = SECTION_MAP[num];
      if (!mapping) continue;

      body = stripNumbering(body);
      body = downgradeHeadings(body);
      body = fixInternalLinks(body);

      const relPath = mapping.dir
        ? `${mapping.dir}/${mapping.slug}.md`
        : `${mapping.slug}.md`;

      pages.push({
        path: relPath,
        content: makeFrontmatter(mapping.label, mapping.order) + body + '\n',
      });
    }
  }

  return pages;
}

function parseStdlibSection(body, pages) {
  const lines = body.split('\n');

  // Find all ### 9.N subsection boundaries
  const subStarts = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^### 9\.(\d+)\s+(.+)$/);
    if (match) {
      subStarts.push({ lineIndex: i, subNum: parseInt(match[1]), title: match[2] });
    }
  }

  // Also grab any intro text before the first subsection
  // (the "27 modules plus built-in functions" paragraph)

  for (let s = 0; s < subStarts.length; s++) {
    const { lineIndex, subNum, title } = subStarts[s];
    const nextStart = s + 1 < subStarts.length ? subStarts[s + 1].lineIndex : lines.length;
    let subBody = lines.slice(lineIndex + 1, nextStart).join('\n').trim();

    subBody = stripNumbering(subBody);
    // Stdlib content starts at #### level — downgrade twice to get ##
    subBody = downgradeHeadings(subBody);
    subBody = downgradeHeadings(subBody);
    subBody = fixInternalLinks(subBody);

    // Derive slug from title
    let slug, label;
    if (subNum === 1) {
      slug = 'builtins';
      label = 'Built-in Functions';
    } else {
      // Title format: "Arrays Module (`@arrays`)" -> slug: "arrays", label: "Arrays Module"
      const nameMatch = title.match(/`@(\w+)`/);
      slug = nameMatch ? nameMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Clean label: remove the backtick module name
      label = title.replace(/\s*\(`@\w+`\)/, '').trim();
    }

    pages.push({
      path: `stdlib/${slug}.md`,
      content: makeFrontmatter(label, subNum) + subBody + '\n',
    });
  }
}

// ─── ERRORS.md Parser ──────────────────────────────────────────────────────

function parseErrors(raw) {
  const errors = [];
  const lines = raw.split('\n');

  let currentType = null;

  for (const line of lines) {
    // Detect section headers
    if (line.startsWith('## Errors')) { currentType = 'error'; continue; }
    if (line.startsWith('## Warnings')) { currentType = 'warning'; continue; }
    if (line.startsWith('## Panics')) { currentType = 'panic'; continue; }
    if (line.startsWith('## Code Ranges')) break;

    if (!currentType) continue;

    // Parse table rows: | `E1003` | syntax | description |
    const match = line.match(/^\|\s*`([A-Z]\d+)`\s*\|\s*(\w[\w\s]*?)\s*\|\s*(.+?)\s*\|$/);
    if (match) {
      errors.push({
        code: match[1],
        category: match[2].trim(),
        message: match[3].trim(),
        type: currentType,
      });
    }
  }

  return errors;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('Generating docs from STANDARD.md and ERRORS.md...\n');

  const [standardMd, errorsMd] = await Promise.all([
    fetchContent(STANDARD_URL, LOCAL_STANDARD),
    fetchContent(ERRORS_URL, LOCAL_ERRORS),
  ]);

  // Parse and write doc pages
  console.log('\nGenerating doc pages:');
  const pages = parseStandard(standardMd);
  for (const page of pages) {
    writePage(page.path, page.content);
  }
  console.log(`\n  Total: ${pages.length} pages generated`);

  // Parse and write errors.json
  console.log('\nGenerating errors.json:');
  const errors = parseErrors(errorsMd);
  ensureDir(DATA_DIR);
  const errorsPath = join(DATA_DIR, 'errors.json');
  writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
  console.log(`  ${errors.length} error codes written to src/data/errors.json`);

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Error generating docs:', err);
  process.exit(1);
});
