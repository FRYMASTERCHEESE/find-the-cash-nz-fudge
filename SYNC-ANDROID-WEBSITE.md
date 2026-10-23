# Find The Cash NZ Fudge — website ↔ Android sync (24 October 2026)

## Exact meaning of “synced”

**ONE live source for all public prelaunch information:** \`docs/\` is published by GitHub Pages at https://frymastercheese.github.io/find-the-cash-nz-fudge/.

- **Website:** Visitors read the public static prelaunch pages as before.
- **Android version 1.3 (build 4):** On launch and whenever the user taps **Sync**, it loads that exact HTTPS Pages URL. Updates to any published page, styles or assets are therefore reflected in the updated Android app without uploading a new AAB each time. Standard hosting/CDN propagation and current internet availability still apply.
- **Offline fallback:** If GitHub Pages can't be reached or fails an HTTPS/security check, the Android viewer loads a build-time copy of the *same public pages*, with an OFFLINE COPY label. It does not invent products or attempt a sale. Tapping **Sync** retries the live website.
- **External sites:** Facebook, email and other external web links open through Android's external app/browser chooser. Unknown or insecure URL schemes never load inside the app.
- **No hidden app JavaScript:** JavaScript and DOM storage are disabled for the read-only app, so publicly editable website pages cannot silently enable online checkout or an advertising SDK within the already published Android build. No forms/scripts may be bundled as fallback.

### What's NOT synced

There are currently **zero verified products** and **zero completed transactions**. The \`web/\` source contains a separately guarded future commerce storefront, but its catalogue is empty, orders are closed and it is not published commercially. No customer sign-ins, shared cart, real-time inventory, order records, banking, payments, delivery booking or AdMob advertising can sync between devices yet. Those require a genuine backend, verified legal/food arrangements and hosting permitted for commerce. **GitHub Pages must remain information-only** under its current use restrictions.

## Updating both channels after build 4 is installed

1. Edit and test a public prelaunch page within \`docs/\` (e.g. \`docs/index.html\`). Never publish a quote containing confidential supplier prices, personal information or private contacts.
2. Merge the reviewed change to \`main\`. GitHub Pages automatically deploys the pages.
3. Open the website in a browser; on a phone with *version 1.3 build 4*, open the app and tap **Sync**.
4. Compare the website and Android content, including the food-information, partner and privacy pages.

**No Play Store update is needed for ordinary informational changes once build 4 has been installed.** Changes to Android native features, manifest/permissions, signing, privacy-relevant SDKs, payments, or new commerce functionality still require a new reviewed and signed Play release.

## First-time one-step upgrade (still required)

The previous signed Play internal v1.1 build 2 does **not** contain this sync capability. The repository can build the new version but **cannot sign it** without the original owner-only private upload keystore.

The owner/developer should:
1. In the repository, open **GitHub Actions → Check website and build Android preview** and inspect the latest success run on \`main\`. Its draft release holds an installable **debug APK** and an **unsigned release AAB**. Debug builds are for local sideload tests and do not replace Google Play's signed app.
2. Keep the original private keystore and passwords **outside** public GitHub. Sign Android v1.3 (versionCode 4) with the existing authorized upload key using Android Studio or a properly secured release process.
3. Check the Play Console app-content and Data safety declarations against this web-connected build and its updated privacy policy. Do not copy the old "no third-party hosting connection" language.
4. Upload the signed build 4 AAB to the appropriate internal/closed testing track, review and roll it out, then install it through the tester account.
5. Verify links, Home, Sync, offline fallback and reconnect on a phone. Use authentic installed-app screenshots for the Play listing, not AI designs.

**No manual Gradle setup is needed on GitHub Actions**: its workflow runs \`node scripts/android-assets.mjs\` followed by Gradle. If building in Android Studio, Gradle automatically runs the `syncPublishedPreview` task before packaging assets, so you don't need Node just to sync the offline copies. The Node script remains a direct testing and CI option. In both workflows only reviewed `docs/` files are included.

## Fallback files

The Android packaging script allowlists only:
- index.html
- site.css
- mark.svg
- sweets.svg
- privacy.html
- stockists.html
- food-and-orders.html

No source from \`web/\`, \`tools/\` or \`templates/\` is embedded. This avoids publishing unverified stock, customer data or private calculations.

## Privacy and policy

- Website hosting is GitHub Pages, so standard connection metadata (including IP addresses) can be processed by that service when online; the app has no proprietary tracking SDK, customer logins or payment forms.
- App uses INTERNET permission and no location, microphone, camera or advertising-ID permission.
- The current public privacy page describes both the earlier bundled offline preview and the proposed v1.3 synced website viewer. Check Play Console Data safety with the final AAB and Google's disclosure definitions.
- The website is explicitly a **prelaunch information page**, not a functioning food e-commerce website. GitHub Pages prohibits running an online business/e-commerce site (https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- Real retail/food handling and future order operations are not declared safe or permitted solely by building this software.
