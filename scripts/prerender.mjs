import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { render, pages } from '../.ssr/entry-server.js';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
env.SITE_URL ??= 'https://datalake.ai.kr/';
const template = await readFile('dist/index.html', 'utf8');
const escape = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let canonical = '';
if (env.SITE_URL) {
  const url = new URL(env.SITE_URL);
  if (url.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS.');
  canonical = url.href.endsWith('/') ? url.href : url.href + '/';
}
const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: '주식회사 데이터레이크', alternateName: 'DATALAKE', foundingDate: '2024-07-24', email: 'japark.work@gmail.com', address: { '@type': 'PostalAddress', streetAddress: '입춘로 45, 씨동 1213호 (반곡동, 엔터비즈타워)', addressLocality: '원주시', addressRegion: '강원특별자치도', addressCountry: 'KR' }, ...(canonical ? { url: canonical, logo: canonical + 'assets/datalake-logo.png' } : {}) };
for (const [path, page] of Object.entries(pages)) {
  const directory = 'dist' + path;
  await mkdir(directory, { recursive: true });
  const pageURL = canonical + path.slice(1);
  const meta = canonical ? `<link rel="canonical" href="${escape(pageURL)}" /><meta property="og:url" content="${escape(pageURL)}" /><meta property="og:image" content="${escape(canonical)}assets/datalake-logo.png" />` : '<meta name="robots" content="noindex, nofollow" />';
  const html = template.replace('<!--app-html-->', render(path))
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(page.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(page.description)}" />`)
    .replace('<!--site-meta-->', `${meta}<script type="application/ld+json">${JSON.stringify(organization).replaceAll('<', '\\u003c')}</script>`);
  await writeFile(directory + 'index.html', html);
}
await writeFile('dist/404.html', template.replace('<!--app-html-->', render('/404/')).replace(/<title>.*?<\/title>/, '<title>페이지를 찾을 수 없습니다 | 데이터레이크</title>').replace('<!--site-meta-->', '<meta name="robots" content="noindex" />'));
if (canonical) {
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${canonical}sitemap.xml\n`);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(path => `<url><loc>${escape(canonical + path.slice(1))}</loc></url>`).join('')}</urlset>`);
} else await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
console.log(`Generated ${Object.keys(pages).length} static pages with unique metadata, plus 404 page.`);
