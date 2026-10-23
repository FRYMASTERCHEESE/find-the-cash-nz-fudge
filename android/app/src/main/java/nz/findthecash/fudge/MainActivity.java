package nz.findthecash.fudge;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Build;
import android.view.WindowInsets;
import android.window.OnBackInvokedDispatcher;
import android.webkit.*;
import android.widget.*;
import java.io.*;
import java.util.*;

public class MainActivity extends Activity {
 private WebView web;
 private static final String LOCAL = "https://appassets.androidplatform.net/";
 private String start;
 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  start = BuildConfig.SHOP_URL.isEmpty() ? LOCAL : BuildConfig.SHOP_URL;
  if (!start.startsWith("https://") || Uri.parse(start).getHost()==null) start=LOCAL;
  LinearLayout layout=new LinearLayout(this);layout.setOrientation(LinearLayout.VERTICAL);
  layout.setOnApplyWindowInsetsListener((v,insets)->{
   if(Build.VERSION.SDK_INT>=30){android.graphics.Insets bars=insets.getInsets(WindowInsets.Type.systemBars()|WindowInsets.Type.displayCutout());v.setPadding(bars.left,bars.top,bars.right,bars.bottom);}
   else v.setPadding(insets.getSystemWindowInsetLeft(),insets.getSystemWindowInsetTop(),insets.getSystemWindowInsetRight(),insets.getSystemWindowInsetBottom());
   return insets;
  });
  LinearLayout toolbar=new LinearLayout(this);
  Button home=new Button(this);home.setText("Shop");home.setOnClickListener(v->web.loadUrl(start));toolbar.addView(home);
  Button reload=new Button(this);reload.setText("Refresh");reload.setOnClickListener(v->web.reload());toolbar.addView(reload);
  TextView title=new TextView(this);title.setText("Find The Cash NZ · Fudge");title.setPadding(12,12,8,8);toolbar.addView(title);
  layout.addView(toolbar);web=new WebView(this);layout.addView(web,new LinearLayout.LayoutParams(-1,0,1));setContentView(layout);
  WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setAllowFileAccess(false);s.setAllowContentAccess(false);s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);s.setSupportMultipleWindows(false);
  CookieManager.getInstance().setAcceptCookie(false);
  web.setWebViewClient(new WebViewClient(){
   @Override public WebResourceResponse shouldInterceptRequest(WebView view,WebResourceRequest req){
    Uri uri=req.getUrl();if(!"appassets.androidplatform.net".equals(uri.getHost()))return null;
    String p=uri.getPath();if(p==null||p.equals("/"))p="/index.html";
    if(p.contains(".."))return missing();
    try {String mime=p.endsWith(".html")?"text/html":p.endsWith(".mjs")||p.endsWith(".js")?"text/javascript":p.endsWith(".css")?"text/css":p.endsWith(".json")?"application/json":p.endsWith(".svg")?"image/svg+xml":p.endsWith(".png")?"image/png":"application/octet-stream";return new WebResourceResponse(mime,"UTF-8",getAssets().open(p.substring(1)));}catch(IOException e){return missing();}
   }
   @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest req){
    Uri uri=req.getUrl();Uri own=Uri.parse(start);
    if("https".equals(uri.getScheme())&&Objects.equals(uri.getHost(),own.getHost())&&uri.getPort()==own.getPort())return false;
    if("https".equals(uri.getScheme())||"mailto".equals(uri.getScheme())){
     try{startActivity(Intent.createChooser(new Intent(Intent.ACTION_VIEW,uri),"Open with"));}catch(Exception e){Toast.makeText(MainActivity.this,"No app available to open this link.",Toast.LENGTH_LONG).show();}
    }return true;
   }
   @Override public void onReceivedError(WebView view,WebResourceRequest req,WebResourceError error){if(req.isForMainFrame())Toast.makeText(MainActivity.this,"Unable to load. Check your connection, then tap Refresh.",Toast.LENGTH_LONG).show();}
  });
  if(Build.VERSION.SDK_INT>=33)getOnBackInvokedDispatcher().registerOnBackInvokedCallback(OnBackInvokedDispatcher.PRIORITY_DEFAULT,()->goBack());
  web.loadUrl(start);
 }
 private WebResourceResponse missing(){return new WebResourceResponse("text/plain","UTF-8",404,"Not found",Collections.emptyMap(),new ByteArrayInputStream("Not found".getBytes()));}
 private void goBack(){if(web.canGoBack())web.goBack();else finish();}
 @Override public void onBackPressed(){goBack();}
 @Override protected void onDestroy(){web.destroy();super.onDestroy();}
}
