export const Types = {
  LOAD_PROFILE: "LOAD_PROFILE",
  HANDLE_PROFILE: "HANDLE_PROFILE",
  FALIURE: "FALIURE",
  EDIT_PROFILE: "EDIT_PROFILE",
  LOADING: "LOADING",
  HANDLE_AVATAR: "HANDLE_AVATAR",
  ERROR_FIELD: "ERROR_FIELD",
  GET_COUNTRIES: "GET_COUNTRIES",
  HANDLE_COUNTRIES: "HANDLE_COUNTRIES",
  CLEAN_ERRORS: "CLEAN_ERRORS",
  EDIT_PROFILE_SUCCESS: "EDIT_PROFILE_SUCCESS"
};

const INITIAL_STATE = {
  profile: {},
  loading: true,
  faliure: false,
  avatarPreview: null,
  avatar: null,
  errorField: {
    showSuccess: false,
    errors: {}
  },
  loadButtom: false,
  countries: [],
  success: false,
  showAvatarLoading: false
};

export default function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_PROFILE:
      return state;

    case Types.HANDLE_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
        faliure: false,
        success: false
      };

    case Types.FALIURE:
      return { ...state, loading: false, faliure: true };

    case Types.EDIT_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
        loadButtom: true,
        faliure: false,
        errorField: { ...state.errorField, showSuccess: true, errors: {} },
        success: false,
        showAvatarLoading: true
      };

    case Types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loadButtom: false,
        faliure: false,
        success: true,
        showAvatarLoading: false
      };

    case Types.HANDLE_AVATAR:
      return {
        ...state,
        avatarPreview: action.payload.avatarPreview,
        avatar: action.payload.avatar
      };

    case Types.ERROR_FIELD:
      return {
        ...state,
        errorField: {
          ...state.errorField,
          showSuccess: false,
          errors: action.payload.fields
        },
        faliure: true,
        loadButtom: false
      };

    case Types.GET_COUNTRIES:
      return state;

    case Types.HANDLE_COUNTRIES:
      return { ...state, countries: action.payload.countries };

    case Types.CLEAN_ERRORS:
      return {
        ...state,
        errorField: { showSuccess: false, errors: {} },
        showAvatarLoading: false
      };

    default:
      return state;
  }
}

export const Creators = {
  loadProfile: () => ({
    type: Types.LOAD_PROFILE
  }),

  handleProfile: profileData => ({
    type: Types.HANDLE_PROFILE,
    payload: {
      profile: profileData
    }
  }),

  loadFaliure: () => ({
    type: Types.FALIURE
  }),

  editProfile: (profileData, avatar) => ({
    type: Types.EDIT_PROFILE,
    payload: {
      profile: profileData,
      avatar
    }
  }),

  editProfileSuccess: () => ({
    type: Types.EDIT_PROFILE_SUCCESS
  }),

  handleAvatar: avatar => ({
    type: Types.HANDLE_AVATAR,
    payload: {
      avatarPreview: { uri: `data:image/jpeg;base64,${avatar.data}` },
      avatar
    }
  }),

  handleError: fields => ({
    type: Types.ERROR_FIELD,
    payload: {
      fields
    }
  }),

  getCountries: () => ({
    type: Types.GET_COUNTRIES
  }),

  handleCountries: countries => ({
    type: Types.HANDLE_COUNTRIES,
    payload: {
      countries
    }
  }),

  cleanErrors: () => ({
    type: Types.CLEAN_ERRORS
  })
};
