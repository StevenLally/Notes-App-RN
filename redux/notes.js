import * as ActionTypes from './ActionTypes';

export const notes = (state = {
  isLoading: true,
  errMess: null,
  notes: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE:
      return { ...state, isLoading: false, errMess: null, notes: action.payload };

    case ActionTypes.NOTES_LOADING:
      return { ...state, isLoading: true, errMess: null, notes: [] };

    case ActionTypes.NOTES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.DELETE_NOTE:
      return state.filter(note => note !== action.payload);

    default:
      return state;
  }
};