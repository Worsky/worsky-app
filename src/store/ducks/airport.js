export const Types = {
  LOADING: 'LOADING',
  LOAD_FALIURE: 'LOAD_FALIURE',
  LOAD_AIRPORT: 'LOAD_AIRPORT',
  HANDLE_AIRPORT: 'HANDLE_AIRPORT',
  FOLLOW: 'FOLLOW',
  ON_INDEX_UPDATE: 'ON_INDEX_UPDATE',
};

const INITIAL_STATE = {
  loading: true,
  loadFaliure: false,
  airport: {},
  followed: false,
  index: 0,
  routes: [
    { key: 'first', title: 'About' },
    { key: 'second', title: 'Location' },
    { key: 'third', title: 'Reports' },
  ],
};

export default function airport(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_FALIURE:
      return { ...state, loadFaliure: true, loading: false };

    case Types.LOAD_AIRPORT:
      return state;

    case Types.HANDLE_AIRPORT:
      const _routes = action.payload.airportData.tabs.map(tab => ({
        key: `${tab.name.replace(' ', '_')}_${Math.random()}`,
        title: tab.name,
        content: tab.content,
      }));

      const routes = state.routes.concat(_routes);

      return {
        ...state,
        loadFaliure: false,
        loading: false,
        airport: action.payload.airportData,
        followed: action.payload.airportData.followed,
        routes,
      };

    case Types.FOLLOW:
      return { ...state, followed: !state.followed };

    case Types.ON_INDEX_UPDATE:
      return { ...state, index: action.payload.index };

    default:
      return state;
  }
}

export const Creators = {
  loadAirportFaliure: () => ({
    type: Types.LOAD_FALIURE,
  }),

  loadInfo: airportId => ({
    type: Types.LOAD_AIRPORT,
    payload: {
      airportId,
    },
  }),

  handleAirport: airportData => ({
    type: Types.HANDLE_AIRPORT,
    payload: {
      airportData,
    },
  }),

  follow: airportId => ({
    type: Types.FOLLOW,
    payload: {
      airportId,
    },
  }),

  onIndexChange: index => ({
    type: Types.ON_INDEX_UPDATE,
    payload: {
      index,
    },
  }),
};
