# Android banner ads — staged integration, NOT live

This branch adds a **single native AdMob banner at the bottom** of the Android app. It does **not** put banners in the website, checkout form or Facebook page. There are no interstitial, rewarded or full-screen ads.

## Current published version vs proposal

- **Google Play internal v1.1 / version code 2:** no ads; answer **No** to Play Console "Does your app contain ads?". Keep this version unchanged while completing app setup.
- **This branch's v1.2 / version code 3:** debug builds use Google's sample AdMob app ID and *test* banner ad unit ID. Release builds have **ads disabled** by default even if the SDK is present.
- **Future ad-enabled release:** requires your own AdMob Android app ID, your own banner unit ID, a reviewed privacy-policy update, Google Play ads and Data safety disclosures, device testing and explicit production activation. Do not upload a test-ID ad-enabled build as an ordinary public release.
- Source changes are isolated on a draft PR until reviewed and merged. Nothing is signed, uploaded or published by this branch.

## Configuration (free account, no paid plugin)

1. Sign in to [Google AdMob](https://admob.google.com/) using your own Google account. Create an **Android app**, e.g. **Find The Cash NZ Fudge**, package `nz.findthecash.fudge`. If the app cannot yet be found publicly in Google Play, set it up as unpublished for testing.
2. Find the **AdMob app ID**, shaped `ca-app-pub-1234567890123456~1234567890`.
3. Create one **Banner** ad unit in that AdMob app and get the **banner ad unit ID**, shaped `ca-app-pub-1234567890123456/1234567890`. These IDs are different and must belong to this fudge app; don't reuse IDs from another Android app.
4. Configure messages in AdMob **Privacy & messaging** for applicable regions and test the consent flow. The app requests current consent information on every launch, displays the form when needed, and exposes an "Ad privacy" control when required by UMP.
5. Run **debug test ads** only while testing. The debug build includes Google's published sample IDs; never click live ads to test them. The native banner remains hidden on ad load failure.
6. When you genuinely have a working shop and are ready to display real banners, opt in when building your privately signed release:

```sh
gradle -p android bundleRelease -PenableProductionAds=true -PadmobAppId=YOUR_ADMOB_APP_ID -PadmobBannerUnitId=YOUR_ADMOB_BANNER_UNIT_ID
```

By default, plain `gradle -p android bundleRelease` **does not request ads**. Supplying only an app ID and banner unit without `enableProductionAds=true` also doesn't activate ads. A production-enabled build rejects sample IDs and invalid ID formats. Real activation is not implied by preparing this code. Avoid putting your upload keystore, keys or passwords in this repository. Your existing Play upload key remains private.

## Disclosure requirements before distributing any newly built SDK-containing AAB

Even with ads disabled by default, a **new app bundle that includes the AdMob SDK** must receive an actual manifest/data-flow assessment. Do not automatically reuse the current preview's "no data collected" certification. The SDK may collect/share IP address, interactions, diagnostic data and device/account identifiers for advertising, analytics and fraud prevention, including advertising ID permission merged into the manifest. Review the final merged manifest and official SDK data disclosures.

For an **ad-enabled** bundle:
- In Play Console **Ads**, choose **Yes** (banner advertising).
- Update **Data safety**, including collection and sharing performed by AdMob and any other SDK or hosting systems.
- Update the **public privacy policy** to accurately cover the banner SDK, Google as provider, data categories and purposes, retention/correction/contact, and consent choices. The currently public privacy policy is only for ad-free v1.1 and must not be reused unchanged.
- In **Advertising ID**, answer truthfully based on the final merged Android manifest and whether you use the permission.
- Audience target groups must reflect actual audience/design; **18+** is suitable only if this really is intended for adult shoppers. Don't select adult-only to bypass Google Families rules if the app is actually directed at children.
- Complete all other Play declarations from actual release behavior. Don't state Google/AdMob account approval or revenue is guaranteed.
- Check AdMob / Play policies including app-ads.txt, quality/content, invalid traffic and any required provider verification. Do not try to monetize an otherwise empty, nonfunctional shopping app.

## Verification needed

- GitHub PR CI compiles debug and release with Gradle 8.13 / Android SDK 36, without saving a Play-ready binary or merging code.
- On an Android phone: confirm real content doesn't jump beneath the bottom banner; check back/home/refresh, small screens, portrait/landscape, ads failure/offline, and consent + "Ad privacy".
- Test EEA/UK/Switzerland consent in a test-device setup, and test revoking consent.
- Verify that the release build without explicit opt-in never requests banners, and that the new AAB is version code **3**.
- Use the separately stored **existing private signing/upload key** to sign any Play upload. Do not confuse GitHub's unsigned release AAB with the previously signed version 2.

## Sources

- [Google's Mobile Ads Android setup](https://developers.google.com/admob/android/quick-start)
- [Adaptive banner integration](https://developers.google.com/admob/android/banner)
- [UMP consent and privacy options](https://developers.google.com/admob/android/privacy)
- [SDK data disclosures](https://developers.google.com/admob/android/privacy/play-data-disclosure)
- [Google Play Ads declaration](https://support.google.com/googleplay/android-developer/answer/9859455)
