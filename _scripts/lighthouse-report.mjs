// Reads the Lighthouse reports (*.report.json) in a folder and writes what scored below the
// pass marks, page by page, with the audits that cost the points:
//   <dir>/lighthouse-<device>.md -> also appended to the GitHub job summary
// Pass marks: 100 for every category, except performance, which is MIN_PERFORMANCE.
//
// Usage: MIN_PERFORMANCE=80 node _scripts/lighthouse-report.mjs <dir> <desktop|mobile>
// Always exits 0; the number of scores below their mark is printed and, on GitHub, set as
// the step output `failures`.
import { readFileSync, readdirSync, writeFileSync, appendFileSync } from 'node:fs';

const [dir, device] = process.argv.slice(2);
const CATEGORIES = { performance: 'Performance', accessibility: 'Accessibility', 'best-practices': 'Best practices', seo: 'SEO' };
const mark = id => (id === 'performance' ? Number(process.env.MIN_PERFORMANCE || 100) : 100);

const reports = readdirSync(dir)
  .filter(f => f.endsWith('.report.json'))
  .map(f => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')))
  .map(r => ({ page: new URL(r.finalDisplayedUrl).pathname, r }))
  .sort((a, b) => a.page.localeCompare(b.page));

// null when Lighthouse could not score the category, e.g. it crashed reading the page trace
const score = (r, id) => (r.categories[id].score === null ? null : Math.round(r.categories[id].score * 100));
const code = s => '`' + s.replace(/`/g, "'").replace(/\s+/g, ' ').slice(0, 120) + '`';

// The audits that cost a category points. Accessibility, best practices and SEO are pass or
// fail per audit; for performance, the slow metrics plus the biggest suggested savings
const reasons = (r, id) => score(r, id) === null
  // an audit Lighthouse itself could not run: its error, which is a tool problem, not the page's
  ? [...new Set(r.categories[id].auditRefs.map(ref => r.audits[ref.id].errorMessage).filter(Boolean))]
    .slice(0, 2)  // the rest repeat the same failure
    .map(e => `Lighthouse could not measure this: ${e.slice(0, 200)} (usually a one-off; re-run the job)`)
  : r.categories[id].auditRefs
  .map(ref => ({ ref, a: r.audits[ref.id] }))
  .filter(({ ref, a }) => a.score !== null && (id === 'performance'
    ? (ref.weight > 0 ? a.score < 0.9 : a.score < 0.5 && a.displayValue)
    : ref.weight > 0 && a.score < 1))
  .map(({ a }) => {
    const node = a.details?.items?.[0]?.node?.snippet;
    return `${a.title}${a.displayValue ? `: ${a.displayValue}` : ''}${node ? `, e.g. ${code(node)}` : ''}`;
  });

const rows = [], below = [];
for (const { page, r } of reports) {
  rows.push(`| ${page} | ${Object.keys(CATEGORIES).map(id => {
    const s = score(r, id);
    if (s !== null && s >= mark(id)) return String(s);
    below.push({ page, id, s, why: reasons(r, id) });
    return s === null ? '**no score** ❌' : `**${s}** ❌`;
  }).join(' | ')} |`);
}

const marks = `Pass marks: performance ${mark('performance')}, everything else 100.`;
let md = `## Lighthouse: ${device}\n\n${marks}\n\n| Page | ${Object.values(CATEGORIES).join(' | ')} |\n|---|---|---|---|---|\n${rows.join('\n')}\n\n`;
md += below.length
  ? `### Below the pass mark\n\n${below.map(b => `- **${b.page}**: ${CATEGORIES[b.id]} ${b.s ?? 'not scored'}, needs ${mark(b.id)}\n${b.why.map(w => `  - ${w}`).join('\n')}`).join('\n')}\n\n`
  : 'Every page meets the pass marks.\n\n';

writeFileSync(`${dir}/lighthouse-${device}.md`, md);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `failures=${below.length}\n`);
console.log(`${reports.length} pages, ${below.length} score(s) below the pass mark on ${device}`);
