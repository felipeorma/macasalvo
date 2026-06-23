// Prerender the SPA into static HTML for each language so crawlers and AI
// engines (Google, Bing, ChatGPT, Perplexity) read real content, not an empty
// <div id="root">. Produces:
//   dist/index.html      → Spanish (Chile)   served at "/"
//   dist/en/index.html   → English (Canada)  served at "/en/"
// Also generates dist/robots.txt and dist/sitemap.xml from SITE_URL.

import http from 'node:http';
import { readFile, readFileSync } from 'node:fs';
import { promises as fsp } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// Read SITE_URL from seo.config.ts (single source of truth, no duplication).
const cfg = readFileSync(join(ROOT, 'src/seo.config.ts'), 'utf8');
const SITE_URL = (cfg.match(/SITE_URL\s*=\s*'([^']+)'/) || [])[1] || 'https://example.com';

// Match vite.config base: '/' with a custom domain, '/macasalvo/' otherwise.
import { existsSync } from 'node:fs';
const BASE = existsSync(join(ROOT, 'public/CNAME')) ? '/' : '/macasalvo/';

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.JPG': 'image/jpeg',
};

// Minimal static server with SPA fallback to index.html.
function serve(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      // Strip the base prefix (e.g. /macasalvo/) so files resolve from dist root.
      if (BASE !== '/' && urlPath.startsWith(BASE)) urlPath = '/' + urlPath.slice(BASE.length);
      let filePath = join(DIST, urlPath);
      if (urlPath.endsWith('/')) filePath = join(filePath, 'index.html');
      readFile(filePath, (err, data) => {
        if (err) {
          // SPA fallback: unknown route → serve the app shell.
          readFile(join(DIST, 'index.html'), (e2, shell) => {
            res.writeHead(e2 ? 404 : 200, { 'Content-Type': 'text/html' });
            res.end(e2 ? 'Not found' : shell);
          });
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(port, () => resolve(server));
  });
}

async function renderRoute(browser, base, route) {
  const page = await browser.newPage();
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  // Wait until React has mounted real content and the SEO head is populated.
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.children.length > 0 && /Maca/.test(document.title);
    },
    { timeout: 30000 }
  );
  // Give framer-motion / lazy content a brief beat to settle.
  await new Promise((r) => setTimeout(r, 600));
  const html = await page.content();
  await page.close();
  return '<!doctype html>\n' + html;
}

async function main() {
  const port = 4178;
  const server = await serve(port);
  const base = `http://localhost:${port}`;
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Spanish (root)
  const esHtml = await renderRoute(browser, base, BASE);
  await fsp.writeFile(join(DIST, 'index.html'), esHtml);
  console.log('✓ prerendered  /            (es-CL)');

  // English (/en/)
  const enHtml = await renderRoute(browser, base, `${BASE}en/`);
  await fsp.mkdir(join(DIST, 'en'), { recursive: true });
  await fsp.writeFile(join(DIST, 'en', 'index.html'), enHtml);
  console.log('✓ prerendered  /en/         (en-CA)');

  await browser.close();
  server.close();

  // robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await fsp.writeFile(join(DIST, 'robots.txt'), robots);
  console.log('✓ wrote        robots.txt');

  // sitemap.xml with hreflang alternates
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}/</loc>
    <xhtml:link rel="alternate" hreflang="es-CL" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${SITE_URL}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>
  </url>
  <url>
    <loc>${SITE_URL}/en/</loc>
    <xhtml:link rel="alternate" hreflang="es-CL" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${SITE_URL}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>
  </url>
</urlset>
`;
  await fsp.writeFile(join(DIST, 'sitemap.xml'), sitemap);
  console.log('✓ wrote        sitemap.xml');
  console.log(`\nSITE_URL = ${SITE_URL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
