import { Platform } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import reactotronSaga from "reactotron-redux-saga";
import AsyncStorage from "@react-native-community/async-storage";

const config =
  Platform.OS == "ios"
    ? Reactotron.configure({ host: "192.168.2.143" })
        .useReactNative()
        .setAsyncStorageHandler(AsyncStorage)
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect()
    : Reactotron.configure()
        .useReactNative()
        .setAsyncStorageHandler(AsyncStorage)
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

if (__DEV__) {
  const tron = config;

  tron.clear();

  console.tron = tron;
}
