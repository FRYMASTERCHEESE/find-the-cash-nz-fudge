# Verification report — 23 October 2026

## Passed

- Nine automated Node tests: closed empty shipping/pickup defaults; integer totals and quantity limits; duplicate/missing/empty carts; stale/future stock verification, missing labels, unsealed/non-shelf-stable/recalled/expired packs; business and delivery gates; unsafe Facebook destinations; NZ winter/midnight date marks and impossible dates; PNG/manifest/cached-shell asset existence; network-only configuration and separation of owner tools.
- JavaScript syntax checks for storefront, service worker and both local owner-tool scripts.
- Generated PWA icons (192 and 512 PNG) and copied current website assets into Android project.
- HTTP preview returned 200 after restarting outside the network-isolated execution environment.
- Desktop browser visual check: branded storefront, empty catalogue, supplied Facebook link and locally configured business email (email omitted from this public copy), privacy details.
- Browser bag check: empty bag shown, no shipping/pickup options, request button disabled.
- Phone viewport at 390 × 844: readable layout and no horizontal overflow (document width 375, viewport 390).
- Browser console inspection returned no captured errors or warnings.

## Not verified / not performed

- No real stock, product prices or supplier availability were supplied or fabricated. Populated catalogue/cart calculations use synthetic fixtures only inside tests, not live stock. A browser journey with actual product data remains required before launch.
- Offline/service-worker installation behaviour and Android PWA installation were not tested on a physical phone. Offline safeguards were checked at source/logic level, not by disconnecting a device.
- No live hosting deployment or public GitHub remote. GitHub Pages is unsuitable under its commerce restrictions. GitHub CLI login is expired; connected GitHub tools can read the profile but cannot create repositories.
- Android compilation, APK/AAB installation, screen-reader behaviour on a device, signing and Play review were not performed. Android SDK and Gradle are not installed locally; the supplied CI workflow has not run remotely. No compiled app binary is included.
- The local owner editor/notebook scripts passed syntax checks, but their import/export interactions were not tested in the browser.
- No business registration/exemption determination, pack-label verification, stock inspection, shipping quote, privacy retention decision or legal review. The launch gates require the owner to supply/verify these.
- No payment, sent email, accepted order, purchased service, secret, signing key or Play upload.

The project is a tested local website foundation with Android build source. It is not a live or sale-ready business and not a signed Android release.
