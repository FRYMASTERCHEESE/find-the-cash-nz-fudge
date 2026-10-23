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
- No live hosting deployment. The new public GitHub repository was created after successful CLI sign-in. GitHub Pages remains unsuitable under its commerce restrictions.
- Android compilation passed remotely. A debug APK (test-signed) and unsigned release AAB were downloaded; APK v2 signature, package ID nz.findthecash.fudge, minimum SDK 26, target SDK 36 and closed bundled catalogue were verified in CI. Both downloaded-file SHA-256 values matched the release checksums. Physical-device installation, screen-reader behaviour, production signing and Play review remain outstanding.
- The local owner editor/notebook scripts passed syntax checks, but their import/export interactions were not tested in the browser.
- No business registration/exemption determination, pack-label verification, stock inspection, shipping quote, privacy retention decision or legal review. The launch gates require the owner to supply/verify these.
- No payment, sent email, accepted order, purchased service, secret, signing key or Play upload.

The project includes a compiled, test-signed Android preview and a public source repository. It remains closed to sales. Production signing and Play release remain outstanding. Successful build: [https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge/actions/runs/39924362340](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge/actions/runs/39924362340), source commit 875a1ca. The original email stayed local and is absent from the public copy and its history.
