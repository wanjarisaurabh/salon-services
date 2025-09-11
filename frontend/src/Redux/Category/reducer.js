import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_CATEGORIES_BY_SALON_REQUEST,
  GET_CATEGORIES_BY_SALON_SUCCESS,
  GET_CATEGORIES_BY_SALON_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_FAILURE,
} from "./actionTypes";

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
  updated: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
    case GET_ALL_CATEGORIES_REQUEST:
    case GET_CATEGORIES_BY_SALON_REQUEST:
    case GET_CATEGORY_BY_ID_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null, updated: false };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };

    case GET_ALL_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case GET_CATEGORIES_BY_SALON_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case GET_CATEGORY_BY_ID_SUCCESS:
      return { ...state, loading: false, category: action.payload };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map((item) =>
          action.payload.id === item.id ? action.payload : item
        ),
        category: action.payload,
        updated: true,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
      };

    case CREATE_CATEGORY_FAILURE:
    case GET_ALL_CATEGORIES_FAILURE:
    case GET_CATEGORIES_BY_SALON_FAILURE:
    case GET_CATEGORY_BY_ID_FAILURE:
    case DELETE_CATEGORY_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updated: false,
      };

    default:
      return state;
  }
};

export default categoryReducer;
