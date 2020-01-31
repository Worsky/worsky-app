import { put } from 'redux-saga/effects';

import { apiURLToken } from '~/services/api';
import { getToken } from '~/services/asyncStorageToken';

import { Creators as CategoriesActions } from '../ducks/categories';
import { Creators as refreshTokenAction } from '../ducks/refreshToken';

export function* renderCategories() {
  try {
    const { token } = yield getToken();

    const response = yield apiURLToken(token).get('/point-type');

    if (!response.data.success) return yield put(CategoriesActions.loadCategoriesFaliure());

    return yield put(CategoriesActions.renderCategories(response.data.data));
  } catch (error) {
    if (error.response.status === 401) return yield put(refreshTokenAction.refreshToken());

    return yield put(CategoriesActions.loadCategoriesFaliure());
  }
}

export function* loadList(action) {
  try {
    const { token } = yield getToken();
    const { id, location } = action.payload;

    const response = yield apiURLToken(token).get(
      `/map/nearby?lat=${location.latitude}&lng=${location.longitude}&point_type_id=${id}`,
    );

    if (!response.data.success) return yield put(CategoriesActions.loadCategoriesFaliure());

    return yield put(CategoriesActions.handleList(response.data.data));
  } catch (error) {
    if (error.response.status === 401) return yield put(refreshTokenAction.refreshToken());

    return yield put(CategoriesActions.loadCategoriesFaliure());
  }
}
