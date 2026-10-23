package nz.findthecash.fudge;

import android.app.Activity;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.WindowInsets;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.text.TextUtils;
import android.window.OnBackInvokedDispatcher;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * Read-only PRE-LAUNCH information viewer. Website updates are immediately
 * available at the approved GitHub Pages path. Exactly the same static pages
 * are bundled as a no-network fallback, not a separate catalogue or checkout.
 *
 * This is not an e-commerce/payment client or mutable inventory sync service.
 */
public class MainActivity extends Activity {
 private static final String OFFLINE = "https://appassets.androidplatform.net/";
 private static final String PUBLIC_HOST = "frymastercheese.github.io";
 private static final String PUBLIC_PREFIX = "/find-the-cash-nz-fudge/";
 private static final Set<String> OFFLINE_FILES = new HashSet<>(Arrays.asList(
  "index.html", "site.css", "mark.svg", "sweets.svg", "privacy.html",
  "stockists.html", "food-and-orders.html"
 ));

 private WebView web;
 private TextView status;
 private String liveUrl;
 private boolean offlineFallbackRequested;

 private boolean isApprovedWebsite(Uri url) {
  return url != null
   && "https".equals(url.getScheme())
   && PUBLIC_HOST.equals(url.getHost())
   && url.getPort() == -1
   && url.getPath() != null
   && url.getPath().startsWith(PUBLIC_PREFIX);
 }

 private boolean isBundledPage(Uri url) {
  return url != null
   && "https".equals(url.getScheme())
   && "appassets.androidplatform.net".equals(url.getHost())
   && url.getPort() == -1;
 }

 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  liveUrl = BuildConfig.PREVIEW_URL;
  if (!isApprovedWebsite(Uri.parse(liveUrl))) throw new IllegalStateException("Invalid prelaunch website URL");

