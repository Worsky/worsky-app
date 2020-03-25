import { all, takeLatest } from "redux-saga/effects";

import signIn from "./signIn";
import { signUp, getCountries } from "./signUp";
import { renderPosts, handleLike, getOnePost, reportPost } from "./feed";
import { renderCategories, loadList } from "./categories";
import { airport, follow } from "./airport";
import loadNotifications from "./notifications";
import { loadProfile, editProfile } from "./profile";
import {
  loadReportType,
  publishNow,
  uploadAndroidImage,
  uploadAndroidVideo,
  uploadIosImage,
  uploadIosVideo
} from "./publish";
import { loadPosts, onRegionChangeComplete } from "./maps";
import resetPassword from "./resetPassword";
import refreshToken from "./refreshToken";
import SearchSaga from "./search";

import { Types as SignInTypes } from "../ducks/signIn";
import { Types as SignUpTypes } from "../ducks/signUp";
import { Types as FeedTypes } from "../ducks/feed";
import { Types as CategoiesTypes } from "../ducks/categories";
import { Types as AirportTypes } from "../ducks/airport";
import { Types as NotificationsTypes } from "../ducks/notifications";
import { Types as ProfileTypes } from "../ducks/profile";
import { Types as PublishTypes } from "../ducks/publish";
import { Types as MapsTypes } from "../ducks/maps";
import { Types as resetPasswordTypes } from "../ducks/resetPassword";
import { Types as refreshTokenTypes } from "../ducks/refreshToken";
import { Types as SearchTypes } from "../ducks/search";

export default function* rootSaga() {
  return yield all([
    takeLatest(SignInTypes.SIGNIN_REQUEST, signIn),

    takeLatest(SignUpTypes.SIGNUP_REQUEST, signUp),
    takeLatest(SignUpTypes.GET_COUNTRIES, getCountries),

    takeLatest(FeedTypes.LOAD_POSTS, renderPosts),
    takeLatest(FeedTypes.HANDLE_LIKE, handleLike),
    takeLatest(FeedTypes.LOAD_ONE_POST, getOnePost),
    takeLatest(FeedTypes.REPORT_POST, reportPost),
    takeLatest(CategoiesTypes.LOAD_CATEGORIES, renderCategories),
    takeLatest(CategoiesTypes.LOAD_LIST, loadList),

    takeLatest(AirportTypes.LOAD_AIRPORT, airport),
    takeLatest(AirportTypes.FOLLOW, follow),

    takeLatest(NotificationsTypes.LOAD_NOTIFICATIONS, loadNotifications),

    takeLatest(ProfileTypes.LOAD_PROFILE, loadProfile),
    takeLatest(ProfileTypes.EDIT_PROFILE, editProfile),

    takeLatest(PublishTypes.LOAD_REPORT_TYPE, loadReportType),
    takeLatest(PublishTypes.UPLOAD_ANDROID_IMAGE, uploadAndroidImage),
    takeLatest(PublishTypes.UPLOAD_ANDROID_VIDEO, uploadAndroidVideo),
    takeLatest(PublishTypes.UPLOAD_IOS_IMAGE, uploadIosImage),
    takeLatest(PublishTypes.UPLOAD_IOS_VIDEO, uploadIosVideo),
    takeLatest(PublishTypes.PUBLISH, publishNow),

    takeLatest(MapsTypes.LOAD_POST, loadPosts),
    takeLatest(MapsTypes.ON_REGION_CHANGE_COMPLETE, onRegionChangeComplete),

    takeLatest(resetPasswordTypes.RESET_PASSWORD, resetPassword),

    takeLatest(refreshTokenTypes.REFRESH_TOKEN, refreshToken),

    takeLatest(SearchTypes.LOAD_SEARCH, SearchSaga)
  ]);
}
