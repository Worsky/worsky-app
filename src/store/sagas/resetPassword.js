import { call, put } from 'redux-saga/effects';

import { apiURLHeader } from '~/services/api';
import { Creators as resetPasswordActions } from '../ducks/resetPassword';

export default function* resetPassword(action) {
  try {
    const { email } = action.payload;
    const data = new FormData();

    data.append('email', email);

    const response = yield call(apiURLHeader().post, '/password/store', data);

    return yield put(
      resetPasswordActions.success(response.data.success, response.data.data.message),
    );
  } catch (error) {
    if (error.response.status == 404) return yield put(resetPasswordActions.success(false, error.response.data.data.message));

    return yield put(resetPasswordActions.success(false, error.response.data.errors.email[0]));
  }
}
