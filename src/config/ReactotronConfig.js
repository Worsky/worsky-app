import { Platform } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import reactotronSaga from "reactotron-redux-saga";

const config =
  Platform.OS == "ios"
    ? Reactotron.configure({ host: "192.168.2.143" })
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect()
    : Reactotron.configure()
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

if (__DEV__) {
  const tron = config;

  tron.clear();

  console.tron = tron;
}
