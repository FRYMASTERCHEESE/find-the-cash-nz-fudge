import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync, readdirSync} from 'node:fs';

const source=(p)=>readFileSync(new URL('../'+p,import.meta.url));
const text=(p)=>source(p).toString('utf8');

test('Android bundles exactly the same static public website pages as GitHub Pages',()=>{
  execFileSync(process.execPath,['scripts/android-assets.mjs'],{cwd:new URL('../',import.meta.url)});
  const actual=readdirSync(new URL('../android/app/src/main/assets/',import.meta.url)).sort();
  const expected=['index.html','site.css','mark.svg','sweets.svg','privacy.html','stockists.html','food-and-orders.html'].sort();
  assert.deepEqual(actual,expected);
  for(const name of expected){
    assert.deepEqual(source('android/app/src/main/assets/'+name),source('docs/'+name),name);
  }
  assert.ok(!actual.includes('config.json'));
  assert.ok(!actual.includes('app.mjs'));
});

test('synced website remains informational and cannot activate products or payments',()=>{
 for(const name of ['index.html','privacy.html','stockists.html','food-and-orders.html']){
  const html=text('docs/'+name);
  assert.doesNotMatch(html,/<form\b|<input\b|<script\b|<iframe\b/i);
 }
 assert.match(text('docs/index.html'),/Shop not open yet · No orders or payments/);
 assert.match(text('docs/stockists.html'),/no retail chain has accepted, endorsed or ranged/i);
 const config=JSON.parse(text('web/config.json'));
 assert.equal(config.acceptingRequests,false);
 assert.deepEqual(config.products,[]);
 assert.equal(config.shipping.enabled,false);
 assert.equal(config.pickup.enabled,false);
});

test('app online URL is pinned to published site with offline fallback and refresh',()=>{
 const gradle=text('android/app/build.gradle');
 const java=text('android/app/src/main/java/nz/findthecash/fudge/MainActivity.java');
 assert.match(gradle,/versionCode 4/);
 assert.match(gradle,/versionName '1\.3'/);
 assert.match(gradle,/syncPublishedPreview/);
 assert.match(gradle,/tasks\.matching/);
 assert.match(gradle,/PREVIEW_URL', '"https:\/\/frymastercheese.github.io\/find-the-cash-nz-fudge\/"'/);
 assert.match(java,/BuildConfig\.PREVIEW_URL/);
 assert.match(java,/PUBLIC_PREFIX = "\/find-the-cash-nz-fudge\/"/);
 assert.match(java,/isApprovedWebsite\(Uri url\)/);
 assert.match(java,/isBundledPage\(Uri url\)/);
 assert.match(java,/showOfflineCopy\(/);
 assert.match(java,/new WebResourceResponse/);
 assert.match(java,/setCacheMode\(WebSettings\.LOAD_NO_CACHE\)/);
 assert.match(java,/setJavaScriptEnabled\(false\)/);
 assert.match(java,/setDomStorageEnabled\(false\)/);
 assert.match(java,/handler\.cancel\(\)/);
 assert.match(java,/Refresh information from the live website/);
 assert.doesNotMatch(java,/loadUrl\(.*[?&]checkout/i);
 const manifest=text('android/app/src/main/AndroidManifest.xml');
 assert.doesNotMatch(manifest,/AD_ID|com\.google\.android\.gms\.ads/);
});

test('public privacy explains both legacy bag-only preview and new synchronized site',()=>{
 const privacy=text('docs/privacy.html');
 assert.match(privacy,/earlier bundled preview/i);
 assert.match(privacy,/planned synchronized read-only preview/i);
 assert.match(privacy,/GitHub Pages/);
 assert.match(privacy,/standard request metadata/);
 assert.match(privacy,/no listed products, active orders or payments/i);
});

test('packaging only copies vetted public pages with no owner data',()=>{
 const assetSync=text('scripts/android-assets.mjs');
 assert.match(assetSync,/source = 'docs'/);
 assert.match(assetSync,/await rm\(destination,/);
 assert.match(assetSync,/Refusing to bundle active form\/script content/);
 assert.doesNotMatch(assetSync,/cp\('web'/);
 assert.doesNotMatch(assetSync,/tools\/catalogue-editor\.html|manufacturer-quote-comparison\.csv/);
 const workflow=text('.github/workflows/check-and-android.yml');
 assert.match(workflow,/offline pages are exact copies/);
 assert.match(workflow,/assert names==set\(files\)/);
});
