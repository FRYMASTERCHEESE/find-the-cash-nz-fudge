# Install the Android test app

1. Download **Find-The-Cash-NZ-Fudge-preview.apk** onto an Android phone running Android 8 or newer.
2. Open the downloaded APK in the phone’s file manager and follow Android’s installation prompts. This is a test APK from this project, not a Google Play release.
3. Open **FTC NZ Fudge**. The bundled storefront should open with the Find The Cash NZ branding and an empty catalogue. The top banner must say requests are closed.
4. Try Shop, Refresh, the Bag button, the information panels, Facebook, screen rotation and your phone’s Back gesture/button. Check the layout with larger text and TalkBack if you use them.
5. Turn on airplane mode and reopen. The bundled preview should still open; requests must stay disabled. No payment or sale is available.

The APK is signed with a test certificate. Future preview builds may use a different test certificate and need the older preview uninstalled first. Only bag IDs/quantities are stored locally; uninstalling clears them. No customer order records are stored by this Android preview.

The **unsigned .aab** file is a build output for future release preparation. It is not an installable APK and cannot be submitted to Play as a finished release until properly signed. A real shop launch still needs verified products, business/contact details, shipping and compliance checks. Publishing the source or installing the preview does not open sales.

The supplied contact email is kept in a separate local contact-settings file and omitted from the public source. No signing key, password or customer data should ever be added to the public repository.
