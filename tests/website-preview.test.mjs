import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const doc = (p) => readFileSync(new URL('../docs/' + p, import.meta.url), 'utf8');
const html = doc('index.html');
const css = doc('site.css');
const mark = doc('mark.svg');
const sweets = doc('sweets.svg');

test('published Pages entry is a complete preview rather than bare placeholder', () => {
 assert.match(html, /<html lang="en-NZ">/);
 assert.match(html, /<main id="main">/);
 assert.match(html, /<h1 id="hero-title">/);
 assert.match(html, /<nav class="main-nav"/);
 assert.match(html, /<title>Find The Cash NZ Fudge/);
 assert.ok(html.length > 5000, 'substantial landing page');
});

test('all local assets and policy link are present', () => {
 for (const name of ['site.css', 'sweets.svg', 'mark.svg', 'privacy.html']) {
  assert.ok(existsSync(new URL('../docs/' + name, import.meta.url)), name);
  assert.ok(html.includes(name), name + ' must be linked');
 }
 assert.match(css, /@media\(max-width:720px\)/);
 assert.match(css, /prefers-reduced-motion/);
 assert.match(mark, /<svg/);
 assert.match(sweets, /<svg/);
});

test('claims match the as-yet-inactive fudge resale shop', () => {
 assert.match(html, /not a fudge manufacturer/);
 assert.match(html, /No orders or payments/);
 assert.match(html, /Concept artwork only/);
 assert.match(html, /not products, stock or prices/);
 assert.match(html, /original, sealed packs/);
 assert.match(html, /ingredients, allergens, storage and dates/);
 assert.match(html, /health descriptions that can be supported/);
 assert.doesNotMatch(html, /<form\b|<input\b|payment-card|add to cart|Buy now/i);
});

test('the preview uses real contact channels and no tracking or fake checkout', () => {
 assert.match(html, /https:\/\/www\.facebook\.com\/FindTheCashNz/);
 assert.match(html, /mailto:findthecashnz@gmail\.com/);
 assert.doesNotMatch(html, /google-analytics|gtag\(|facebook\.net|adsbygoogle|stripe\.com|<script\b/i);
 const policy = doc('privacy.html');
 assert.match(policy, /closed Android preview/);
});
