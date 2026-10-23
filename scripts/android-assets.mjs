// The public info-only GitHub Pages website is the SINGLE SOURCE OF TRUTH for
// the synced Android preview. The same docs are bundled for offline fallback.
// Never package web/ (future checkout source), owner tools or private records.
import { copyFile, mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const source = 'docs';
const destination = 'android/app/src/main/assets';
const offlineFiles = [
  'index.html',
  'site.css',
  'mark.svg',
  'sweets.svg',
  'privacy.html',
  'stockists.html',
  'food-and-orders.html'
];
const mandatory = ['index.html', 'privacy.html', 'stockists.html', 'food-and-orders.html'];
const sitePages = await Promise.all(mandatory.map(name => readFile(join(source,name),'utf8')));
for (let i=0;i<sitePages.length;i++) {
  const html=sitePages[i];
  // This build is a PRE-LAUNCH information-only preview. Changing it to take
  // orders must be reviewed, hosted appropriately and delivered as a NEW app.
  if (/<form\b|<input\b|<script\b|<iframe\b/i.test(html)) {
    throw new Error('Refusing to bundle active form/script content: '+mandatory[i]);
  }
}
const pagesSet = new Set(offlineFiles);
const existing = await readdir(source);
for (const file of offlineFiles) {
  if (!existing.includes(file)) throw new Error('Missing required website file '+file);
}
await rm(destination, {recursive:true, force:true});
await mkdir(destination, {recursive:true});
for (const file of offlineFiles) await copyFile(join(source,file),join(destination,file));
console.log('Synced Android fallback from public docs/: '+pagesSet.size+' static files. No commerce files or owner records bundled.');
