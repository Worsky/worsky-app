import { put, call } from "redux-saga/effects";

import { apiURLToken } from "~/services/api";
import { getToken } from "~/services/asyncStorageToken";

import { Creators as MapsActions } from "../ducks/maps";
import { Creators as refreshTokenAction } from "../ducks/refreshToken";

export function* loadPosts(action) {
  try {
    const { token } = yield getToken();

    const params = new URLSearchParams();
    params.append("lat1", action.payload.latitude1);
    params.append("lng1", action.payload.longitude1);
    params.append("lat2", action.payload.latitude2);
    params.append("lng2", action.payload.longitude2);
    params.append("zoom", Math.round(action.payload.zoom));
    params.append("point_type_id", action.payload.point_type_id);

    const callUrl = `/map/nearby?${params.toString()}`;
    const response = yield call(apiURLToken(token).get, callUrl, {});

    if (!response.data.success) return yield put(MapsActions.loadFaliure());

    return yield put(
      MapsActions.handlePosts(
        response.data.data.splice(0, 20),
        action.payload.latitude1,
        action.payload.longitude1,
        action.payload.latitude2,
        action.payload.longitude2,
        action.payload.zoom,
        action.payload.point_type_id
      )
    );
  } catch (error) {
    if (error.response.status === 401)
      return yield put(refreshTokenAction.refreshToken());

    return yield put(MapsActions.loadFaliure());
  }
}

export function* onRegionChangeComplete(action) {
  try {
    const { token } = yield getToken();

    const params = new URLSearchParams();
    params.append("lat", action.payload.latitude);
    params.append("lng", action.payload.longitude);

    const response = yield call(apiURLToken(token).get, "/map/nearby", {
      params
    });

    if (!response.data.success)
      return yield put(MapsActions.loadFaliure(response));

    return yield put(
      MapsActions.handlePosts(
        response.data.data,
        action.payload.latitude,
        action.payload.longitude
      )
    );
  } catch (error) {
    if (error.response.status === 401)
      return yield put(refreshTokenAction.refreshToken());

    return yield put(MapsActions.loadFaliure(response));
  }
}
