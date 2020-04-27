import { put, call } from 'redux-saga/effects';

import { apiURLToken } from '~/services/api';
import { getToken } from '~/services/asyncStorageToken';

import { Creators as FeedActions } from '../ducks/feed';
import { Creators as refreshTokenAction } from '../ducks/refreshToken';

export function* renderPosts() {
  try {
    const { token } = yield getToken();
    const response = yield call(apiURLToken(token).get, '/report/recents');

    if (!response.data.success) return yield put(FeedActions.loadFaliure());

    return yield put(FeedActions.renderPosts(response.data.data));
  } catch (error) {
    if (error.response.status === 401) return yield put(refreshTokenAction.refreshToken());

    return yield put(FeedActions.loadFaliure());
  }
}

export function* handleLike(action) {
  try {
    const { postId } = action.payload;
    const { token } = yield getToken();

    return yield call(apiURLToken(token).post, `/report/${postId}/like`);
  } catch (error) {
    return error;
  }
}

export function* getOnePost(action) {
  try {
    const { token } = yield getToken();
    const { postId } = action.payload;

    const response = yield call(apiURLToken(token).get, `/report/${postId}`);

    if (!response.data.success) return yield put(FeedActions.loadFaliure());

    return yield put(FeedActions.handleOnePost(response.data.data));
  } catch (error) {
    if (error.response.status === 401) return yield put(refreshTokenAction.refreshToken());

    return yield put(FeedActions.loadFaliure());
  }
}

export function* reportPost(action) {
  try {
    const { token } = yield getToken();
    const { post_id, message } = action.payload;

    const data = new FormData();

    data.append('message', message);

    return yield call(apiURLToken(token).post, `/report/${post_id}/feedback`, data);
  } catch (error) {
    return error;
  }
}
