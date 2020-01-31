import { Platform } from 'react-native';
import { call } from 'redux-saga/effects';

import ApiConsts from '~/config/ApiConsts';

import { baseURL } from '~/services/api';
import { deleteToken, getToken, refreshedToken } from '~/services/asyncStorageToken';

import { navigate } from '~/services/navigation';

export default function* refreshToken() {
  const { refreshToken } = yield getToken();

  let CLIENTID = ApiConsts.android.clientID;
  let CLIENTSECRET = ApiConsts.android.clientSecret;

  if (Platform.OS == 'ios') {
    CLIENTID = ApiConsts.android.clientID;
    CLIENTSECRET = ApiConsts.android.clientSecret;
  }

  try {
    const data = new FormData();

    data.append('grant_type', 'refresh_token');
    data.append('client_id', CLIENTID);
    data.append('client_secret', CLIENTSECRET);
    data.append('scope', '*');
    data.append('refresh_token', refreshToken);

    const response = yield call(baseURL.post, '/oauth/token', data);

    return yield refreshedToken(response.data.access_token);
  } catch (error) {
    yield deleteToken();

    return navigate('Login');
  }
}
