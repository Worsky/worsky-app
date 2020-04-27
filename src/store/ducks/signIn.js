/**
 * Action Types
 */
export const Types = {
  SIGNIN_REQUEST: 'SIGNIN_REQUEST',
  SIGNIN_FALURE: 'SIGNIN_FALURE',
  STOP_LOADING: 'STOP_LOADING',
  CLEAN_ALL: 'CLEAN_ALL',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  error: false,
  loading: false,
  cleanAll: false,
};

export default function signIn(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        cleanAll: false,
      };

    case Types.SIGNIN_FALURE:
      return { ...state, error: true, loading: false };

    case Types.STOP_LOADING:
      return { ...state, loading: false };

    case Types.CLEAN_ALL:
      return { ...state, cleanAll: !state.cleanAll };

    default:
      return state;
  }
}

/**
 * Creators
 */
export const Creators = {
  signInRequest: (email, password, redirect = true) => ({
    type: Types.SIGNIN_REQUEST,
    payload: {
      username: email,
      password,
      redirect,
    },
  }),

  signInFaliure: () => ({
    type: Types.SIGNIN_FALURE,
  }),

  signInStopLoading: () => ({
    type: Types.STOP_LOADING,
  }),

  signInCleanAll: () => ({
    type: Types.CLEAN_ALL,
  }),
};
