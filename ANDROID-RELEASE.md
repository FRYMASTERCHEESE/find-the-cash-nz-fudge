# Android build and release handoff

> **Sync update, 24 October 2026:** the latest Android release candidate is **v1.3 / build 4**, not the older v1.2 mentioned below. It displays the SAME published prelaunch website when connected, and automatically copies approved `docs/` pages into the APK for offline use. Both GitHub Actions and Android Studio run the offline asset sync. Normal public content updates flow into the installed new app via its **Sync** button; Play still needs an owner-signed AAB build 4 and real-device testing. See [SYNC-ANDROID-WEBSITE.md](SYNC-ANDROID-WEBSITE.md). Old internal build 2 remains unchanged.

> **October 24 2026 addendum:** A new branded v1.2 (version code 3) Android preview source is prepared. The previous v1.1 build 2 was reportedly uploaded to Google Play internal testing by the owner's earlier Work session. Any "No Play upload" claims below refer to this document's older preparation checkpoint. To update Play, use the ORIGINAL private upload key to sign a v1.2 AAB, upload to an internal/closed test, and test on the actual device; the public GitHub workflow only produces unsigned release AABs. No new app secrets were created or published.
>
> New web/PWA assets include `web/launch.css`, `web/mark.svg` and `web/sweets.svg`, all bundled offline by `scripts/android-assets.mjs`. There are NO ads, payments or customer accounts in this version. The separate draft AdMob PR #1 is not part of the release.


## Current status

Java source, manifest, Gradle project, branded vector icon and bundled preview assets are supplied. Target/compile SDK is 36; minimum SDK is 26; Java 17; Android Gradle Plugin 8.13.0; Gradle 8.13 in CI. The app uses the operating system WebView and Android APIs without an extra runtime framework, analytics SDK or native bridge. Compilation passed in [GitHub Actions](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge/actions/runs/39924362340); APK v2 signature verification and package/target SDK checks passed. Device behaviour remains untested on a physical phone.

By default the app opens its bundled closed catalogue at a reserved app-assets HTTPS origin. Ordering is blocked on that origin even if the bundled config is edited. To connect it to a verified hosted storefront, change the empty SHOP_URL buildConfigField in android/app/build.gradle to the actual HTTPS shop URL. Use a stable URL and re-run the asset copy before each build. Do not substitute an invented URL or an unrelated site.

## Build without a local Android installation

After creating/pushing the new public GitHub repository, open its Actions tab, run **Check website and build Android preview**, and inspect the result. It installs standard build tools, runs tests and creates a debug APK and unsigned release AAB as downloadable assets in a draft GitHub release. It does not publish the draft release, sign a production release or deploy the shop. It uses standard public-repository runners, disables the Gradle cache and avoids Actions artifact storage; binaries are attached to the draft release instead.

The debug APK is for sideloaded testing only. The unsigned AAB cannot be installed or uploaded as a finished release. The successful second workflow run created the draft release android-preview-2-1 with both binaries, SHA-256 checksums and build-validation.txt. Download draft release assets while signed into the owning account.

## Build locally with Android Studio

1. Install Android Studio from Google and SDK Platform 36 with required build tools. Open android/ as the project and use Java 17 / Gradle 8.13. No local SDK paths are committed.
2. From the repository root run `node scripts/android-assets.mjs`.
3. Build a debug APK, install on a test Android device and test local preview, hosted version, email app chooser, Facebook external link, reload, back button, rotation, screen sizes, font scaling, screen reader and offline/error behaviour. Try a device with no email app installed.
4. Choose a final unique application ID before the first release. The supplied nz.findthecash.fudge is a proposed ID, not a verified reservation. Confirm branding ownership and control of the website.
5. Use Android Studio’s Generate Signed Bundle / APK wizard for a release AAB. Keep the upload key, keystore and passwords private, outside this repository. Use the existing developer account and Play App Signing as appropriate. Do not commit signing material or put it into public Actions logs.

## Play Console work still required

- Add a truthful store listing, app category, customer-support email, icon, screenshots and a publicly reachable privacy policy matching the final hosted shop and email workflow. Do not submit a non-operational empty shop as a finished service.
- Complete Data safety, content rating, target audience, ads and other declarations based on the final app and its providers. No analytics/ads SDK is included, but emailed names/contact details and hosting logs must still be assessed accurately. No account exists and no sign-in is required.
- Complete any testing/developer-verification requirements shown for your existing account, review device pre-launch reports and resolve issues before production. Approval cannot be guaranteed for a wrapper; Google evaluates functionality, quality and policy compliance.
- Verify current target API and Play requirements at submission time. The checked official guidance currently requires API 36 for new phone apps/updates.
- No Play upload, live sale, payment setup or paid service has been performed.

Official references: [target API requirements](https://developer.android.com/google/play/requirements/target-sdk), [command-line builds](https://developer.android.com/build/building-cmdline), [app signing](https://developer.android.com/studio/publish/app-signing), [WebView / spam policy](https://support.google.com/googleplay/android-developer/answer/9899034).

## Updates during GitHub setup

The shell now uses platform Back callbacks on Android 13+ (including Android 16), and applies system-bar/cutout insets. The workflow saves binaries and SHA-256 checksums in a draft release rather than billable Actions artifact storage. GitHub CLI sign-in and separate public repository creation are complete. The corrected build and downloaded-file checksums have been verified. Debug builds use an ephemeral CI debug certificate; later builds may require uninstalling an older preview first. This does not affect production signing, which has not been configured.
