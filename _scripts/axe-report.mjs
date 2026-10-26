// Runs axe-core's automated WCAG 2.2 A and AA rules on each page and writes a report of
// what failed, under which success criterion, and where (page and element):
//   <out>/wcag-<device>.md   -> also appended to the GitHub job summary
//   <out>/wcag-<device>.json -> full axe results, one entry per page
// Automated rules catch only part of WCAG; the PR checklist covers the manual checks.
//
// Usage: node _scripts/axe-report.mjs <base-url> <desktop|mobile> <path>...
//   e.g. node _scripts/axe-report.mjs http://127.0.0.1:4000 mobile group33/ group33/about/
// Needs `npm ci --prefix _scripts`, and CHROME set to a Chrome or Chromium executable.
// Writes into AXE_OUT (default: current folder). Always exits 0; the failure count is
// printed and, on GitHub, set as the step output `failures`.
import puppeteer from 'puppeteer-core';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const [base, device, ...paths] = process.argv.slice(2);
const out = process.env.AXE_OUT || '.';
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const axeVersion = require('axe-core/package.json').version;
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
const viewport = device === 'mobile'
  ? { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  : { width: 1350, height: 940 };

// axe tags criteria as wcag111, wcag1410 -> 1.1.1, 1.4.10
const criteria = tags => tags.filter(t => /^wcag\d{3,}$/.test(t))
  .map(t => t.slice(4).replace(/^(\d)(\d)/, '$1.$2.')).join(', ') || '(none)';
// keeps text safe inside a Markdown table cell
const cell = s => String(s).replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
const code = s => '`' + cell(s).replace(/`/g, "'").slice(0, 120) + '`';

// --no-sandbox: GitHub's Ubuntu runners block Chrome's sandbox; only our own pages load here
const browser = await puppeteer.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'] });
const results = [];
for (const path of paths) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const url = new URL(path, base + '/').href;
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.addScriptTag({ content: axeSource });
  const r = await page.evaluate(async tags => {
    const r = await axe.run(document, { runOnly: { type: 'tag', values: tags } });
    // the component an element belongs to, as a CSS scope to fix once: its own first class,
    // or the nearest classed ancestor plus its tag (e.g. "nav.site-nav a")
    const name = e => e.tagName.toLowerCase() + (e.classList[0] ? '.' + e.classList[0] : '');
    const scopeOf = el => {
      if (el.classList.length) return name(el);
      const parent = el.parentElement?.closest('[class]');
      return parent ? `${name(parent)} ${el.tagName.toLowerCase()}` : name(el);
    };
    for (const rule of [...r.violations, ...r.incomplete]) for (const n of rule.nodes) {
      const el = n.target.length === 1 && typeof n.target[0] === 'string' ? document.querySelector(n.target[0]) : null;
      n.scope = el ? scopeOf(el) : n.target.flat().join(' ');  // inside a frame or shadow root
    }
    return r;
  }, TAGS);
  results.push({ page: new URL(url).pathname, violations: r.violations, incomplete: r.incomplete });
  await page.close();
}
await browser.close();

// What to change, by the reason axe gives (its messageKey). Most "can't decide" results are
// colour contrast where axe can't tell what colour is behind the text.
const HINTS = {
  bgImage: 'Text is over an image. Give the text (or a box behind it) a solid `background-color`, or check contrast by hand against the image\'s lightest part.',
  bgGradient: 'Text is over a gradient. Give the text a solid `background-color`, or check contrast by hand against the gradient\'s lightest part.',
  imgNode: 'Text is inside or over an `<img>`. Check contrast by hand, or put the text on a solid background.',
  pseudoContent: 'A `::before`/`::after` sits behind the text. Give the text its own solid `background-color`, or check by hand.',
  bgOverlap: 'Another element overlaps the text. Check it by hand where they overlap, or stop the overlap.',
  elmPartiallyObscured: 'The text is partly covered or scrolled out of view: under the sticky nav pill, or a link past the edge of the pill on phones. Check it by hand once it\'s in view.',
  fgAlpha: 'The text colour is see-through. Use an opaque `color`.',
  shortTextContent: 'Too little text to judge (e.g. a single symbol). Check by hand; if it\'s decorative, hide it with `aria-hidden="true"`.',
  nonBmp: 'The text is an icon or symbol character. Check by hand; if it\'s decorative, hide it with `aria-hidden="true"`.',
};
const pathOnly = p => p.replace(/^\/group33/, '') || '/';

// one row per component and reason, not per element: the same fix covers every match
const groups = kind => {
  const map = new Map();
  for (const { page, [kind]: rules } of results) for (const rule of rules) for (const node of rule.nodes) {
    const check = [...node.any, ...node.all, ...node.none].find(c => c.message) ?? {};
    const reason = check.data?.messageKey ?? check.message ?? '';
    const key = [rule.id, node.scope, reason].join('|');
    const g = map.get(key) ?? map.set(key, { sc: criteria(rule.tags), rule, scope: node.scope, reason, why: check.message ?? '', pages: new Set(), count: 0, html: node.html }).get(key);
    g.pages.add(page);
    g.count++;
  }
  return [...map.values()].sort((a, b) => a.sc.localeCompare(b.sc, 'en', { numeric: true }) || b.count - a.count);
};
const table = list => [
  '| Criterion | Component | Why | What to change | Where | Example |',
  '| --- | --- | --- | --- | --- | --- |',
  ...list.map(g => {
    const where = g.pages.size === paths.length ? `all ${paths.length} pages` : [...g.pages].map(pathOnly).join(', ');
    const fix = HINTS[g.reason] ?? `See [${cell(g.rule.help)}](${g.rule.helpUrl}).`;
    return `| ${g.sc} | ${code(g.scope)} | ${cell(g.why)} | ${fix} | ${where} (${g.count}×) | ${code(g.html)} |`;
  }),
].join('\n');

const failures = groups('violations');
const review = groups('incomplete');
const count = list => list.reduce((n, g) => n + g.count, 0);
const failedPages = new Set(failures.flatMap(g => [...g.pages])).size;
const md = [
  `## WCAG 2.2 A/AA automated check: ${device}`,
  '',
  failures.length
    ? `**${count(failures)} failing element(s) in ${failures.length} component(s), on ${failedPages} of ${paths.length} page(s).**`
    : `No automated failures on ${paths.length} page(s).`,
  '',
  failures.length ? table(failures) : '',
  '',
  `<details><summary>Needs a person to check: ${review.length} component(s), ${count(review)} element(s) axe could not decide</summary>`,
  '',
  'Not failures: axe could not work out the answer, usually what colour sits behind some text.',
  'Each row is one component; the change shown fixes or settles every element in it.',
  '',
  review.length ? table(review) : 'None.',
  '',
  '</details>',
  '',
  `axe-core ${axeVersion}. Automated rules find only part of WCAG; do the manual checks in the PR checklist too.`,
  '',
].join('\n');

writeFileSync(`${out}/wcag-${device}.md`, md);
writeFileSync(`${out}/wcag-${device}.json`, JSON.stringify(results, null, 2));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `failures=${count(failures)}\n`);
console.log(`${device}: ${count(failures)} failing element(s), ${count(review)} to check by hand in ${review.length} component(s)`);
