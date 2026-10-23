# Find The Cash NZ Fudge — launch readiness & next actions
Updated 24 October 2026. **No live sale has been opened.** The owner does not make fudge.

## What this release makes ready

| Area | Status | Scope |
| --- | --- | --- |
| Public website | Information-only prelaunch, GitHub Pages | Branded home, ideas, contact, food and customer rights, manufacturer/retailer information, privacy policy. No checkout. |
| Website commerce source | Built but **not deployed commercially** | \`web/\` has guarded catalogue, NZD totals, verified shipping, nonbinding email order enquiries. Suitable independent host must be configured first. |
| Android app | v1.2 (version code 3) **source/build preparation only** | Polished offline bundled preview, no actual stock, orders, payments, account logins or advertising SDK. Not the signed Google Play release. |
| Google Play internal test | Owner previously reported v1.1 (build 2) uploaded and internal test active | This report is historical; verify status in Play Console. Changes made in repository do NOT automatically update Google Play. |
| Food product | **No confirmed product** | Manufacturer, sealed packaging, label, shelf life, actual batch and prices all unverified. |
| Warehouse/inventory/order fulfilment | **Not live** | Offline private tools prepare records and an email enquiry workflow; no multi-device inventory server. |
| Advertising | **Not enabled** | Proposed AdMob work lives in separate draft PR #1; data-safety and privacy disclosures require review before merging and releasing. |
| Payments | **Not connected** | No charge or payment acceptance is allowed. |

## Fastest realistic path

1. **Existing recipes / manufacturer.** Ask Calico Fudge, Cottage Fare/Rococo and Heavenly Fudge whether they already produce flavours, can package finished sealed retail packs under your brand, and can supply small trial quantities. Confirm NZ manufacturing arrangements; enquiring does **not** establish a partnership. Manufacturer leads: https://calicofudge.co.nz/wholesale-fudge · https://rococogifts.co.nz/pages/wholesale · https://heavenlyfudge.co.nz/pages/wholesale.
2. **Request a written quote.** Ask for MOQ, per-unit cost, any brand packaging charge, samples, shelf life, ingredients, allergens, nutrition panel, country-of-origin information, case size, production lead time, delivery into Waikato, and who owns/prints the barcode.
3. **Keep private comparisons offline.** Use \`templates/manufacturer-quote-comparison.csv\` and \`tools/fudge-price-planner.html\`; do NOT enter real supplier rates into the public repository. The calculator uses entered assumptions, not actual supermarket retailer margins.
4. **Food rules and labelling.** Run MPI My Food Rules: https://www.mpi.govt.nz/food-business/food-safety-rules. Confirm any registration/exemption for actual activity and packaging with MPI or appropriate council. Even an exempt business needs safe food. Verify recalls, original seals, traceability, heat-safe transport, compliant labelling and applicable requirements for any *private-label* supply.
5. **Legal seller details.** Confirm seller's legal business name and NZBN if required by retailer, working contact, GST status, refunds terms, supply/delivery contract, storage location and complaints/recall contact. Never upload a private home address to the site.
6. **Choose initial retail SKU(s).** Start with one or two existing proven flavours only if offered by manufacturer. Don't claim "healthy", "reduced sugar", "gluten free" or a shelf-life figure unless actual label/legal conditions support it.
7. **Supermarket pitch.** Prepare product sample, actual specifications and wholesale/carton prices; use \`templates/supermarket-product-specification.csv\`. Foodstuffs North Island welcomes emerging suppliers starting with local ranging: https://www.foodstuffs.co.nz/partnering-with-us/Becoming-a-supplier. Woolworths prospective supplier registration: https://partnerhub.woolworthsgroup.com.au/s/how-to-become-a-woolworths-supplier. Supplier applications do not guarantee acceptance.
8. **Website selling host.** Public GitHub Pages is information-only because GitHub Pages forbids operating an online business/e-commerce checkout. Keep source on $0 GitHub. Choose a permitted static/full-stack host, review cost and commerce terms and deploy ONLY \`web/\` (never \`tools/\`, \`templates/\` or private records). Order email recipient, legal seller, real pack labels, shipping costs and inspections must be confirmed before \`acceptingRequests=true\`. No one-step automated payment is available without a verified backend and payment provider.
9. **Android closed-testing update.** Version 1.2 (3) needs a privately signed AAB signed using the original upload key. The GitHub workflow outputs **unsigned AAB** and debug APK only; those cannot replace the Play release without signing. Reassess the Play listing and use genuine screenshots taken from the installed v1.2 app. AI concept renders are NOT acceptable as screenshots of functioning screens.
10. **Test before release.** Check actual Android device layout, tap navigation, external links and mailto flows, offline recovery, Android 13+ back, privacy, large text, colour contrast, and that no payment or product listing can be triggered. Then test real order workflow on a separately hosted shop only after approved food products exist.
11. **Ads later.** Do not merge draft AdMob PR #1 into the Play version without activating consent/disclosures and checking the merged Android manifest. If you ship an AdMob SDK build, reassess the "Ads", Advertising ID and Data safety declarations based on the actual SDK and release.

## What is not automatable or $0

The supplier's recipe and packaging approvals, food-law compliance, quote acceptance, GST treatment, stock purchases, GS1 barcode arrangements, supermarket onboarding, postal fulfilment, financial charges, payment provider fees and Google Play approvals require real-world third parties. No code change makes those verified.

## Honest brand positioning

**Find The Cash NZ Fudge:** a planned independent reseller/brand. The goal is affordable, genuine, sealed manufacturer-produced fudge; the owner does NOT make fudge. Future healthier options remain ideas pending substantiated manufacturer claims. No existing supermarket or confectionery manufacturer endorsement should be asserted.

## Private tool safety

\`tools/fudge-price-planner.html\` computes what-if margins locally only. \`tools/catalogue-editor.html\` and \`tools/order-manager.html\` are private offline tools; they do not send or publish anything by themselves. Keep filled templates and any customer or supplier data securely off the public repository.

## Useful links

- [Public brand preview](https://frymastercheese.github.io/find-the-cash-nz-fudge/)
- [Manufacturers and retailers](https://frymastercheese.github.io/find-the-cash-nz-fudge/stockists.html)
- [Food, allergens, rights](https://frymastercheese.github.io/find-the-cash-nz-fudge/food-and-orders.html)
- [App privacy](https://frymastercheese.github.io/find-the-cash-nz-fudge/privacy.html)
- [GitHub repository](https://github.com/FRYMASTERCHEESE/find-the-cash-nz-fudge)
