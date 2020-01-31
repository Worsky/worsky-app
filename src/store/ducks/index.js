import { combineReducers } from 'redux';

import signIn from './signIn';
import signUp from './signUp';

import feed from './feed';
import categories from './categories';
import airport from './airport';
import notifications from './notifications';
import profile from './profile';
import publish from './publish';
import maps from './maps';
import resetPassword from './resetPassword';
import refreshToken from './refreshToken';
import search from './search';

export default combineReducers({
  signIn,
  signUp,
  feed,
  categories,
  airport,
  notifications,
  profile,
  publish,
  maps,
  resetPassword,
  refreshToken,
  search,
});
