package com.pilotobrasil;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.reactlibrary.CompassHeadingPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.sensors.RNSensorsPackage;
import com.mapbox.rctmgl.RCTMGLPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.brentvatne.react.ReactVideoPackage;

import com.imagepicker.ImagePickerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.testfairy.react.TestFairyPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new AsyncStoragePackage(),
            new RNScreensPackage(), new CompassHeadingPackage(),
          new ReactNativeOneSignalPackage(), new GeolocationPackage(), new RNCWebViewPackage(),
          new RNFusedLocationPackage(), new RNSensorsPackage(), new RCTMGLPackage(), new RNFirebasePackage(),
          new ReactVideoPackage(), new ImagePickerPackage(), new ReanimatedPackage(), new TestFairyPackage(),
          new VectorIconsPackage(), new RNGestureHandlerPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
