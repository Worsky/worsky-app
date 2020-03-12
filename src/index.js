import "./config/ReactotronConfig";
import "./config/DevToolsConfig";

import React, { Component } from "react";
import { View, Platform, PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider } from "react-redux";
import TestFairy from "react-native-testfairy";
import OneSignal from "react-native-onesignal";

import { setNavigator } from "./services/navigation";
import { getToken } from "~/services/asyncStorageToken";

import store from "./store";
import OnesignalKeys from "./config/OnesignalKeys";

import CreateNavigator from "./routes";

export default class App extends Component {
  state = {
    tokenCheked: false,
    token: false,
    reportId: null,
    wizardDone: null
  };
  async componentWillMount() {
    const { token } = await getToken();

    this.setState({
      token: !!token,
      tokenCheked: true,
      wizardDone: await AsyncStorage.getItem("@wizardDone")
    });

    await TestFairy.begin("SDK-Po6ajpqA");

    const key =
      Platform.OS == "ios" ? OnesignalKeys.ios : OnesignalKeys.android;

    await OneSignal.init(key);
    await OneSignal.addEventListener("opened", openResult =>
      this.setState({
        reportId: openResult.notification.payload.additionalData.report_id
      })
    );
    await OneSignal.inFocusDisplaying(2);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("opened", this.onOpened);
  }

  render() {
    const { token, tokenCheked, reportId, wizardDone } = this.state;

    const Routes = CreateNavigator(token, reportId, wizardDone);

    return (
      <Provider store={store}>
        {tokenCheked ? <Routes ref={setNavigator} /> : <View />}
      </Provider>
    );
  }
}
