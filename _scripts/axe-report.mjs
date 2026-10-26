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
  const r = await page.evaluate(tags => axe.run(document, { runOnly: { type: 'tag', values: tags } }), TAGS);
  results.push({ page: new URL(url).pathname, violations: r.violations, incomplete: r.incomplete });
  await page.close();
}
await browser.close();

// one row per failing element, sorted by criterion then page
const rows = kind => results.flatMap(({ page, [kind]: rules }) => rules.flatMap(rule =>
  rule.nodes.map(node => ({ sc: criteria(rule.tags), page, rule, node }))))
  .sort((a, b) => a.sc.localeCompare(b.sc, 'en', { numeric: true }) || a.page.localeCompare(b.page));
const table = list => [
  '| Criterion | Page | Element | HTML | Rule | Impact |',
  '| --- | --- | --- | --- | --- | --- |',
  ...list.map(({ sc, page, rule, node }) =>
    `| ${sc} | ${page} | ${code(node.target.join(' '))} | ${code(node.html)} | [${cell(rule.help)}](${rule.helpUrl}) | ${rule.impact ?? ''} |`),
].join('\n');

const failures = rows('violations');
const review = rows('incomplete');
const failedPages = new Set(failures.map(f => f.page)).size;
const md = [
  `## WCAG 2.2 A/AA automated check: ${device}`,
  '',
  failures.length
    ? `**${failures.length} failing element(s) on ${failedPages} of ${paths.length} page(s).**`
    : `No automated failures on ${paths.length} page(s).`,
  '',
  failures.length ? table(failures) : '',
  '',
  `<details><summary>Needs a person to check: ${review.length} element(s) axe could not decide</summary>`,
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
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `failures=${failures.length}\n`);
console.log(`${device}: ${failures.length} failing element(s), ${review.length} to check by hand`);
