import { put, call } from "redux-saga/effects";

import { apiURLToken } from "~/services/api";
import { getToken } from "~/services/asyncStorageToken";

import { Creators as AirportActions } from "../ducks/airport";
import { Creators as refreshTokenAction } from "../ducks/refreshToken";

export function* airport(action) {
  try {
    const { token } = yield getToken();
    const { airportId } = action.payload;

    const response = yield call(
      apiURLToken(token).get,
      `/v2/airport/${airportId}`
    );

    if (!response.data.success)
      return yield put(AirportActions.loadAirportFaliure());

    return yield put(AirportActions.handleAirport(response.data.data));
  } catch (error) {
    if (error.response.status === 401)
      return yield put(refreshTokenAction.refreshToken());

    return yield put(AirportActions.loadAirportFaliure());
  }
}

export function* follow(action) {
  try {
    const { token } = yield getToken();
    const { airportId } = action.payload;

    const response = yield call(
      apiURLToken(token).post,
      `/v2/airport/${airportId}/follow`
    );

    if (!response.data.success) return false;

    return true;
  } catch (error) {
    return error;
  }
}
