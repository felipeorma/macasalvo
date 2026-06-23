// Prerender the SPA into static HTML for each page + language so crawlers and
// AI engines (Google, Bing, ChatGPT, Perplexity) read real content, not an
// empty <div id="root">. Produces:
//   dist/index.html                          → Spanish home   "/"
//   dist/en/index.html                       → English home   "/en/"
//   dist/servicios/<slug>/index.html         → Spanish service pages
//   dist/en/services/<slug>/index.html       → English service pages
// Also generates dist/robots.txt and dist/sitemap.xml from SITE_URL.

import http from 'node:http';
import { readFile, readFileSync, existsSync } from 'node:fs';
import { promises as fsp } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// SITE_URL from seo.config.ts (single source of truth).
const cfg = readFileSync(join(ROOT, 'src/seo.config.ts'), 'utf8');
const SITE_URL = (cfg.match(/SITE_URL\s*=\s*'([^']+)'/) || [])[1] || 'https://example.com';

// Match vite.config base: '/' with a custom domain, '/macasalvo/' otherwise.
const BASE = existsSync(join(ROOT, 'public/CNAME')) ? '/' : '/macasalvo/';

// Service slugs from services.data.ts (each entry: slugEs then slugEn).
const data = readFileSync(join(ROOT, 'src/services.data.ts'), 'utf8');
const SERVICES = [];
const re = /slugEs:\s*'([^']+)',\s*slugEn:\s*'([^']+)'/g;
let m;
while ((m = re.exec(data)) !== null) SERVICES.push({ slugEs: m[1], slugEn: m[2] });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.JPG': 'image/jpeg',
};

function serve(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      if (BASE !== '/' && urlPath.startsWith(BASE)) urlPath = '/' + urlPath.slice(BASE.length);
      let filePath = join(DIST, urlPath);
      if (urlPath.endsWith('/')) filePath = join(filePath, 'index.html');
      readFile(filePath, (err, dataBuf) => {
        if (err) {
          // SPA fallback: unknown route → serve the app shell.
          readFile(join(DIST, 'index.html'), (e2, shell) => {
            res.writeHead(e2 ? 404 : 200, { 'Content-Type': 'text/html' });
            res.end(e2 ? 'Not found' : shell);
          });
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
        res.end(dataBuf);
      });
    });
    server.listen(port, () => resolve(server));
  });
}

async function renderRoute(browser, url) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.children.length > 0 && /Maca/.test(document.title);
    },
    { timeout: 30000 }
  );
  await new Promise((r) => setTimeout(r, 500));
  const html = await page.content();
  await page.close();
  return '<!doctype html>\n' + html;
}

async function main() {
  const port = 4178;
  const server = await serve(port);
  const origin = `http://localhost:${port}`;
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Build the full route list: home (es/en) + every service (es/en).
  const routes = [
    { route: BASE, out: 'index.html' },
    { route: `${BASE}en/`, out: 'en/index.html' },
  ];
  for (const s of SERVICES) {
    routes.push({ route: `${BASE}servicios/${s.slugEs}/`, out: `servicios/${s.slugEs}/index.html` });
    routes.push({ route: `${BASE}en/services/${s.slugEn}/`, out: `en/services/${s.slugEn}/index.html` });
  }

  for (const r of routes) {
    const html = await renderRoute(browser, `${origin}${r.route}`);
    const outPath = join(DIST, r.out);
    await fsp.mkdir(dirname(outPath), { recursive: true });
    await fsp.writeFile(outPath, html);
    console.log(`✓ prerendered  ${r.out}`);
  }

  await browser.close();
  server.close();

  // robots.txt
  await fsp.writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log('✓ wrote        robots.txt');

  // sitemap.xml — one <url> per language, each listing all hreflang alternates.
  const pairs = [
    { es: '/', en: '/en/' },
    ...SERVICES.map((s) => ({ es: `/servicios/${s.slugEs}`, en: `/en/services/${s.slugEn}` })),
  ];
  const urlBlock = (loc, p) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <xhtml:link rel="alternate" hreflang="es-CL" href="${SITE_URL}${p.es}"/>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${SITE_URL}${p.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${p.es}"/>
  </url>`;
  const urls = pairs.flatMap((p) => [urlBlock(p.es, p), urlBlock(p.en, p)]).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  await fsp.writeFile(join(DIST, 'sitemap.xml'), sitemap);
  console.log(`✓ wrote        sitemap.xml (${pairs.length * 2} URLs)`);
  console.log(`\nSITE_URL = ${SITE_URL} | BASE = ${BASE} | servicios = ${SERVICES.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
