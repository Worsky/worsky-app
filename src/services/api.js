import { Platform } from "react-native";
import axios from "axios";

import ApiConsts from "~/config/ApiConsts";

export const baseURL = axios.create({
  baseURL: "https://worsky-web-staging.herokuapp.com"
});

export const apiURL = axios.create({
  baseURL: "https://worsky-web-staging.herokuapp.com/api"
});

export const apiURLHeader = () => {
  let CLIENTID = ApiConsts.android.clientID;
  let CLIENTSECRET = ApiConsts.android.clientSecret;

  if (Platform.OS == "ios") {
    CLIENTID = ApiConsts.android.clientID;
    CLIENTSECRET = ApiConsts.android.clientSecret;
  }

  return axios.create({
    baseURL: "https://worsky-web-staging.herokuapp.com/api",
    headers: {
      CLIENTID,
      CLIENTSECRET
    }
  });
};

export const apiURLToken = token =>
  axios.create({
    baseURL: "https://worsky-web-staging.herokuapp.com/api",
    data: {},
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json, text/plain, */*"
    }
  });
