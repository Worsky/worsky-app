import { Platform } from "react-native";
import { put, call } from "redux-saga/effects";

import { navigate } from "~/services/navigation";
import { apiURLToken } from "~/services/api";
import { getToken } from "~/services/asyncStorageToken";

import { Creators as PublishActions } from "../ducks/publish";
import { Creators as refreshTokenAction } from "../ducks/refreshToken";

export function* loadReportType() {
  try {
    const { token } = yield getToken();
    const response = yield call(apiURLToken(token).get, "/report-type");

    return yield put(PublishActions.handleReportTypes(response.data.data));
  } catch (error) {
    if (error.response.status === 401)
      return yield put(refreshTokenAction.refreshToken());

    return false;
  }
}

export function* uploadAndroidImage(action) {
  try {
    const { token } = yield getToken();
    const { media } = action.payload;

    const data = new FormData();

    const file = {
      name: media.uri.split("/").slice(-1)[0],
      type: media.type || "image/jpeg",
      uri: media.uri.replace("file://", "")
    };

    data.append("media", file);

    const response = yield call(apiURLToken(token).post, "/report/media", data);

    if (!response.data.success)
      return yield put(PublishActions.sendDone(response.data.success));

    return yield put(PublishActions.sendDone(response.data.data.path));
  } catch (error) {
    return yield put(PublishActions.sendDone(false));
  }
}

export function* uploadAndroidVideo(action) {
  try {
    const { token } = yield getToken();
    const { media } = action.payload;

    const data = new FormData();

    const file = {
      name: media.path.split("/").slice(-1)[0],
      type: "video/mp4",
      uri: media.uri.replace("file://", "")
    };

    data.append("media", file);

    const response = yield call(apiURLToken(token).post, "/report/media", data);

    if (!response.data.success)
      return yield put(PublishActions.sendDone(response.data.success));

    return yield put(PublishActions.sendDone(response.data.data.path));
  } catch (error) {
    return yield put(PublishActions.sendDone(false));
  }
}

export function* uploadIosImage(action) {
  try {
    const { token } = yield getToken();
    const { media } = action.payload;

    const data = new FormData();

    let name = media.uri.split("/").slice(-1)[0];

    if (media.fileName) {
      const [prefix, suffix] = media.fileName.split(".");

      const ext = suffix.toLowerCase() == "heic" ? "jpg" : suffix;

      name = `${prefix}.${ext}`;
    }

    const file = {
      name,
      type: media.type || "image/jpeg",
      uri: media.uri.replace("file://", "")
    };

    data.append("media", file);

    const response = yield call(apiURLToken(token).post, "/report/media", data);

    if (!response.data.success)
      return yield put(PublishActions.sendDone(response.data.success));

    return yield put(PublishActions.sendDone(response.data.data.path));
  } catch (error) {
    return yield put(PublishActions.sendDone(false));
  }
}

export function* uploadIosVideo(action) {
  try {
    const { token } = yield getToken();
    const { media } = action.payload;

    const data = new FormData();
    const uri = media.uri.replace("file://", "");

    let name = media.uri.split("/").slice(-1)[0];

    if (media.fileName) {
      const [prefix, suffix] = media.fileName.split(".");

      const ext = suffix.toLowerCase() == "mov" ? "mp4" : suffix;

      name = `${prefix}.${ext}`;
    }

    const file = {
      name,
      type: "video/mp4",
      uri
    };

    data.append("media", file);

    const response = yield call(apiURLToken(token).post, "/report/media", data);

    if (!response.data.success)
      return yield put(PublishActions.sendDone(response.data.success));

    return yield put(PublishActions.sendDone(response.data.data.path));
  } catch (error) {
    return yield put(PublishActions.sendDone(false));
  }
}

export function* publshNow(action) {
  try {
    const {
      latitude,
      longitude,
      description,
      mediaUrl,
      entityId
    } = action.payload;
    const { token } = yield getToken();

    const data = new FormData();

    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("entity_id", entityId);

    if (description) data.append("description", description);
    if (mediaUrl) data.append("media_url", mediaUrl);

    const response = yield call(apiURLToken(token).post, "/report", data);

    if (!response.data.success)
      return yield put(PublishActions.publishFaliure());

    yield put(PublishActions.stopLoad());

    return navigate("Feed", {
      toastMessage: "Your report has been sended successfuly!"
    });
  } catch (error) {
    return yield put(PublishActions.publishFaliure());
  }
}
