export const Types = {
  LOAD_SEARCH: "LOAD_SEARCH",
  HANDLE_SEARCH: "HANDLE_SEARCH",
  FALIURE_SEARCH: "FALIURE_SEARCH"
};

const INITIAL_STATE = {
  loading: false,
  searchResult: [],
  faliure: false
};

export default function airport(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_SEARCH:
      return { ...state, faliure: false, loading: true };

    case Types.HANDLE_SEARCH:
      return {
        ...state,
        searchResult: action.payload.searchResult,
        loading: false
      };

    case Types.FALIURE_SEARCH:
      return { ...state, faliure: true, loading: false };

    default:
      return state;
  }
}

export const Creators = {
  loadSearch: (search, latitude, longitude) => ({
    type: Types.LOAD_SEARCH,
    payload: {
      search,
      latitude,
      longitude
    }
  }),

  handleSearch: searchResult => ({
    type: Types.HANDLE_SEARCH,
    payload: {
      searchResult
    }
  }),

  faliureSearch: () => ({
    type: Types.FALIURE_SEARCH
  })
};
