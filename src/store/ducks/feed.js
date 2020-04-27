export const Types = {
  LOAD_POSTS: 'LOAD_POSTS',
  RENDER_POSTS: 'RENDER_POSTS',
  LOAD_FALIURE: 'LOAD_FALIURE',
  HANDLE_LIKE: 'HANDLE_LIKE',
  LOAD_ONE_POST: 'LOAD_ONE_POST',
  HANDLE_ONE_POST: 'HANDLE_ONE_POST',
  REPORT_POST: 'REPORT_POST',
};

const INITIAL_STATE = {
  loadingPosts: true,
  loadFaliure: false,
  posts: [],
  post: {},
};

export default function feed(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_POSTS:
      return state;

    case Types.LOAD_FALIURE:
      return { ...state, loadFaliure: true, loadingPosts: false };

    case Types.RENDER_POSTS:
      return {
        ...state,
        loadFaliure: false,
        posts: action.payload.posts,
        loadingPosts: false,
      };

    case Types.HANDLE_LIKE:
      return state;

    case Types.LOAD_ONE_POST:
      return { ...state, loadingPosts: true };

    case Types.HANDLE_ONE_POST:
      return { ...state, post: action.payload.post, loadingPosts: false };

    case Types.REPORT_POST:
      return state;

    default:
      return state;
  }
}

export const Creators = {
  loadPosts: () => ({
    type: Types.LOAD_POSTS,
  }),

  renderPosts: posts => ({
    type: Types.RENDER_POSTS,
    payload: {
      posts,
    },
  }),

  loadFaliure: () => ({
    type: Types.LOAD_FALIURE,
  }),

  handleLike: postId => ({
    type: Types.HANDLE_LIKE,
    payload: {
      postId,
    },
  }),

  loadOnePost: postId => ({
    type: Types.LOAD_ONE_POST,
    payload: {
      postId,
    },
  }),

  handleOnePost: post => ({
    type: Types.HANDLE_ONE_POST,
    payload: {
      post,
    },
  }),

  reportPost: (post_id, message) => ({
    type: Types.REPORT_POST,
    payload: {
      post_id,
      message,
    },
  }),
};
