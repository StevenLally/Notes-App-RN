import * as ActionTypes from './ActionTypes';

export const categories = (state = {
  isLoading: true,
  errMess: null,
  categories: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORIES:
      return { ...state, isLoading: false, errMess: null, categories: action.payload };

    case ActionTypes.CATEGORIES_LOADING:
      return { ...state, isLoading: true, errMess: null, categories: [] };

    case ActionTypes.CATEGORIES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.DELETE_CATEGORY:
      return { ...state, categories: state.categories.filter(category => category.id !== action.payload) };

    case ActionTypes.ADD_CATEGORY:
      const lastCategoryIndex = state.categories.length - 1;
      action.payload.id = state.categories[lastCategoryIndex].id + 1;
      return { ...state, isLoading: false, errMess: null, categories: state.categories.concat(action.payload) };

    default:
      return state;
  }
};