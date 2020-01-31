export const Types = {
  LOAD_NOTIFICATIONS: 'LOAD_NOTIFICATIONS',
  HANDLE_NOTIFICATIONS: 'HANDLE_NOTIFICATIONS',
  FALIURE: 'FALIURE',
};

const INITIAL_STATE = {
  notifications: [],
  loading: true,
  faliure: false,
};

export default function notifications(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_NOTIFICATIONS:
      return state;

    case Types.HANDLE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
        loading: false,
        faliure: false,
      };

    case Types.FALIURE:
      return { ...state, loading: false, faliure: true };

    default:
      return state;
  }
}

export const Creators = {
  loadNotifications: () => ({
    type: Types.LOAD_NOTIFICATIONS,
  }),

  handleNotification: notifications => ({
    type: Types.HANDLE_NOTIFICATIONS,
    payload: {
      notifications,
    },
  }),

  loadFaliure: () => ({
    type: Types.FALIURE,
  }),
};
