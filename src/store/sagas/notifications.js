import { put, call } from 'redux-saga/effects';

import { apiURLToken } from '~/services/api';
import { getToken } from '~/services/asyncStorageToken';

import { Creators as NotificationsActions } from '../ducks/notifications';
import { Creators as refreshTokenAction } from '../ducks/refreshToken';

export default function* loadNotifications() {
  try {
    const { token } = yield getToken();
    const response = yield call(apiURLToken(token).get, '/notification');

    if (!response.data.success) return yield put(NotificationsActions.loadFaliure());

    return yield put(NotificationsActions.handleNotification(response.data.data));
  } catch (error) {
    if (error.response.status === 401) return yield put(refreshTokenAction.refreshToken());

    return yield put(NotificationsActions.loadFaliure());
  }
}
