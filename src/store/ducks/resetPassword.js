export const Types = {
  RESET_PASSWORD: 'RESET_PASSWORD',
  SUCCESS: 'SUCCESS',
};

const INITIAL_STATE = {
  successType: null,
  successMessage: null,
};

export default function publish(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESET_PASSWORD:
      return state;

    case Types.SUCCESS:
      return {
        ...state,
        successType: action.payload.successType,
        successMessage: action.payload.successMessage,
      };

    default:
      return state;
  }
}

export const Creators = {
  resetPassword: email => ({
    type: Types.RESET_PASSWORD,
    payload: {
      email,
    },
  }),

  success: (successType, successMessage) => ({
    type: Types.SUCCESS,
    payload: {
      successType,
      successMessage,
    },
  }),
};
