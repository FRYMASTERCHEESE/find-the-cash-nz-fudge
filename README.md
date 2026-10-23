# Find The Cash NZ — The Fudge Edit

A separate, buildless storefront and installable PWA for a proposed New Zealand sealed-fudge resale business. No npm dependencies, payment services, analytics, paid plugins or backend subscription. The catalogue is deliberately empty and requests are closed. Pickup is disabled as requested.

Business contact email is intentionally omitted from this public source · [Find The Cash NZ on Facebook](https://www.facebook.com/FindTheCashNz). Seller legal identity, actual stock/prices and shipping have not been supplied.

## Open the website locally

Install Node.js if needed, open a terminal in this folder and run:

```text
node scripts/serve.mjs
```

Open http://localhost:4173. Keep that terminal running. Alternatively double-click **Preview.cmd** on Windows. Opening web/index.html directly from disk cannot load the catalogue because browser security blocks local module/fetch access.

## What works

- Responsive catalogue, accessible bag dialog, quantity limits and integer NZD totals.
- Original-pack label information, manufacturer, ingredients, allergens/warnings, storage, batch, retail source and date mark required before a product appears.
- Only physically held sealed shelf-stable stock is supported. Listings disappear after 24 hours without rechecking, or when expired, recalled, damaged/unsealed or missing required information.
- Shipping coverage, all-inclusive delivery charge and delivery terms must be configured. Pickup remains off.
- Checkout fetches current configuration, recalculates and prepares an email request. Customer reviews the text and recipient before choosing to send it. No automatic email, payment, stock reservation, order acceptance or fulfilment.
- Manifest, icons, install affordance and service worker for the PWA. Only the shell works offline; stock configuration is never cached for offline ordering. Installation requires a supported browser and HTTPS outside localhost.
- Private catalogue editor and order notebook in tools/. These work offline as local files and do not publish changes. Only upload web/ to hosting.
- Android Java WebView shell, SDK 36 target, native Shop/Refresh toolbar and bundled closed preview. No third-party Android runtime dependencies or JavaScript/native bridge.

These are software safeguards, not a certification that the business is compliant. Browser clocks and owner-entered information are not independent verification. Recheck physical stock and terms before accepting every request. There is no shared inventory server; simultaneous requests can exceed stock and must be reconciled manually. No request is automatically accepted.

## Add your real products

1. Open **tools/catalogue-editor.html** on your computer. Import **web/config.json**.
2. Add legal seller name and a truthful privacy retention policy. Confirm you control the supplied contact channels.
3. Enter shipping only after checking carrier cost, coverage, rural exclusions, dispatch timing and safe storage/transport. Do not enter private pickup addresses.
4. Add only packs you hold and have checked. Copy the actual complete label, including applicable nutrition/origin details and NZ/AU supplier contact. Keep the manufacturer’s original sealed packaging intact. List each batch separately. Do not imply retailer/brand endorsement or an unsupported cheapest-price claim.
5. Keep receipts, purchase costs, supplier contacts, label photographs, batch counts and recall records privately. Never upload those or customer records to a public repo. A private stock-register CSV header is supplied under templates/.
6. Complete **NZ-RESALE-CHECKLIST.md** with MPI / your council as applicable. The software does not determine whether a particular fudge is shelf-stable or whether your business is exempt.
7. Download the config replacement, place it in web/, preview and test. Do not enable requests until all setup details are verified and you explicitly choose to launch. The editor does not publish or upload.

Recheck actual stock at least daily and after confirmed orders. Set acceptingRequests=false to close requests quickly. Remove affected stock immediately for recalls and contact customers through your private records.

## Handle requests without paying for an order system

Requests arrive only when a customer sends the prepared email. No mail-server credentials are needed. Create Gmail labels such as Fudge / Enquiry, Confirmed, Dispatched and Follow-up manually. Check the real pack, quantity, date, delivery coverage/timeframe and total, then agree terms directly with the customer. Decide and verify any future payment method separately; this build has none.

Open tools/order-manager.html for a private status notebook. It saves in memory until you download its JSON file. Keep it securely outside this public repository. It supports enquiry, stock checked, customer confirmed, dispatched, completed, cancelled and refund/recall follow-up. Do not enter card details or sensitive health data. Apply your retention policy, provide access/correction and delete unnecessary information. The tool does not send emails or integrate with Gmail.

## Free hosting and a new public GitHub repository

**Do not enable GitHub Pages for this shop.** [GitHub expressly prohibits using Pages to run an online business or e-commerce site](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). A free public repository can hold source independently of hosting.

This folder is its own Git repository; it does not share project history with your existing work. A public remote was not created because the local GitHub login is invalid and the connected GitHub tool has no repository-creation action. After refreshing your GitHub login, from this folder:

```text
gh auth login
gh repo create find-the-cash-nz-fudge --public --source=. --remote=origin --push
```

If that name is taken, choose a new distinct name. Check the selected account and upload only this project. This public copy starts with a fresh history and omits the owner-supplied email address. Import your privately held contact settings locally when preparing a launch. The included GitHub Actions workflow tests the website and builds Android preview binaries in a draft release; it does not deploy a website or submit to Google Play. It uses standard build actions, not storefront plugins. Build success is not yet verified in GitHub Actions.

[Cloudflare Pages offers a $0 tier](https://www.cloudflare.com/developer-platform/products/pages/). It is a possible static hosting alternative, subject to its current terms and limits. Using it requires your choice of that service and account setup; no account, paid plan or hosting deployment has been created. Connect the new repository, use no framework/build command and set output directory to **web**. Do not upload the project root, tools/, templates/ or private customer records. Use the supplied free subdomain; a purchased domain is optional. Keep requests disabled for the first preview deployment and verify the live site before opening sales.

## Android and Google Play

See **ANDROID-RELEASE.md**. No APK or AAB has been compiled locally because the Android SDK and Gradle are absent. Java 17 is installed. The included source/build workflow is preparation, not a signed or Play-approved release.

## Verification

```text
node --test tests/shop.test.mjs
node --check web/app.mjs
node --check web/sw.js
node scripts/android-assets.mjs
```

The tests use synthetic fixtures only inside tests/; these are never listed in the public catalogue. See **TEST-REPORT.md** for actual results and remaining checks. Icons can be regenerated with Python 3 using scripts/icons.py (standard library only).
