// Serves a built site folder on 127.0.0.1 for the audits, compressing text files with
// gzip as GitHub Pages does, so Lighthouse measures the sizes visitors actually download.
// Folders serve their index.html; anything missing is a 404.
//
// Usage: node _scripts/serve.mjs <dir> <port>
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { createGzip } from 'node:zlib';

const [dir, port] = process.argv.slice(2);
const root = resolve(dir);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.map': 'application/json', '.xml': 'application/xml',
  '.txt': 'text/plain', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.woff2': 'font/woff2', '.m4a': 'audio/mp4',
};
// photos, fonts and audio are compressed already
const COMPRESS = new Set(['.html', '.css', '.js', '.json', '.map', '.xml', '.txt', '.svg']);

const find = path => {
  try {
    return statSync(path).isDirectory() ? find(join(path, 'index.html')) : path;
  } catch {
    return null;
  }
};

createServer((req, res) => {
  // normalize drops any ../, so requests stay inside the site folder
  const file = find(join(root, normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))));
  if (!file) return res.writeHead(404).end('Not found');
  const type = extname(file).toLowerCase();
  const gzip = COMPRESS.has(type) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  res.writeHead(200, {
    'Content-Type': TYPES[type] ?? 'application/octet-stream',
    ...(gzip && { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' }),
  });
  const body = createReadStream(file);
  (gzip ? body.pipe(createGzip()) : body).pipe(res);
}).listen(Number(port), '127.0.0.1');
