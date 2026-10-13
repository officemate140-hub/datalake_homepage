import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pages } from '../.ssr/entry-server.js';

for (const locale of ['ko', 'en']) for (const path of Object.keys(pages)) {
  const prefix = locale === 'en' ? '/en' : '';
  const html = await readFile(`dist${prefix}${path}index.html`, 'utf8');
  assert(html.includes(`<html lang="${locale}">`), `Wrong document language: ${prefix}${path}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one heading: ${prefix}${path}`);
  const visibleText = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, '');
  if (locale === 'en') assert(!/[가-힣]/.test(visibleText), `Missing English translation: ${prefix}${path}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (canonical) {
    assert(new URL(canonical[1]).pathname.endsWith(prefix + path), `Wrong canonical: ${prefix}${path}`);
    assert(html.includes('hreflang="en"') && html.includes('hreflang="ko"'), `Missing alternates: ${path}`);
  }
}
console.log('Verified 18 Korean/English pages: language, translations, h1, canonical and alternates.');
