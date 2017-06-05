package com.zhuguoqing.askcoin;

import android.app.Activity;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {
  private static String JsMainModuleName = "index";
  private static MainApplication instance;
  public static MainApplication getInstance()
  {
    return instance;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSMainModuleName() {
      return JsMainModuleName;
    }

    @Nullable
    @Override
    protected String getJSBundleFile() {
      return super.getJSBundleFile();
    }
    @Nullable
    @Override
    protected String getBundleAssetName() {
      return super.getBundleAssetName();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
    }
  };
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    instance = this;
    /**
     * 初始化 React环境
     * */
    mReactNativeHost.getReactInstanceManager().createReactContextInBackground();
  }
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  public ReactInstanceManager getReactInstanceManager() {
    return mReactNativeHost.getReactInstanceManager();
  }
  public <T extends JavaScriptModule> T getJSModule(Class<T> jsInterface) {
    return getReactInstanceManager().getCurrentReactContext().getJSModule(jsInterface);
  }
}


