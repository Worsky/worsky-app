export const Types = {
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

const INITIAL_STATE = {};

export default function refreshToken(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REFRESH_TOKEN:
      return state;

    default:
      return state;
  }
}

export const Creators = {
  refreshToken: () => ({
    type: Types.REFRESH_TOKEN,
  }),
};
