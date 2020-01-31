import { Platform } from "react-native";
import { put, call } from "redux-saga/effects";

import { apiURLToken, apiURLHeader } from "~/services/api";
import { getToken } from "~/services/asyncStorageToken";
import { navigate } from "~/services/navigation";

import { Creators as ProfileActions } from "../ducks/profile";
import { Creators as SignUpActions } from "../ducks/signUp";
import { Creators as refreshTokenAction } from "../ducks/refreshToken";

export function* getCountries() {
  try {
    const response = yield call(apiURLHeader().get, "/country");

    return yield put(SignUpActions.handleCountries(response.data.data));
  } catch (error) {
    return false;
  }
}

export function* loadProfile() {
  try {
    const { token } = yield getToken();
    const response = yield call(apiURLToken(token).get, "/user");

    if (!response.data.success) return yield put(ProfileActions.loadFaliure());

    return yield put(ProfileActions.handleProfile(response.data.data));
  } catch (error) {
    return yield put(ProfileActions.loadFaliure());
  }
}

export function* editProfile(action) {
  try {
    const { avatar, profile } = action.payload;
    const {
      username,
      email,
      name,
      selectedCountry,
      phone,
      bio,
      newPassword,
      confirmPassword
    } = profile;
    const { token } = yield getToken();

    const data = {
      username,
      email,
      name,
      country_id: selectedCountry,
      phone,
      bio,
      password: newPassword,
      password_confirmation: confirmPassword
    };

    const response = yield call(apiURLToken(token).put, "/user", data);

    if (avatar != null && response.data.success) {
      const image = new FormData();

      let name = avatar.uri.split("/").slice(-1)[0];

      if (avatar.fileName) {
        const [prefix, suffix] = avatar.fileName.split(".");

        const ext = suffix.toLowerCase() == "heic" ? "jpg" : suffix;

        name = `${prefix}.${ext}`;
      }

      const file = {
        name,
        type: avatar.type || "image/jpeg",
        uri: avatar.uri.replace("file://", "")
      };

      image.append("avatar", file);

      yield call(apiURLToken(token).post, "/user/avatar", image);
    }

    yield put(ProfileActions.editProfileSuccess());

    return navigate("Profile", { showToast: true });
  } catch (error) {
    const { data, status } = error.response;

    if (status === 401) return yield put(refreshTokenAction.refreshToken());

    if (status === 422)
      return yield put(ProfileActions.handleError(data.errors));

    return error;
  }
}
