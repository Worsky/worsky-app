export const Types = {
  LOAD_CATEGORIES: 'LOAD_CATEGORIES',
  LOAD_CATEGORIES_FALIURE: 'LOAD_CATEGORIES_FALIURE',
  RENDER_CATEGORIES: 'RENDER_CATEGORIES',
  LOAD_LIST: 'LOAD_LIST',
  HANDLE_LIST: 'HANDLE_LIST',
};

const INITIAL_STATE = {
  loadingCategories: true,
  loadCategoriesFaliure: false,
  categories: [],
  list: [],
};

export default function feed(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_CATEGORIES:
      return { ...state, loadCategoriesFaliure: false };

    case Types.LOAD_CATEGORIES_FALIURE:
      return { ...state, loadCategoriesFaliure: true, loadingCategories: false };

    case Types.RENDER_CATEGORIES:
      return {
        ...state,
        loadCategoriesFaliure: false,
        loadingCategories: false,
        categories: action.payload.categories,
      };

    case Types.LOAD_LIST:
      return { ...state, loadingCategories: true, loadCategoriesFaliure: false };

    case Types.HANDLE_LIST:
      return {
        ...state,
        loadCategoriesFaliure: false,
        loadingCategories: false,
        list: action.payload.list,
      };

    default:
      return state;
  }
}

export const Creators = {
  loadCategories: () => ({
    type: Types.LOAD_CATEGORIES,
  }),

  loadCategoriesFaliure: () => ({
    type: Types.LOAD_CATEGORIES_FALIURE,
  }),

  renderCategories: categories => ({
    type: Types.RENDER_CATEGORIES,
    payload: {
      categories,
    },
  }),

  loadList: (id, location) => ({
    type: Types.LOAD_LIST,
    payload: {
      id,
      location,
    },
  }),

  handleList: list => ({
    type: Types.HANDLE_LIST,
    payload: {
      list,
    },
  }),
};
