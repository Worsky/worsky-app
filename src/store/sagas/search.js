import { put, call } from "redux-saga/effects";

import { apiURLToken } from "~/services/api";
import { getToken } from "~/services/asyncStorageToken";

import { Creators as SearchActions } from "../ducks/search";

export default function* searchSaga(action) {
  try {
    const { token } = yield getToken();
    const { search, latitude, longitude } = action.payload;

    const response = yield call(apiURLToken(token).post, "/v2/search", null, {
      params: { search, lat: latitude, lng: longitude }
    });

    if (!response.data.success) return yield put(SearchActions.faliureSearch());

    return yield put(SearchActions.handleSearch(response.data.data));
  } catch (error) {
    console.log({ error });
    return yield put(SearchActions.faliureSearch());
  }
}
