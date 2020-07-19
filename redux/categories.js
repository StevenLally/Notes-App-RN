import * as ActionTypes from './ActionTypes';

export const categories = (state = {
  isLoading: true,
  errMess: null,
  categories: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      return { ...state, isLoading: false, errMess: null, categories: action.payload };

    case ActionTypes.CATEGORIES_LOADING:
      return { ...state, isLoading: true, errMess: null, categories: [] };

    case ActionTypes.CATEGORIES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.DELETE_CATEGORY:
      return state.filter(category => category !== action.payload);

    default:
      return state;
  }
};