  LinearLayout layout = new LinearLayout(this);
  layout.setOrientation(LinearLayout.VERTICAL);
  layout.setOnApplyWindowInsetsListener((v, insets) -> {
   if (Build.VERSION.SDK_INT >= 30) {
    android.graphics.Insets bars = insets.getInsets(
     WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
    v.setPadding(bars.left,bars.top,bars.right,bars.bottom);
   } else {
    v.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),
     insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());
   }
   return insets;
  });

  LinearLayout toolbar = new LinearLayout(this);
  toolbar.setGravity(Gravity.CENTER_VERTICAL);
  toolbar.setBackgroundColor(Color.rgb(0,57,40));
  toolbar.setPadding(9,3,9,3);

  status = new TextView(this);
  status.setText("FTC NZ  ·  CONNECTING");
  status.setTextSize(11);
  status.setTextColor(Color.WHITE);
  status.setTypeface(null, android.graphics.Typeface.BOLD);
  status.setSingleLine(true);
  status.setEllipsize(TextUtils.TruncateAt.END);
  toolbar.addView(status,new LinearLayout.LayoutParams(0,-2,1));

  Button home = new Button(this);
  home.setText("Home");
  home.setAllCaps(false);
  home.setTextColor(Color.rgb(3,57,35));
  home.setBackgroundTintList(ColorStateList.valueOf(Color.rgb(255,207,114)));
  home.setOnClickListener(v->loadFreshSite());
  toolbar.addView(home,new LinearLayout.LayoutParams(-2,-2));

  Button refresh = new Button(this);
  refresh.setText("Sync");
  refresh.setAllCaps(false);
  refresh.setTextColor(Color.WHITE);
  refresh.setContentDescription("Refresh information from the live website");
  refresh.setBackgroundTintList(ColorStateList.valueOf(Color.rgb(12,112,77)));
  refresh.setOnClickListener(v->loadFreshSite());
  toolbar.addView(refresh,new LinearLayout.LayoutParams(-2,-2));

  layout.addView(toolbar);
  web = new WebView(this);
  layout.addView(web,new LinearLayout.LayoutParams(-1,0,1));
  setContentView(layout);

  WebSettings settings = web.getSettings();
  // Preview pages contain NO forms, scripts, commerce, third-party SDKs or
  // analytics. Disable script execution so a future website change cannot
  // silently activate payments or tracking in the already-reviewed app.
  settings.setJavaScriptEnabled(false);
  settings.setDomStorageEnabled(false);
  settings.setAllowFileAccess(false);
  settings.setAllowContentAccess(false);
  settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  settings.setSupportMultipleWindows(false);
  settings.setCacheMode(WebSettings.LOAD_NO_CACHE);

  android.webkit.CookieManager.getInstance().setAcceptCookie(false);
  web.setWebViewClient(new WebViewClient() {
   @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest request) {
    Uri url = request.getUrl();
    if (!isBundledPage(url)) return null;
    String path = url.getPath();
    String name = path == null || path.equals("/") ? "index.html"
     : path.startsWith("/") ? path.substring(1) : path;
    if (!OFFLINE_FILES.contains(name)) return missing();
    try {
     String mime = name.endsWith(".html") ? "text/html"
      : name.endsWith(".css") ? "text/css"
      : name.endsWith(".svg") ? "image/svg+xml" : "application/octet-stream";
     return new WebResourceResponse(mime,"UTF-8",getAssets().open(name));
    } catch (IOException exception) { return missing(); }
   }

   @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request) {
    Uri url=request.getUrl();
    if (isApprovedWebsite(url) || isBundledPage(url)) return false;
    String scheme=url.getScheme();
    if ("https".equals(scheme) || "mailto".equals(scheme)) {
     try { startActivity(Intent.createChooser(new Intent(Intent.ACTION_VIEW,url),"Open with")); }
     catch (Exception error) {
      Toast.makeText(MainActivity.this,"No app available to open that link.",Toast.LENGTH_LONG).show();
     }
    }
    // Never load external commerce, non-HTTPS websites or other URL schemes
    // inside the application's WebView.
    return true;
   }

   @Override public void onReceivedError(WebView view,WebResourceRequest request,
                                            WebResourceError error) {
    if (!request.isForMainFrame()) return;
    if (isApprovedWebsite(request.getUrl())) showOfflineCopy("Website unavailable. Showing offline information.");
    else Toast.makeText(MainActivity.this,"Offline copy could not load.",Toast.LENGTH_LONG).show();
   }

   @Override public void onReceivedHttpError(WebView view,WebResourceRequest request,
                                              WebResourceResponse response) {
    if (request.isForMainFrame() && isApprovedWebsite(request.getUrl())
        && response.getStatusCode() >= 400) {
     showOfflineCopy("Website unavailable. Showing offline information.");
    }
   }

   @Override public void onReceivedSslError(WebView view,SslErrorHandler handler,SslError error) {
    handler.cancel(); // Do not bypass TLS errors.
    showOfflineCopy("Secure connection failed. Showing offline information.");
   }

   @Override public void onPageFinished(WebView view,String url) {
    Uri uri=Uri.parse(url);
    if (isApprovedWebsite(uri)) {
     status.setText("FTC NZ  ·  LIVE WEBSITE");
     offlineFallbackRequested=false;
    } else if (isBundledPage(uri)) {
     status.setText("FTC NZ  ·  OFFLINE COPY");
    }
   }
  });

  if (Build.VERSION.SDK_INT >= 33) {
   getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
    OnBackInvokedDispatcher.PRIORITY_DEFAULT,()->goBack());
  }
  loadFreshSite();
 }

 private void loadFreshSite() {
  offlineFallbackRequested=false;
  status.setText("FTC NZ  ·  SYNCING");
  web.loadUrl(liveUrl);
 }

 private void showOfflineCopy(String reason) {
  if (offlineFallbackRequested || web==null) return;
  offlineFallbackRequested=true;
  status.setText("FTC NZ  ·  OFFLINE COPY");
  web.loadUrl(OFFLINE);
  Toast.makeText(this,reason + " Tap Sync to retry.",Toast.LENGTH_LONG).show();
 }

 private WebResourceResponse missing() {
  return new WebResourceResponse("text/plain","UTF-8",404,"Not found",
   Collections.emptyMap(),new ByteArrayInputStream("Not found".getBytes()));
 }

 private void goBack() {
  if (web.canGoBack()) web.goBack(); else finish();
 }
 @Override public void onBackPressed() { goBack(); }
 @Override protected void onDestroy() { if(web!=null) web.destroy(); super.onDestroy(); }
}
