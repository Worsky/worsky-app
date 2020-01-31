import { call, put } from 'redux-saga/effects';

import { apiURLHeader } from '~/services/api';

import { Creators as SignUpActions } from '../ducks/signUp';

import { Creators as SignInActions } from '../ducks/signIn';

export function* getCountries() {
  try {
    const response = yield call(apiURLHeader().get, '/country');

    return yield put(SignUpActions.handleCountries(response.data.data));
  } catch (error) {
    return false;
  }
}

export function* signUp(action) {
  try {
    const {
      username,
      email,
      name,
      selectedCountry,
      phone,
      password,
      confirmPassword,
    } = action.payload;

    const data = new FormData();

    data.append('username', username);
    data.append('email', email);
    data.append('name', name);
    data.append('country_id', selectedCountry);
    data.append('password', password);
    data.append('password_confirmation', confirmPassword);
    data.append('phone', phone);

    const response = yield call(apiURLHeader().post, '/register', data);

    if (!response.data.success) return yield put(SignUpActions.signUpFaliure(response.data.data.errors));

    return yield put(SignInActions.signInRequest(username, password));
  } catch (error) {
    return yield put(SignUpActions.signUpFaliure());
  }
}
