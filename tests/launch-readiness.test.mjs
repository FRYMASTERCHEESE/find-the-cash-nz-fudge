import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const file = p => readFileSync(new URL('../'+p, import.meta.url), 'utf8');
const web = file('web/index.html');
const landing = file('docs/index.html');
const config = JSON.parse(file('web/config.json'));

test('website and Android shop share the Fudge branding and realistic preview', () => {
  assert.match(web, /FIND THE CASH NZ/);
  assert.match(web, /launch\.css/);
  assert.match(web, /mark\.svg/);
  assert.match(web, /sweets\.svg/);
  assert.match(web, /bottom-tabs/);
  assert.match(web, /concept-grid/);
  assert.match(web, /Idea only · Not for sale/);
  assert.match(web, /We don't manufacture fudge/);
  assert.match(web, /No products, orders or payments yet/);
  assert.match(web, /mailto:findthecashnz@gmail.com/);
  assert.match(landing, /stockists\.html/);
  assert.match(landing, /food-and-orders\.html/);
});

test('actual live-availability UI remains guarded behind physical pack checks', () => {
  for (const id of ['products','empty','bag-open','checkout','prepare','request-review']) assert.ok(web.includes('id="'+id+'"'),id);
  assert.equal(config.acceptingRequests,false);
  assert.deepEqual(config.products,[]);
  assert.equal(config.shipping.enabled,false);
  assert.equal(config.pickup.enabled,false);
  assert.equal(config.business.email,'');
  assert.ok(web.includes('disabled>Review email request'));
});

test('Android preview bundle has its own local branded SVG assets without trackers', () => {
  for (const f of ['web/launch.css','web/mark.svg','web/sweets.svg']) assert.ok(existsSync(new URL('../'+f,import.meta.url)),f);
  const css=file('web/launch.css');
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /prefers-reduced-motion/);
  const worker=file('web/sw.js');
  assert.match(worker, /ftcnz-shell-v2/);
  for (const name of ['launch.css','mark.svg','sweets.svg']) assert.ok(worker.includes("'./"+name+"'"));
  assert.doesNotMatch(worker,/const FILES=[^\n]*config\.json/);
  const gradle=file('android/app/build.gradle');
  assert.match(gradle,/versionCode 3/);
  assert.match(gradle,/versionName '1\.2'/);
  assert.match(gradle,/SHOP_URL', '""'/);
  assert.doesNotMatch(gradle,/play-services-ads|admobAppId/);
  const manifest=file('android/app/src/main/AndroidManifest.xml');
  assert.doesNotMatch(manifest,/AD_ID|com\.google\.android\.gms\.ads/);
});

test('food policy, trade page and privacy link exist, are not product claims or checkout', () => {
  for(const p of ['docs/privacy.html','docs/stockists.html','docs/food-and-orders.html']) assert.ok(existsSync(new URL('../'+p,import.meta.url)));
  const trade=file('docs/stockists.html'),food=file('docs/food-and-orders.html');
  assert.match(trade,/no retail chain has accepted, endorsed or ranged/i);
  assert.match(trade,/Foodstuffs North Island/);
  assert.match(trade,/Woolworths Group/);
  assert.match(food,/No products, prices, orders, payment service/i);
  assert.match(food,/don't manufacture, cook, cut, repackage or relabel fudge/i);
  assert.match(food,/reduced-sugar flavours are only an idea/i);
  for (const p of [landing,trade,food]) assert.doesNotMatch(p,/<form\b|<input\b|<script\b/i);
});

test('private commercial tooling cannot accidentally become a public deploy artifact', () => {
  for(const p of ['tools/catalogue-editor.html','tools/order-manager.html','tools/fudge-price-planner.html','templates/manufacturer-quote-comparison.csv','templates/supermarket-product-specification.csv']) assert.ok(existsSync(new URL('../'+p,import.meta.url)),p);
  const notes=file('LAUNCH-READINESS.md');
  assert.match(notes,/signed AAB signed using the original upload key/);
  assert.match(notes,/do not/i);
  assert.ok(!web.includes('tools/fudge-price-planner.html'));
  assert.ok(!landing.includes('tools/fudge-price-planner.html'));
});
