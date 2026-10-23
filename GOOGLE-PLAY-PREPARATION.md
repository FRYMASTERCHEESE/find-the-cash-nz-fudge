# Google Play preparation — 23 October 2026 (original checkpoint)

> **Update, 24 October 2026:** A website-synced **v1.3 (build 4)** candidate supersedes the v1.2 (3) documentation below. Build 4 is NOT automatically uploaded to Google Play; sign it using the original private upload key and verify disclosures for access to the GitHub Pages website before rollout. The older submitted internal v1.1 (2) cannot sync the new website without this update. See [SYNC-ANDROID-WEBSITE.md](SYNC-ANDROID-WEBSITE.md).

> **Later user-reported status, 24 October 2026:** The app was created in Play Console and signed v1.1 (version code 2) was uploaded; internal testing was reportedly published to Findthecashnz@gmail.com. The steps and "no upload" text below describe an EARLIER build handoff, not current console state. This ChatGPT session did not independently access Play Console to reverify rollout.
>
> **New source candidate:** v1.2 (version code 3) adds matching web/app branding, food info and retailer enquiry links. It is NOT signed with the original upload key, NOT uploaded to Play, and its PWA screenshots must come from the actually running app (not AI mockups). The existing ad-free v1.1 declaration must not be reused for a future ad-enabled release without fresh privacy/Data safety analysis. Follow [LAUNCH-READINESS.md](LAUNCH-READINESS.md).


Version 1.1 / version code 2, package **nz.findthecash.fudge**, target API 36, minimum API 26, was built successfully from commit **56c137f** in [GitHub Actions](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge/actions/runs/39925387876).

A release AAB was signed locally with a separate private RSA upload key. Java signature verification and Google's bundletool validation passed. The upload key and password are kept outside this public repository and must be backed up privately. Do not commit signing material. The upload certificate is public; the private keystore is not.

The local handover package includes the signed AAB, a 512 × 512 RGBA Play icon, a 1024 × 500 feature graphic, truthful closed-preview listing text, release notes, app-content review notes and setup instructions. No app screenshots have been fabricated. Device testing and genuine device screenshots remain outstanding.

Only **docs/** is served by GitHub Pages. The [privacy policy](https://frymastercheese.github.io/find-the-cash-nz-fudge/privacy.html) was verified to return HTTP 200 and is linked in the app. The storefront remains outside Pages. No sale, payment or customer data collection was enabled.

The Create app form was prepared with the name **Find The Cash NZ Fudge**, App / Free, English (Australia), and package ID **nz.findthecash.fudge**. Console reported the package ID available. The owner must review policy/export-law certifications before submitting the form; no app creation, bundle upload, tester invitation or release rollout was performed by the assistant during this preparation.

Use **Internal testing** first. The current shop has no products and no active checkout, so it is not ready for a production launch. Google requires meaningful functionality. Production also needs actual business/supply details, accurate policies and any account-specific testing or verification tasks. A future hosted/ordering version must update its privacy and Data safety assessment.
