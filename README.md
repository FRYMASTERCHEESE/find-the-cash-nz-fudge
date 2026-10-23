# Find The Cash NZ — The Fudge Edit

## October 24 2026: automatic website-to-Android preview sync

The information-only **live website** is the single source of truth for the Android preview. A new **v1.3 (version code 4) app candidate**:
- Loads the canonical public preview at https://frymastercheese.github.io/find-the-cash-nz-fudge/ when online. When the public pages are changed and redeployed from \`docs/\`, the updated Android app displays the same changes when it loads/refreshes; no new AAB is needed for normal text or design updates.
- Offers a native **Sync** button that reloads the public website without using a stale WebView cache.
- Displays a built-in copy of the SAME \`docs/\` pages if the website is unavailable. This copy is bundled at build time and may be older when offline; tap Sync when back online.
- Opens non-project links (including Facebook/email) outside the app, enforces HTTPS for in-app pages, and disables JavaScript, cookies and checkout functionality for the read-only preview.
- Provides a brand-matched experience online and offline; \`scripts/android-assets.mjs\` automatically copies only the reviewed public prelaunch pages into Android. It does NOT bundle stock/config, customer data or private owner tools.
- Requires the existing **private Google Play upload key**, actual phone testing, and a signed AAB for Google Play **closed/internal testing**. The current installed v1.1 build 2 will NOT sync until the new build 4 is installed. GitHub's unsigned release is not Play-ready. Google may review or reject low-functionality WebView apps.

**Scope of synchronization:** public prelaunch content (brand, artwork, messages, policy pages, manufacturer and retailer information). There is NO live backend for customers, shared product stock, orders, receipts, refunds, payments or advertising. Those require verified supplier arrangements and suitable commercial hosting; GitHub Pages is not licensed as a storefront checkout host. Do not claim the retail business is 90% operational because the prelaunch presentation is 90% complete.

See \`SYNC-ANDROID-WEBSITE.md\` for the one-step build and exact safety boundaries. Google Play Data safety and privacy statements must be checked against the newly built AAB because it connects to GitHub Pages.


## October 24 2026: the unified branded preview

The **public information-only brand website** is now styled to match the app concept:
- [Find The Cash NZ Fudge website](https://frymastercheese.github.io/find-the-cash-nz-fudge/)
- [Food, allergens, delivery & customer rights](https://frymastercheese.github.io/find-the-cash-nz-fudge/food-and-orders.html)
- [For manufacturers, distributors & retail buyers](https://frymastercheese.github.io/find-the-cash-nz-fudge/stockists.html)
- [Android preview privacy](https://frymastercheese.github.io/find-the-cash-nz-fudge/privacy.html)

The \`web/\` source now shares its locally bundled SVG brand artwork and responsive theme with the information pages. This makes the **Android app preview branded, accessible and usable offline**, but does not suddenly give it live products, payments, a shop backend or shared stock. Every illustrated fudge category is labelled **concept only**. The public support email and Facebook link work.

- **New Android candidate:** v1.2, version code **3**, no analytics or advertising SDK; needs signing with the original private Google Play upload key and submitting to internal/closed testing.
- **Existing Play installation:** owner previously reported v1.1 (2) in internal testing. That version is **not automatically updated** by GitHub changes.
- **Private free pricing tool:** open \`tools/fudge-price-planner.html\` on your own computer, enter REAL quotes and target margins. Keep output private.
- **Spreadsheet templates:** \`templates/manufacturer-quote-comparison.csv\`, \`templates/supermarket-product-specification.csv\`, and existing stock register, ready to fill after manufacturer negotiations.
- **Full release gates and next actions:** [LAUNCH-READINESS.md](LAUNCH-READINESS.md).
- **AdMob:** [PR #1](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge/pull/1) is a separate DRAFT / UNMERGED experiment. Banner ads are not in v1.2, and must not be declared live until a real ad-enabled build, consent, new privacy and Data safety statements are complete.

**Do not enable real orders, money collection, or product listings before real manufacturer stock and food compliance are verified.** GitHub Pages must remain information-only; see the commerce-hosting restriction below.


A separate, buildless storefront and installable PWA for a proposed New Zealand sealed-fudge resale business. No npm dependencies, payment services, analytics, paid plugins or backend subscription. The catalogue is deliberately empty and requests are closed. Pickup is disabled as requested.

Public support email: **findthecashnz@gmail.com** · [Find The Cash NZ on Facebook](https://www.facebook.com/FindTheCashNz). The legal seller identity, actual stock, wholesale quotes, GST status, prices and shipping have not been supplied. The owner **does not manufacture fudge**. Never include private supplier quotes, personal records or customer information in GitHub.

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

The separate public repository is [https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge). It starts with fresh history and omits the owner-supplied email address. Original contact settings remain local outside this public repository.

The included GitHub Actions workflow tests the website and builds Android preview binaries in a draft release. It uses standard public runners, disables the Gradle cache and avoids Actions artifact storage. It does not deploy the website, publish the release or submit to Play. The second build completed successfully; the first build failed on an obsolete SDK package and was corrected.

[Cloudflare Pages offers a $0 tier](https://www.cloudflare.com/developer-platform/products/pages/). It is a possible static hosting alternative, subject to its current terms and limits. Using it requires your choice of that service and account setup; no account, paid plan or hosting deployment has been created. Connect the new repository, use no framework/build command and set output directory to **web**. Do not upload the project root, tools/, templates/ or private customer records. Use the supplied free subdomain; a purchased domain is optional. Keep requests disabled for the first preview deployment and verify the live site before opening sales.

## Android and Google Play

See **ANDROID-RELEASE.md**. Android compilation passed in [GitHub Actions](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge/actions/runs/39924362340) on 23 October 2026. The draft release android-preview-2-1 contains a signed debug APK, unsigned AAB, checksums and signature/package verification. See INSTALL-ANDROID.md. The APK still needs a phone test; production signing and Play review are outstanding.

## Verification

```text
node --test tests/shop.test.mjs
node --check web/app.mjs
node --check web/sw.js
node scripts/android-assets.mjs
```

The tests use synthetic fixtures only inside tests/; these are never listed in the public catalogue. See **TEST-REPORT.md** for actual results and remaining checks. Icons can be regenerated with Python 3 using scripts/icons.py (standard library only).
