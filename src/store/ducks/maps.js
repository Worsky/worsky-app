export const Types = {
  LOAD_POST: "LOAD_POST",
  HANDLE_POST: "HANDLE_POST",
  FALIURE: "FALIURE",
  ON_REGION_CHANGE_COMPLETE: "ON_REGION_CHANGE_COMPLETE"
};

const INITIAL_STATE = {
  loading: true,
  faliure: false,
  posts: [],
  region: {
    latitude: 0,
    longitude: 0
  }
};

export default function maps(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_POST:
      return {
        ...state,
        faliure: false,
        loading: true
      };

    case Types.ON_REGION_CHANGE_COMPLETE:
      return {
        ...state,
        faliure: false,
        loading: true
      };

    case Types.HANDLE_POST:
      return {
        ...state,
        region: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        },
        posts: action.payload.posts,
        loading: false
      };

    case Types.FALIURE:
      return { ...state, faliure: true, loading: false };

    default:
      return state;
  }
}

export const Creators = {
  loadPosts: (
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    zoom,
    point_type_id
  ) => ({
    type: Types.LOAD_POST,
    payload: {
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      zoom,
      point_type_id
    }
  }),

  onRegionChangeComplete: (latitude, longitude) => ({
    type: Types.ON_REGION_CHANGE_COMPLETE,
    payload: {
      latitude,
      longitude
    }
  }),

  handlePosts: (
    posts,
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    zoom,
    point_type_id
  ) => ({
    type: Types.HANDLE_POST,
    payload: {
      posts,
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      zoom,
      point_type_id
    }
  }),

  loadFaliure: (response = {}) => ({
    type: Types.FALIURE,
    payload: {
      response
    }
  })
};
