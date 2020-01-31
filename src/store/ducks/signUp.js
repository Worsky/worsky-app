export const Types = {
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_FALIURE: 'SIGNUP_FALIURE',
  STOP_LOADING: 'STOP_LOADING',
  GET_COUNTRIES: 'GET_COUNTRIES',
  HANDLE_COUNTRIES: 'HANDLE_COUNTRIES',
  CLEAN_ALL_SIGN_UP: 'CLEAN_ALL_SIGN_UP',
};

const INITIAL_STATE = {
  errors: {},
  loading: false,
  countries: [],
  cleanAll: false,
};

export default function signUp(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
        cleanAll: false,
      };

    case Types.SIGNUP_FALIURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };

    case Types.STOP_LOADING:
      return { ...state, loading: false };

    case Types.GET_COUNTRIES:
      return state;

    case Types.HANDLE_COUNTRIES:
      return { ...state, countries: action.payload.countries };

    case Types.CLEAN_ALL_SIGN_UP:
      return { ...state, cleanAll: !state.cleanAll };

    default:
      return state;
  }
}

export const Creators = {
  signUpRequest: (username, email, name, selectedCountry, phone, password, confirmPassword) => ({
    type: Types.SIGNUP_REQUEST,
    payload: {
      username,
      email,
      name,
      selectedCountry,
      phone,
      password,
      confirmPassword,
    },
  }),

  signUpFaliure: errors => ({
    type: Types.SIGNUP_FALIURE,
    payload: {
      errors,
    },
  }),

  signUpStopLoading: () => ({
    type: Types.STOP_LOADING,
  }),

  getCountries: () => ({
    type: Types.GET_COUNTRIES,
  }),

  handleCountries: countries => ({
    type: Types.HANDLE_COUNTRIES,
    payload: {
      countries,
    },
  }),

  signUpCleanAll: () => ({
    type: Types.CLEAN_ALL_SIGN_UP,
  }),
};
