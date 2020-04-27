import { call, put } from 'redux-saga/effects';
import { Platform, AsyncStorage } from 'react-native';

import { baseURL } from '~/services/api';
import { navigate } from '~/services/navigation';
import { postToken } from '~/services/asyncStorageToken';
import ApiConsts from '~/config/ApiConsts';

import { Creators as SignUpActions } from '../ducks/signUp';
import { Creators as SignInActions } from '../ducks/signIn';

export default function* signIn(action) {
  try {
    const { username, password, redirect } = action.payload;

    let { clientID } = ApiConsts.android;
    let { clientSecret } = ApiConsts.android;

    if (Platform == 'ios') {
      clientID = ApiConsts.ios.clientID;
      clientSecret = ApiConsts.ios.clientSecret;
    }

    const data = new FormData();

    data.append('username', username);
    data.append('password', password);

    data.append('grant_type', 'password');
    data.append('client_id', clientID);
    data.append('client_secret', clientSecret);
    data.append('scope', '*');

    const response = yield call(baseURL.post, '/oauth/token', data);

    yield postToken(response.data.access_token, response.data.refresh_token, username, password);

    yield put(SignUpActions.signUpStopLoading());
    yield put(SignUpActions.signUpCleanAll());

    yield put(SignInActions.signInStopLoading());
    yield put(SignInActions.signInCleanAll());

    const wizardDone = yield AsyncStorage.getItem('@wizardDone');

    if (wizardDone === null) return navigate('Wizard');

    if (redirect) return navigate('Feed');
  } catch (error) {
    yield put(SignInActions.signInFaliure());
  }
}
